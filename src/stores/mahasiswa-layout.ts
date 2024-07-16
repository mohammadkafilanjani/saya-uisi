import { defineStore } from 'pinia';

export const useMahasiswaLayoutStore = defineStore('mahasiswa-layout', {
  state: () => ({
    leftDrawerOpen: false,
  }),
});
