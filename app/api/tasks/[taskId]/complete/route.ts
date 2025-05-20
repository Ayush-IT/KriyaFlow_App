import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const task = await db
      .update(tasks)
      .set({ completed: true })
      .where(eq(tasks.id, params.taskId))
      .returning();

    if (!task.length) {
      return new NextResponse('Task not found', { status: 404 });
    }

    return NextResponse.json(task[0]);
  } catch (error) {
    console.error('[TASK_COMPLETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 