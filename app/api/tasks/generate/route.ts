import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { tasks } from '@/lib/db/schema';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TaskCategory } from '@/lib/constants';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { topic, category } = await req.json();

    if (!topic) {
      return new NextResponse('Topic is required', { status: 400 });
    }

    // Generate tasks using Google AI
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
    const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the response into individual tasks
    const generatedTasks = text
      .split('\n')
      .filter((task: string) => task.trim())
      .map((task: string) => ({
        title: task.trim(),
        description: '',
        category: category as TaskCategory,
        userId,
      }));

    // Save tasks to database
    const savedTasks = await db.insert(tasks).values(generatedTasks).returning();

    return NextResponse.json(savedTasks);
  } catch (error) {
    console.error('[TASKS_GENERATE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 