<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn flat dense round @click="$state.leftDrawerOpen = !$state.leftDrawerOpen" aria-label="Menu" icon="menu"
          class="q-mr-sm" />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img src="~/assets/img/uisi-logo.png" width="150px">
        </q-toolbar-title>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn-dropdown round flat>
            <template v-slot:label>
              <q-avatar size="26px">
                <img :src="userState.avatar !== null ? userState.avatar : ''">
              </q-avatar>
            </template>
            <q-list>

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

    <DrawerComponent />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useMahasiswaLayoutStore } from 'src/stores/mahasiswa-layout';
import { useUserStore } from 'src/stores/user';
import DrawerComponent from 'src/components/mahasiswa/layouts/DrawerComponent.vue';


const { $state } = useMahasiswaLayoutStore()
const { logout, $state: userState } = useUserStore()
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
