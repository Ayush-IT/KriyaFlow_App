'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TASK_CATEGORIES, CATEGORY_DISPLAY_NAMES, TaskCategory } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskGeneratorProps {
  onTasksGenerated: () => void;
}

export function TaskGenerator({ onTasksGenerated }: TaskGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<TaskCategory>(TASK_CATEGORIES.OTHER);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a topic',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, category }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tasks');
      }

      setTopic('');
      onTasksGenerated();
      toast({
        title: 'Success',
        description: 'Tasks generated successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to generate tasks',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Generate Tasks</h2>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Input
          placeholder="Enter a topic (e.g., Learn Python)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1"
        />
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as TaskCategory)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CATEGORY_DISPLAY_NAMES).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Tasks'}
        </Button>
      </div>
    </div>
  );
} 