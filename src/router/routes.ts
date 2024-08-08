import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/mahasiswa/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'HomePage',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'riwayat-studi',
        component: () => import('pages/riwayat-studi/IndexPage.vue'),
        name: 'RiwayatStudiIndexPage',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hasil-studi',
        component: () => import('pages/hasil-studi/IndexPage.vue'),
        name: 'HasilStudiIndexPage',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'informasi-pembayaran',
        component: () => import('pages/informasi-pembayaran/IndexPage.vue'),
        name: 'InformasiPembayaranIndexPage',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'pengumuman',
        component: () => import('pages/admin/pengumuman/IndexPage.vue'),
        name: 'PengumumanPage',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'pengumuman/:id',
        component: () => import('pages/admin/pengumuman/DetailPage.vue'),
        name: 'DetailPengumumanPage',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'riwayat-kehadiran',
        component: () => import('pages/RiwayatKehadiranPage.vue'),
        name: 'RiwayatKehadiran',
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: '/qr/:hash',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/qr/IndexPage.vue'),
        name: 'QrPage',
      },
    ],
  },
  {
    path: '/signin',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/auth/SignInPage.vue'),
        name: 'SignInPage',
        meta: { requiresGuest: true },
      },
    ],
  },
  {
    path: '/signin/google/callback',
    name: 'SignInCallback',
    component: () => import('pages/auth/SignInCallbackPage.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/unauthorized',
    name: 'UnauthorizedPage',
    component: () => import('pages/UnauthorizedPage.vue'),
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/manage-pengumuman/IndexPage.vue'),
        name: 'AdminDashboardPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'manage-pengumuman',
        component: () => import('pages/admin/manage-pengumuman/IndexPage.vue'),
        name: 'AdminPengumumanPage',
      },
      {
        path: 'manage-pengumuman/detail/:id',
        component: () =>
          import('pages/admin/manage-pengumuman/DetailPengumumanPage.vue'),
        name: 'AdminDetailPengumumanPage',
      },
      {
        path: 'user-management',
        component: () => import('pages/admin/user-management/IndexPage.vue'),
        name: 'AdminUserManagementPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'program-studi-management',
        component: () =>
          import('pages/admin/program-studi-management/IndexPage.vue'),
        name: 'AdminProgramStudiManagementPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'mahasiswa-management',
        component: () =>
          import('pages/admin/mahasiswa-management/IndexPage.vue'),
        name: 'AdminMahasiswaManagementPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'mahasiswa-management/detail/:id',
        component: () =>
          import('pages/admin/mahasiswa-management/DetailPage.vue'),
        name: 'AdminMahasiswaManagementDetailPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'mata-kuliah-management',
        component: () =>
          import('pages/admin/mata-kuliah-management/IndexPage.vue'),
        name: 'AdminMataKuliahManagementDetailPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'kelas-management',
        component: () => import('pages/admin/kelas-management/IndexPage.vue'),
        name: 'AdminKelasManagementIndexPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'kelas-management/list-mahasiswa/:id',
        component: () =>
          import('pages/admin/kelas-management/ListMahasiswaPage.vue'),
        name: 'AdminKelasManagementListMahasiswaPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'jadwal-management/',
        component: () => import('pages/admin/jadwal-management/IndexPage.vue'),
        name: 'AdminJadwalManagementIndexPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'payment-management/',
        component: () => import('pages/admin/payment-management/IndexPage.vue'),
        name: 'AdminPaymentManagementIndexPage',
        meta: { requiresAdmin: true },
      },
      {
        path: 'payment-management/bill/:user_id',
        component: () =>
          import('pages/admin/payment-management/DetailUserPaymentPage.vue'),
        name: 'AdminPaymentManagementDetailUserPaymentPage',
        meta: { requiresAdmin: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
