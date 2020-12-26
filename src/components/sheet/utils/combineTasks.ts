import { Task } from '@/common/classes/Task';

export type CombinedTask = {
  text: string;
  hours: number;
}

const HOUR = 1000 * 60 * 60;

export function combineTasks (tasks: Task[]): CombinedTask[] {
  const combinedTasks: Record<string, number> = {};

  tasks
    .filter(task => !/^pause$/i.test(task.text))
    .forEach(task => {
      if (!combinedTasks[task.text]) {
        combinedTasks[task.text] = 0;
      }
      combinedTasks[task.text] += (task.end - task.start) / HOUR;
    });

  return Object.entries(combinedTasks).map(entry => {
    const [text, hours] = entry;
    return { text, hours };
  });
}
