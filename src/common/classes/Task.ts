import { TaskData } from '@/common/types/TaskData';
import { getDate0 } from '@/common/utils/date-operations/getDate0';
import dayjs from 'dayjs';
import { convertClockTimeInMs } from '@/common/utils/date-operations/convertClockTimeInMs';

export class Task {
  private static counter = 0;

  public readonly id: string;

  private origin!: TaskData;
  private start!: number;
  private end!: number;
  private text!: string;
  private type!: string;

  constructor (data: TaskData) {
    this.id = 'id_' + Task.createId();
    this.copy(data);
    this.save();
  }

  private static createId (): string {
    const zero = '0';
    const number = (Task.counter++).toString();
    const length = Math.max(0, 8 - number.length);
    return zero.repeat(length) + number;
  }

  public copy (data: TaskData): Task {
    Object.assign(this, data);
    return this;
  }

  public clone (): Task {
    return new Task(this.getData());
  }

  public getData (): TaskData {
    return {
      start: this.start,
      end: this.end,
      text: this.text,
      type: this.type,
    };
  }

  public setStart (start: number): Task {
    this.start = start;
    return this;
  }

  public setEnd (end: number): Task {
    this.end = end;
    return this;
  }

  public setText (text: string): Task {
    this.text = text;
    return this;
  }

  public setType (type: string): Task {
    this.type = type;
    return this;
  }

  public getFormattedDate (): string {
    return dayjs(this.start).format('YYYY-MM-DD');
  }

  public changeDate (newDate: string): Task {
    const date0 = getDate0(this.start);
    const time0 = Math.abs(this.start - date0);
    this.setStart(dayjs(newDate).valueOf() + time0);
    return this;
  }

  public getFormattedTime (): string {
    return [
      dayjs(this.start).format('HHmm'),
      dayjs(this.end).format('HHmm'),
    ].join('-');
  }

  public changeTime (newTime: string): Task {
    const [start, end] = newTime.split('-');
    const start0 = getDate0(this.start);
    const end0 = getDate0(this.end);
    this.setStart(start0 + convertClockTimeInMs(start));
    this.setEnd(end0 + convertClockTimeInMs(end));
    return this;
  }

  public async update (): Promise<Task> {
    try {
      const data = await post(this.getData());
      this.copy(data).save();
    } catch (err) {
      this.copy(this.origin);
      throw err;
    }
    return this;
  }

  private save (): void {
    this.origin = this.getData();
  }
}

function post (data: TaskData): Promise<TaskData> {
  return new Promise<TaskData>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve(data);
      } else {
        reject(new Error('NO_UPDATE'));
      }
    }, Math.random() * 500 + 500);
  });
}
