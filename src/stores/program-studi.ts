import { defineStore } from 'pinia';
import { useApiWithAuthorization } from 'src/composables/api';
import { ProgramStudi } from 'src/models/programStudi';

export const useProgramStudiStore = defineStore('program-studi', {
  state: () => ({
    programStudi: [] as ProgramStudi[],
    addProgramStudiDialog: false,
    editProgramStudiDialog: false,
    editedProgramStudi: {
      name: '',
      id: 0,
    },
  }),
  actions: {
    async setProgramStudi() {
      const response = await useApiWithAuthorization.get('admin/program-studi');
      this.$state.programStudi = response.data.program_studi;
    },
  },
});
