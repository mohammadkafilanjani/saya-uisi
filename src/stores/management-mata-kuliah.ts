import { defineStore } from 'pinia';
import { MataKuliah } from 'src/models/mata-kuliah';

export const useManagementMataKuliah = defineStore('management-mata-kuliah', {
  state: () => ({
    mataKuliah: [] as MataKuliah[],
    addManagementMataKuliahDialog: false,
    editManagementMataKuliahDialog: false,
    editedMataKuliah: {} as MataKuliah,
  }),
});
