import { defineStore } from 'pinia';
import { useApiWithAuthorization } from 'src/composables/api';
import { DashboardResponse, User } from 'src/models/admin';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    dashboard: {} as DashboardResponse,
    users: [] as User[],
  }),
  actions: {
    async setDashboard() {
      const getDashboard = await useApiWithAuthorization.get('admin/dashboard');
      this.dashboard = getDashboard.data;
    },
    async setUsers() {
      const getUsers = await useApiWithAuthorization.get('admin/users');
      this.users = getUsers.data.users;
    },
  },
});
