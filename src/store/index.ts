import { createStore } from 'vuex';
import { IRootStore } from '@/common/interfaces/IRootStore';
import { UserStorage } from '@/store/user-storage';
import { TaskStorage } from '@/store/task-storage';

/* eslint-disable @typescript-eslint/no-explicit-any */
const rootState: any = {};
/* eslint-enable @typescript-eslint/no-explicit-any */

export default createStore<IRootStore>({
  state: rootState,
  mutations: {
  },
  actions: {
  },
  modules: {
    user: UserStorage,
    task: TaskStorage,
  },
});
