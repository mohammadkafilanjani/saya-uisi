import { defineStore } from 'pinia';

export const useManagementJadwalStore = defineStore('management-jadwal', {
  state: () => ({
    addJadwalDialog: false,
    addedData: {
      id_mata_kuliah: 0,
      id_dosen: 0,
      kelas_id: 0,
    },
    editJadwalDialog: false,
    editedData: {
      kelas_name: '',
      kelas_id: 0,
      id_jadwal: null as number | null,
    },
  }),
});
