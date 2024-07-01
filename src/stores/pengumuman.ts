import { defineStore } from 'pinia';

export const usePengumumanStore = defineStore('pengumuman', {
  state: () => ({
    addDialog: false,
  }),
});
