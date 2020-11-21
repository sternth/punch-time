import { IUserStore } from '@/common/interfaces/IUserStore';
import { ITaskStore } from '@/common/interfaces/ITaskStore';

export interface IRootStore {
  user: IUserStore;
  task: ITaskStore;
}
