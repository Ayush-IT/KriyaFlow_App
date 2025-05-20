export const TASK_CATEGORIES = {
  WORK: 'work',
  PERSONAL: 'personal',
  LEARNING: 'learning',
  HEALTH: 'health',
  OTHER: 'other',
} as const;

export const CATEGORY_DISPLAY_NAMES = {
  [TASK_CATEGORIES.WORK]: 'Work',
  [TASK_CATEGORIES.PERSONAL]: 'Personal',
  [TASK_CATEGORIES.LEARNING]: 'Learning',
  [TASK_CATEGORIES.HEALTH]: 'Health',
  [TASK_CATEGORIES.OTHER]: 'Other',
} as const;

export type TaskCategory = typeof TASK_CATEGORIES[keyof typeof TASK_CATEGORIES]; 