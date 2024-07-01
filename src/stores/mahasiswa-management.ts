import { defineStore } from 'pinia';
import { UserMahasiswa } from 'src/models/mahasiswa-management';

export const useMahasiswaManagement = defineStore('mahasiswa-management', {
  state: () => ({
    addMahasiswaManagementDialog: false,
    selectedAddMahasiswaData: {} as UserMahasiswa,
  }),
  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
