import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET all tasks for the current user
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(tasks.createdAt);

    return NextResponse.json(userTasks);
  } catch (error) {
    console.error('[TASKS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// POST a new task
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { title, description, category } = await req.json();
    if (!title) {
      return new NextResponse('Title is required', { status: 400 });
    }

    const task = await db
      .insert(tasks)
      .values({
        userId,
        title,
        description,
        category,
        completed: false,
      })
      .returning();

    return NextResponse.json(task[0]);
  } catch (error) {
    console.error('[TASKS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 