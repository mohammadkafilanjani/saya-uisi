<template>
  <q-drawer v-model="$state.leftDrawerOpen" show-if-above bordered class="bg-white" :width="280">
    <q-scroll-area class="fit">
      <q-list padding class="text-grey-8">
        <q-item class="GNL__drawer-item" v-ripple clickable :to="{ name: 'HomePage' }">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="GNL__drawer-item " v-ripple :to="{ name: 'RiwayatStudiIndexPage' }" clickable>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-book-open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Riwayat Studi</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="GNL__drawer-item " v-ripple :to="{ name: 'HasilStudiIndexPage' }" clickable>
          <q-item-section avatar>
            <q-icon name="auto_stories" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Hasil Studi</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="GNL__drawer-item" v-ripple clickable :to="{ name: 'InformasiPembayaranIndexPage' }">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-money-bill" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Informasi Pembayaran</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="GNL__drawer-item" v-ripple clickable :to="{ name: 'PengumumanPage' }">
          <q-item-section avatar>
            <q-icon name="grid_view" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pengumuman</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="GNL__drawer-item" v-ripple clickable :to="{ name: 'RiwayatKehadiran' }">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-clipboard-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Riwayat Kehadiran</q-item-label>
          </q-item-section>
        </q-item>


        <div class="q-mt-md">
          <div class="flex flex-center q-gutter-xs">
            <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
            <span> · </span>
            <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
            <span> · </span>
            <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Saya UISI</a>
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
