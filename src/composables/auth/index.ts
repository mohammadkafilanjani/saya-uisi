import { useUserStore } from 'src/stores/user';
import { Cookies } from 'quasar';

const isAuthenticated = (): boolean => {
  const token = Cookies.get('token');
  return !!token;
};

const isAdmin = (): boolean => {
  const { role } = useUserStore();
  if (role === 'admin') return true;
  else return false;
};

export { isAuthenticated, isAdmin };
