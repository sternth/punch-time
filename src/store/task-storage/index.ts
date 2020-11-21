import { Module } from 'vuex';
import { IRootStore } from '@/common/interfaces/IRootStore';
import { ITaskStore } from '@/common/interfaces/ITaskStore';
import { Task } from '@/common/types/Task';

export const TaskStorage: Module<ITaskStore, IRootStore> = {
  state: {
    list: [],
  },
  mutations: {
    addTask (state: ITaskStore, task: Task): void {
      state.list.push(task);
    },
    removeTask (state: ITaskStore, task: Task): void {
      const index = state.list.indexOf(task);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    setTasks (state: ITaskStore, tasks: Task[]): void {
      state.list = tasks;
    },
  },
  actions: {
    addTask ({ commit }, task: Task): Promise<void> {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          commit('addTask', task);
          resolve();
        }, Math.random() * 500 + 500);
      });
    },
    removeTask ({ commit }, task: Task): Promise<void> {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          commit('removeTask', task);
          resolve();
        }, Math.random() * 500 + 500);
      });
    },
    loadTasks ({ commit }): Promise<void> {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          commit('setTasks', [
            { start: 1605945600000, end: 1605949200000, text: 'Alpha', type: 'JS' },
            { start: 1605949200000, end: 1605954600000, text: 'Bravo', type: 'JS' },
            { start: 1605954600000, end: 1605956400000, text: 'Pause', type: '' },
            { start: 1605956400000, end: 1605967200000, text: 'Delta', type: 'JS' },
            { start: 1605967200000, end: 1605974400000, text: 'Echo', type: 'JS' },
          ]);
          resolve();
        }, Math.random() * 1000 + 1000);
      });
    },
  },
};
