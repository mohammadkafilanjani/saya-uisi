import { defineStore } from 'pinia';
import { User } from 'src/models/user';
import { api } from 'src/boot/axios';
import { useNotify } from 'src/composables/notifications';
import { UserEditForm } from 'src/models/user';
import { useUser } from 'src/composables/auth/user';
import { Cookies } from 'quasar';

export const useUserStore = defineStore('user', {
  state: (): User => ({
    email: '',
    id: 0,
    name: '',
    role: '',
    avatar: null as string | null,
  }),
  getters: {
    getUser: (state) => (state = state),
  },
  actions: {
    setUser(userData: User) {
      this.$state.id = userData.id;
      this.$state.name = userData.name;
      this.$state.role = userData.role;
      this.$state.email = userData.email;
      this.$state.avatar = userData.avatar;
    },
    resetUser() {
      this.$state.id = 0;
      this.$state.name = '';
      this.$state.email = '';
      this.$state.role = '';
      this.$state.avatar = '';
    },
    async logout() {
      try {
        const response = await api.post(
          'signout',
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }
        );
        if (response.data.success) {
          this.resetUser();
          Cookies.remove('token');
          useNotify('Berhasil logout', 'green');
          this.router.push({ name: 'SignInPage' });
        } else {
          useNotify('Berhasil logout', 'green');
        }
      } catch (error) {
        useNotify('Terjadi masalah', 'red');
        throw error;
      }
    },
    async editProfile(data: UserEditForm): Promise<void> {
      await api.post(`user-profile/${this.id}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await useUser(Cookies.get('token'));
      this.setUser(response.data.user);
    },
  },
});
