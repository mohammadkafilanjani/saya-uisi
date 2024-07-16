<template>
  <div>
    <q-markup-table class="q-mt-md">
      <thead>
        <tr>
          <th colspan="4">
            <div class="text-left text-h6">Jadwal Perkuliahan</div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Hari</th>
          <th class="text-left">Mata Kuliah</th>
          <th class="text-left">Jam</th>
          <th class="text-left">Ruangan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jadwal in jadwalMahasiswa" :key="jadwal.id">
          <td class="text-left">{{ jadwal.hari }}</td>
          <td class="text-left">{{ jadwal.mata_kuliah }}</td>
          <td class="text-left">{{ jadwal.waktu_mulai }}</td>
          <td class="text-left">{{ jadwal.ruangan }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { ref } from 'vue';

interface JadwalMahasiswa {
  id: number;
  mata_kuliah: string;
  hari: string;
  waktu_mulai: string;
  waktu_selesai: string;
  ruangan: string;
  pertemuan_ke: number;
}

const jadwalMahasiswa = ref<JadwalMahasiswa[]>([]);

const fetchJadwal = async () => {
  try {
    const response = await useApiWithAuthorization.get('jadwal-mahasiswa');
    jadwalMahasiswa.value = response.data.data;

  } catch (error) {
    console.log(error);
  }
};

await fetchJadwal();
</script>

<style scoped></style>
