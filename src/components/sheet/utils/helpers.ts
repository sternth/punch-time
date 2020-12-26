import { Task } from '@/common/classes/Task';
import dayjs from 'dayjs';

export function calcRange (tasks: Task[]): string {
  const asc = (a: number, b: number) => a - b;
  const start = tasks.map(task => task.start).sort(asc).shift();
  const end = tasks.map(task => task.end).sort(asc).shift();
  const startHour = dayjs(start).format('HHmm');
  const endHour = dayjs(end).format('HHmm');

  return `${startHour}-${endHour}`;
}

export function sumPauseTime (tasks: Task[]): number {
  let pause = 0;

  tasks
    .filter(task => /^pause$/i.test(task.text))
    .forEach(task => {
      pause += (task.end - task.start);
    });

  return pause / 1000 / 60;
}

export function getToday (): string {
  return dayjs().format('DD.MM.YYYY');
}

export function getYesterday (): string {
  return dayjs().subtract(1, 'day').format('DD.MM.YYYY');
}
