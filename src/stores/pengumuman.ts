import { defineStore } from 'pinia';
import { useApiWithAuthorization } from 'src/composables/api';
import { Pengumuman } from 'src/models/pengumuman';

export const usePengumumanStore = defineStore('pengumuman', {
  state: () => ({
    addDialog: false,
    editDialog: false,
    pengumuman: [] as Pengumuman[],
    edited: {} as Pengumuman,
  }),

  actions: {
    async fetchAnn() {
      try {
        const response = await useApiWithAuthorization.get(
          'admin/announcements'
        );
        this.pengumuman = response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});
