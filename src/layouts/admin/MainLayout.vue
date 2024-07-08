<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-grey text-white" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" class="q-mr-sm" />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img src="~/assets/img/uisi-logo.png" width="150px" />
        </q-toolbar-title>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn-dropdown round flat>
            <template v-slot:label>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <q-tooltip>Account</q-tooltip>
            </template>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout()">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-white" :width="280">
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple :to="{ name: 'AdminDashboardPage' }" clickable>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-expansion-item
            expand-separator
            icon="person"
            class="text-weight-bold"
            label="User Management"
            default-opened
          >
            <q-item
              class="GNL__drawer-item q-ml-md"
              v-ripple
              :to="{ name: 'AdminUserManagementPage' }"
              clickable
            >
              <q-item-section avatar>
                <q-icon name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Semua User</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              class="GNL__drawer-item q-ml-md"
              v-ripple
              :to="{ name: 'AdminMahasiswaManagementPage' }"
              clickable
            >
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mahasiswa</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              class="GNL__drawer-item q-ml-md"
              v-ripple
              :to="{ name: 'AdminMahasiswaManagementPage' }"
              clickable
            >
              <q-item-section avatar>
                <q-icon name="fa-solid fa-chalkboard-user" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dosen</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator inset class="q-my-sm" />

          <q-item
            class="GNL__drawer-item"
            v-ripple
            clickable
            :to="{ name: 'AdminProgramStudiManagementPage' }"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-landmark" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manajemen Program Studi</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="GNL__drawer-item"
            v-ripple
            clickable
            :to="{ name: 'AdminMataKuliahManagementDetailPage' }"
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-book-open" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manajemen Mata Kuliah</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="GNL__drawer-item"
            v-ripple
            clickable
            :to="{ name: 'AdminKelasManagementIndexPage' }"
          >
            <q-item-section avatar>
              <q-icon name="auto_stories" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manajemen Kelas</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="GNL__drawer-item"
            v-ripple
            clickable
            :to="{ name: 'AdminJadwalManagementIndexPage' }"
          >
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manajemen Jadwal</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="GNL__drawer-item"
            v-ripple
            clickable
            :to="{ name: 'AdminPaymentManagementIndexPage' }"
          >
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manajemen Pembayaran</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item class="GNL__drawer-item" v-ripple clickable :to="{ name: 'AdminPengumumanPage' }">
            <q-item-section avatar>
              <q-icon name="grid_view" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manajemen Pengumuman</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  name: 'GoogleNewsLayout',

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const userStore = useUserStore();
    const { cookies: qCookies } = useQuasar();
    const search = ref('');
    const showAdvanced = ref(false);
    const showDateOptions = ref(false);
    const exactPhrase = ref('');
    const hasWords = ref('');
    const excludeWords = ref('');
    const byWebsite = ref('');
    const byDate = ref('Any time');

    function onClear() {
      exactPhrase.value = '';
      hasWords.value = '';
      excludeWords.value = '';
      byWebsite.value = '';
      byDate.value = 'Any time';
    }

    function changeDate(option) {
      byDate.value = option;
      showDateOptions.value = false;
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    async function logout() {
      try {
        await userStore.logout();
        if (qCookies.has('token')) {
          qCookies.remove('token', {
            path: '/',
          });
          router.push({ name: 'SignInPage' });
        }
      } catch (e) {
        throw e;
      }
    }

    return {
      leftDrawerOpen,
      search,
      showAdvanced,
      showDateOptions,
      exactPhrase,
      hasWords,
      excludeWords,
      byWebsite,
      byDate,
      logout,

      onClear,
      changeDate,
      toggleLeftDrawer,
    };
  },
};
</script>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
