<template>
  <div>
    <q-page padding>
      <div class="row justify-center">
        <div class="col-md-6"><q-img width="100px" :src="`${storageURL}${mahasiswa.gambar}`"></q-img></div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">Email:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.user.email }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">NIM:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.nim }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">Nama:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.user.name }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">No Handphone:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.no_handphone }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">Dosen Wali:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.dosen_wali.name }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">Program Studi:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.program_studi.name }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-4">
          <div class="text-body1">Tahun Masuk:</div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-8">
          <div class="text-body1 text-weight-bold">{{ mahasiswa.tahun_masuk }}</div>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="text-body1">Gambar KTM :</div>
        <div class="col-md-6 col-sm-6 col-xs-6">
          <q-img width="200px" :src="`${storageURL}${mahasiswa.student_card}`"></q-img>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { storageURL } from 'boot/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mahasiswa = ref({
  nim: '',
  no_handphone: '',
  dosen_wali: {
    name: ''
  },
  program_studi: {
    name: ''
  },
  gambar: '',
  student_card: '',
  tahun_masuk: '',
  user: {
    email: '',
    name: ''
  }
});

onMounted(async () => {
  try {
    const response = await useApiWithAuthorization.get(`admin/management-mahasiswa/${route.params.id}`);
    mahasiswa.value = response.data.mahasiswa;

  } catch (error) {
    console.error('Error fetching mahasiswa data:', error);
  }
});
</script>

<style scoped></style>
