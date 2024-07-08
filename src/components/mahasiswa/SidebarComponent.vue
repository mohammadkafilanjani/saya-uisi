<template>
  <div>
    <q-card class="my-card">
      <div class="row justify-center">
        <q-card-section>
          <q-avatar size="70px">
            <q-img :src="userState.avatar === null ? '' : userState.avatar"></q-img>
          </q-avatar>
        </q-card-section>
        <q-card-section style="padding-top: 0;">
          <div class="text-body1 text-center">
            {{ userState.name }}
          </div>
          <div class="text-center text-subtitle2 text-grey">
            {{ mahasiswa.nim }}
          </div>
          <div class="text-center text-subtitle2 text-grey">
            {{ mahasiswa.prodi }}
          </div>
          <div class="text-center full-width q-px-lg ">
            <q-btn color="black" class="full-width" @click="dialog = true">Lihat KTM</q-btn>
          </div>
        </q-card-section>
      </div>
      <q-card-section>
        <div class="text-body1 text-weight-bold">Status Akademik</div>
        <div class="text-body2 q-mt-sm">Dosen wali : {{ mahasiswa.dosen_wali }}</div>
        <div class="text-body2 q-mt-sm">NIDN dosen : {{ mahasiswa.nidn_dosen_wali }}</div>
        <div class="text-body2 q-mt-sm text-grey">Semester Akademik saat ini :</div>
        <div class="text-body2 q-mt-sm q-mb-md">2023/2024 Genap</div>
        <div class="text-body2 q-mt-sm text-grey">Semester Studi</div>
        <div class="text-body2 q-mt-sm q-mb-md">{{ mahasiswa.semester - 2 }}</div>
        <div class="text-body2 q-mt-sm text-grey">Status Mahasiswa</div>
        <q-badge color="green">Mahasiswa Aktif</q-badge>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog" backdrop-filter="brightness(60%)">
      <q-card style="width: 300px">
        <q-card-section>
          <q-img :src="storageURL + mahasiswa.student_card"></q-img>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn label="Download" color="primary" @click="downloadStudentCard" />
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { storageURL } from 'src/boot/axios';
import { useApiWithAuthorization } from 'src/composables/api';

const dialog = ref(false);

interface BiodataMahasiswa {
  nim: number;
  prodi: string;
  dosen_wali: string;
  nidn_dosen_wali: number;
  semester: number;
  student_card: string;
}

const { $state: userState } = useUserStore();
const mahasiswa = ref<BiodataMahasiswa>({
  dosen_wali: '',
  nidn_dosen_wali: 0,
  nim: 0,
  prodi: '',
  semester: 0,
  student_card: '',
});

const fetchMahasiswa = async () => {
  const response = await useApiWithAuthorization.get('mahasiswa/biodata');
  mahasiswa.value = response.data;
};

const downloadStudentCard = async () => {
  try {
    const response = await useApiWithAuthorization.get('mahasiswa/download-student-card', {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'student_card.jpg'); // or whatever the filename you want
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Failed to download student card:', error);
  }
};

await fetchMahasiswa();
</script>

<style scoped></style>
