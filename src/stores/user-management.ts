import { defineStore } from 'pinia';

export const useUserManagement = defineStore('user-management', {
  state: () => ({
    showChangeRoleDialog: false,
    selectedUserIdToChangeRole: 0,
  }),
});
