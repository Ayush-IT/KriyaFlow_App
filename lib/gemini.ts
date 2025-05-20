import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const geminiModel = google('gemini-2.0-flash-001');

export async function generateTasks(topic: string): Promise<string[]> {
  // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;

  const result = await generateText({
    model: geminiModel,
    prompt: prompt,
  });
  const text = result.text;

  // Split the response into individual tasks and clean them up
  return text
    .split('\n')
    .map((task: string) => task.trim())
    .filter((task: string) => task.length > 0)
    .slice(0, 5);
} 