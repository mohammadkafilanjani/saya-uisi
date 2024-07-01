<template>
  <q-drawer
    v-model="$state.leftDrawerOpen"
    show-if-above
    bordered
    class="bg-white"
    :width="280"
  >
    <q-scroll-area class="fit">
      <q-list padding class="text-grey-8">
        <q-item
          class="GNL__drawer-item"
          v-ripple
          clickable
          :to="{ name: 'HomePage' }"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="fa-solid fa-building-columns"
          class="text-weight-bold"
          label="Informasi Akademik"
          default-opened
        >
          <q-item
            class="GNL__drawer-item q-ml-md"
            v-ripple
            :to="{ name: 'RiwayatStudiIndexPage' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-book-open" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Riwayat Studi</q-item-label>
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
              <q-item-label>Hasil Studi Mahasiswa</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="GNL__drawer-item q-ml-md"
            v-ripple
            :to="{ name: 'AdminMahasiswaManagementPage' }"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="fa-solid fa-scroll" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Transkrip / IPK</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item
          class="GNL__drawer-item"
          v-ripple
          clickable
          :to="{ name: 'InformasiPembayaranIndexPage' }"
        >
          <q-item-section avatar>
            <q-icon name="fa-solid fa-money-bill" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Informasi Pembayaran</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          class="GNL__drawer-item"
          v-ripple
          clickable
          :to="{ name: 'PengumumanPage' }"
        >
          <q-item-section avatar>
            <q-icon name="grid_view" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pengumuman</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item class="GNL__drawer-item" v-ripple clickable>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-clipboard-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kehadiran Perkuliahan</q-item-label>
          </q-item-section>
        </q-item> -->

        <!-- <q-item class="GNL__drawer-item" v-ripple v-for="link in links2" :key="link.text" clickable>
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset class="q-my-sm" />

        <q-item class="GNL__drawer-item" v-ripple v-for="link in links3" :key="link.text" clickable>
          <q-item-section>
            <q-item-label>{{ link.text }} <q-icon v-if="link.icon" :name="link.icon" /></q-item-label>
          </q-item-section>
        </q-item> -->

        <div class="q-mt-md">
          <div class="flex flex-center q-gutter-xs">
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Privacy"
              >Privacy</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Terms"
              >Terms</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="About"
              >About Saya UISI</a
            >
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts" setup>
import { useMahasiswaLayoutStore } from 'stores/mahasiswa-layout';

const { $state } = useMahasiswaLayoutStore();
</script>
