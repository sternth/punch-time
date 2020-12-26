import dayjs from 'dayjs';
import { TaskData } from '@/common/types/TaskData';
import { getDate0 } from '@/common/utils/date-operations/getDate0';
import { convertClockTimeInMs } from '@/common/utils/date-operations/convertClockTimeInMs';
import { ITaskDocument } from '@/common/interfaces/ITaskDocument';

export class Task implements ITaskDocument {
  public _id: string; // id from mongodb
  public start!: number;
  public end!: number;
  public text!: string;
  public type!: string;

  constructor (document: ITaskDocument) {
    this._id = document._id;
    this.copy(document);
  }

  public copy (data: TaskData): Task {
    this.start = data.start;
    this.end = data.end;
    this.text = data.text;
    this.type = data.type;
    return this;
  }

  public clone (): Task {
    return new Task(this);
  }

  public getId (): string {
    return this._id;
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

  public getDate (template: string): string {
    return dayjs(this.start).format(template);
  }

  public getFormattedDate (): string {
    return dayjs(this.start).format('YYYY-MM-DD');
  }

  public changeDate (newDate: string): Task {
    const newDateValue = dayjs(newDate).valueOf();

    if (!newDateValue) {
      throw new Error('Invalid Date: ' + newDate);
    }

    const startTime = Math.abs(this.start - getDate0(this.start));
    const endTime = Math.abs(this.end - getDate0(this.end));
    console.log('startTime:', startTime / 1000 / 60);
    console.log('  endTime:', endTime / 1000 / 60);
    this.setStart(newDateValue + startTime);
    this.setEnd(newDateValue + endTime);
    return this;
  }

  public getFormattedTime (): string {
    return [
      dayjs(this.start).format('HHmm'),
      dayjs(this.end).format('HHmm'),
    ].join('-');
  }

  public changeTime (newTime: string): Task {
    if (!/^\d{4}-\d{4}$/.test(newTime)) {
      throw new Error('Invalid Time: ' + newTime);
    }

    const [start, end] = newTime.split('-');
    const start0 = getDate0(this.start);
    const end0 = getDate0(this.end);
    this.setStart(start0 + convertClockTimeInMs(start));
    this.setEnd(end0 + convertClockTimeInMs(end));
    return this;
  }
}
