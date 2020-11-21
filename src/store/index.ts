import { createStore } from 'vuex';
import { IRootStore } from '@/common/interfaces/IRootStore';
import { IUserStore } from '@/common/interfaces/IUserStore';
import { ITaskStore } from '@/common/interfaces/ITaskStore';
import { UserStorage } from '@/store/user-storage';
import { TaskStorage } from '@/store/task-storage';

export default createStore<IRootStore>({
  state: {
    user: UserStorage.state as IUserStore,
    task: TaskStorage.state as ITaskStore,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: UserStorage,
    task: TaskStorage,
  },
});
