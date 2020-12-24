import axios from 'axios';
import { Module } from 'vuex';
import { IRootStore } from '@/common/interfaces/IRootStore';
import { ITaskStore } from '@/common/interfaces/ITaskStore';
import { Task } from '@/common/classes/Task';
import { TaskData } from '@/common/types/TaskData';
import { ITaskDocument } from '@/common/interfaces/ITaskDocument';

export const TaskStorage: Module<ITaskStore, IRootStore> = {
  state: {
    list: [],
  },
  mutations: {
    addTask (state: ITaskStore, createdTask: ITaskDocument): void {
      state.list.push(new Task(createdTask));
    },
    editTask (state: ITaskStore, editedTask: ITaskDocument): void {
      const { _id } = editedTask;
      const task = state.list.find(val => val._id === _id);
      if (task) {
        task.copy(editedTask);
      }
    },
    removeTask (state: ITaskStore, removedTask: ITaskDocument): void {
      const { _id } = removedTask;
      const index = state.list.findIndex(val => val._id === _id);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    setTasks (state: ITaskStore, tasks: ITaskDocument[]): void {
      state.list = tasks.map(task => new Task(task));
    },
  },
  actions: {
    addTask ({ commit }, taskData: TaskData): Promise<void> {
      return axios
        .post<ITaskDocument>('/api/tasks', taskData)
        .then(res => {
          commit('addTask', res.data);
        });
    },
    editTask ({ commit }, task: Task): Promise<void> {
      return axios
        .put<ITaskDocument>(`/api/tasks/${task.getId()}`)
        .then(res => {
          commit('editTask', res.data);
        });
    },
    removeTask ({ commit }, task: Task): Promise<void> {
      return axios
        .delete<ITaskDocument>(`/api/tasks/${task.getId()}`)
        .then(res => {
          commit('removeTask', res.data);
        });
    },
    loadTasks ({ commit }): Promise<void> {
      return axios
        .get<ITaskDocument>('/api/tasks?lastDays=31')
        .then(res => {
          commit('setTasks', res.data);
        });
    },
  },
};
