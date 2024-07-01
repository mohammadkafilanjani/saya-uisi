import { defineStore } from 'pinia';
import { useApiWithAuthorization } from 'src/composables/api';
import { Kelas, KelasWithProdiNameAndDosenName } from 'src/models/kelas';

export const useKelasManagementStore = defineStore('kelas-management', {
  state: () => ({
    kelas: [] as KelasWithProdiNameAndDosenName[],
    addKelasDialog: false,
    editKelasDialog: false,
    editedKelas: {} as Kelas,
    addNilaiMahasiswaKelasDialog: false,
    namaMahasiswaAdded: '',
    idMahasiswaAdded: 0,
    idMahasiswaEdited: 0,
    editNilaiMahasiswaKelasDialog: false,
  }),
  actions: {
    async setKelas() {
      const response = await useApiWithAuthorization.get(
        'admin/management-kelas'
      );

      this.$state.kelas = response.data.data;
    },
  },
});
