<template>
  <div class="text-center q-pa-md q-mt-lg">
    <q-spinner color="primary" size="50px" />
    <p>Logging in...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const router = useRouter();
const route = useRoute();
const { cookies: qCookies } = useQuasar();


onMounted(async () => {
  try {
    const tokenUrl = route.query.token;
    if (tokenUrl) {
      qCookies.set('token', tokenUrl, {
        path: '/',
        expires: '2d',
      });
      const cookieToken = qCookies.get('token');
      if (cookieToken) {
        const response = await api.get('user', {
          headers: {
            'Authorization': `Bearer ${cookieToken}`
          }
        });

        const user = response.data;

        if (user.role === 'admin') {
          router.push({ name: 'AdminDashboardPage' });
        } else {
          router.push({ name: 'HomePage' });
        }
      }

    } else {
      console.error('No token found in the URL');
      router.push({ name: 'SignInPage' }); // Redirect to login if no token
    }
  } catch (error) {
    console.error('Error during Google sign-in callback:', error);
    router.push({ name: 'SignInPage' }); // Redirect to login on error
  }
});
</script>
