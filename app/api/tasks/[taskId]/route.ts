import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// PATCH update a task
export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    // Log the Authorization header to inspect it
    console.log('Authorization Header (PATCH):', req.headers.get('Authorization'));

    const { userId } = await auth();
    console.log('PATCH Handler - userId:', userId);

    if (!userId) {
      console.error('Authentication failed in PATCH for taskId:', params.taskId);
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { taskId } = await params;
    const { title, description, completed, category } = await req.json();

    // Validate the input
    if (!title && !description && completed === undefined && !category) {
      return new NextResponse('No updates provided', { status: 400 });
    }

    // Prepare the update object
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (category !== undefined) updateData.category = category;

    try {
      const updatedTask = await db
        .update(tasks)
        .set(updateData)
        .where(
          and(
            eq(tasks.id, taskId),
            eq(tasks.userId, userId)
          )
        )
        .returning();

      if (!updatedTask.length) {
        return new NextResponse('Task not found', { status: 404 });
      }

      return NextResponse.json(updatedTask[0]);
    } catch (dbError) {
      console.error('[TASK_PATCH] Database Error:', dbError);
      return new NextResponse('Database error occurred', { status: 503 });
    }
  } catch (error) {
    console.error('[TASK_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// DELETE a task
export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    // Log the Authorization header to inspect it
    console.log('Authorization Header (DELETE):', req.headers.get('Authorization'));

    const { userId } = await auth();
    console.log('DELETE Handler - userId:', userId);

    if (!userId) {
      console.error('Authentication failed in DELETE for taskId:', params.taskId);
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { taskId } = await params;

    try {
      const deletedTask = await db
        .delete(tasks)
        .where(
          and(
            eq(tasks.id, taskId),
            eq(tasks.userId, userId)
          )
        )
        .returning();

      if (!deletedTask.length) {
        return new NextResponse('Task not found', { status: 404 });
      }

      return NextResponse.json(deletedTask[0]);
    } catch (dbError) {
      console.error('[TASK_DELETE] Database Error:', dbError);
      return new NextResponse('Database error occurred', { status: 503 });
    }
  } catch (error) {
    console.error('[TASK_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 