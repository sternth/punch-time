import { TaskData } from '@/common/types/TaskData';

const taskDataList = [
  {
    _id: '5fe0ec5ad1f53a40c0d749a1',
    start: 1605963600000,
    end: 1605974400000,
    text: 'My test task',
    type: 'Test',
  },
  {
    _id: '5fe0ec5ad1f53a40c0d749b2',
    start: 1606024800000,
    end: 1606039200000,
    text: 'My other test task',
    type: 'Test',
  },
  {
    _id: '5fe0ec5ad1f53a40c0d749c3',
    start: 1606039200000,
    end: 1606044600000,
    text: 'Another test task',
    type: 'Test',
  },
  {
    _id: '5fe0ec5ad1f53a40c0d749d4',
    start: 1606044600000,
    end: 1606050000000,
    text: 'This is a test task',
    type: 'Test',
  },
  {
    _id: '5fe0ec5ad1f53a40c0d749e5',
    start: 1606051800000,
    end: 1606060800000,
    text: 'My last test task',
    type: 'Test',
  }
];

export function getTaskData (index: number): TaskData {
  return Object.assign({}, taskDataList[index]);
}
