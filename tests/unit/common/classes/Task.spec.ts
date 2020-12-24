import { Task } from '@/common/classes/Task';
import { getTaskData } from '../../../fixtures/tasks.fixtures';
import { TaskData } from '@/common/types/TaskData';

describe('Task', function () {
  let task: Task;
  let anotherTask: Task;

  beforeEach(function () {
    task = new Task(getTaskData(0));
    anotherTask = new Task(getTaskData(1));
  });

  it('should have an id', function () {
    expect(task.id).toEqual(expect.any(String));
  });

  it('should have an unique id', function () {
    expect(anotherTask.id).toEqual(expect.any(String));
    expect(task.id).not.toEqual(anotherTask.id);
  });

  describe('copy()', function () {
    let taskData: TaskData;

    beforeEach(function () {
      taskData = getTaskData(2);
      task.copy(taskData);
    });

    it('should copy start value into instance', function () {
      expect(task.start).toBe(taskData.start);
    });

    it('should copy end value into instance', function () {
      expect(task.end).toBe(taskData.end);
    });

    it('should copy text value into instance', function () {
      expect(task.text).toBe(taskData.text);
    });

    it('should copy type value into instance', function () {
      expect(task.type).toBe(taskData.type);
    });

    it('should return itself', function () {
      expect(task.copy(taskData)).toBe(task);
    });
  });

  describe('clone()', function () {
    let clone: Task;

    beforeEach(function () {
      clone = task.clone();
    });

    it('should return new task with new id', function () {
      expect(clone.id).not.toBe(task.id);
    });

    it('should return clone with equal task data', function () {
      expect(clone.getData()).toEqual(task.getData());
    });
  });

  describe('setStart()', function () {
    it('should set new start value', function () {
      task.setStart(1606078800000);
      expect(task.start).toBe(1606078800000);
    });

    it('should return itself', function () {
      expect(task.setStart(1606078800000)).toBe(task);
    });
  });

  describe('setEnd()', function () {
    it('should set new end value', function () {
      task.setEnd(1606078800000);
      expect(task.end).toBe(1606078800000);
    });

    it('should return itself', function () {
      expect(task.setEnd(1606078800000)).toBe(task);
    });
  });

  describe('setText()', function () {
    it('should set new text value', function () {
      task.setText('Lorem Ipsum ...');
      expect(task.text).toBe('Lorem Ipsum ...');
    });

    it('should return itself', function () {
      expect(task.setText('Lorem Ipsum ...')).toBe(task);
    });
  });

  describe('setType()', function () {
    it('should set new type value', function () {
      task.setType('JS');
      expect(task.type).toBe('JS');
    });

    it('should return itself', function () {
      expect(task.setType('Analyse')).toBe(task);
    });
  });

  describe('getFormattedDate()', function () {
    it('should return formatted date', function () {
      expect(task.getFormattedDate()).toBe('2020-11-21');
    });
  });

  describe('changeDate()', function () {
    it('should change date from 2020-11-21 to 2020-11-22', function () {
      expect(task.start).toBe(1605963600000);
      task.changeDate('2020-11-22');
      expect(task.start).toBe(1606050000000);
    });

    it('should throw an error for an invalid date', function () {
      expect(() => {
        task.changeDate('inv');
      }).toThrowError('Invalid Date: inv');
    });

    it('should return itself', function () {
      expect(task.changeDate('2020-11-20')).toBe(task);
    });
  });

  describe('getFormattedTime()', function () {
    it('should return formatted time', function () {
      expect(task.getFormattedTime()).toBe('1400-1700');
    });
  });

  describe('changeTime()', function () {
    it('should update start and end with given new time', function () {
      task.changeTime('0800-1100');
      expect(task.start).toBe(1605942000000);
      expect(task.end).toBe(1605952800000);
    });

    it('should throw an error if time is invalid', function () {
      expect(() => {
        task.changeTime('inv');
      }).toThrowError('Invalid Time: inv');
    });

    it('should return itself', function () {
      expect(task.changeTime('1400-1500')).toBe(task);
    });
  });

  describe('update()', function () {
    // tbd.
  });
});
