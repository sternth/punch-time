import { Module } from 'vuex';
import { IRootStore } from '@/common/interfaces/IRootStore';
import { IUserStore } from '@/common/interfaces/IUserStore';

export const UserStorage: Module<IUserStore, IRootStore> = {
  state: {
    name: '',
  },
  mutations: {
    setUserName (state: IUserStore, name: string): void {
      state.name = name;
    },
  },
};
