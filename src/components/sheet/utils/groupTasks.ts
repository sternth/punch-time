import { Task } from '@/common/classes/Task';
import dayjs from 'dayjs';

export function groupTasks (tasks: Task[]): Record<string, Task[]> {
  const groups: Record<string, Task[]> = {};

  tasks
    .map(task => task)
    .sort((a, b) => b.start - a.start)
    .forEach(task => {
      const date = dayjs(task.start).format('DD.MM.YYYY');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(task);
    });

  return groups;
}
