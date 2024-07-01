import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import { isAdmin, isAuthenticated } from 'src/composables/auth';
import { useUserStore } from 'src/stores/user';
import { useUser } from 'src/composables/auth/user';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  const { $state, setUser } = useUserStore();
  router.beforeEach(async (to, from, next) => {
    // set user store before rendering page
    if ($state.id === 0) {
      if (Cookies.get('token')) {
        try {
          const response = await useUser(Cookies.get('token'));
          setUser(response.data);
        } catch (error) {
          throw error;
        }
      }
    }
    if (to.meta.requiresAdmin) {
      if (isAdmin()) next();
      else next({ name: 'UnauthorizedPage' });
    } else if (to.meta.requiresAuth && !isAuthenticated()) {
      if (to.name !== 'signin') {
        next({ name: 'SignInPage' });
      } else {
        next();
      }
    } else if (to.meta.requiresGuest && isAuthenticated()) {
      next('/');
    } else {
      next();
    }
  });
});
