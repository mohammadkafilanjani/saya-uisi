<template>
  <div>
    <q-page padding>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">No</th>
            <th class="text-left">Kode</th>
            <th class="text-left">Mata Kuliah</th>
            <th class="text-left">SKS</th>
            <th class="text-left">Nilai</th>
            <th class="text-left">Semester</th>
            <th class="text-left">Masuk Transkrip</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="n in nilai" :key="n.semester">
            <tr v-for="matkul in n.mata_kuliah" :key="matkul.kode">
              <td class="text-left">{{ nomor++ }}</td>
              <td class="text-left">{{ matkul.kode }}</td>
              <td class="text-left">{{ matkul.nama }}</td>
              <td class="text-left">{{ matkul.sks }}</td>
              <td class="text-left">{{ matkul.nilai }}</td>
              <td class="text-left">{{ n.semester }}</td>
              <td class="text-left">{{ matkul.masuk_transkrip }}</td>
              <!-- <td class="text-left"><q-btn color="red" class="q-mr-md"
                  @click="handleDeleteProgramStudi(programStudi.id)">hapus</q-btn>
                <q-btn color="green" @click="showEditDialog(programStudi.id, programStudi.name)">edit</q-btn>
              </td> -->
            </tr>
          </template>
          <tr>
            <td class="text-center text-weight-bold" colspan="4">Total SKS yang diambil</td>
            <td class="text-center text-weight-bold" colspan="3">{{ totalSks }}</td>
          </tr>
          <tr>
            <td class="text-center text-weight-bold" colspan="4">Total SKS yang diakui</td>
            <td class="text-center text-weight-bold" colspan="3">{{ totalSksDiakui }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref } from 'vue';

interface MataKuliah {
  kode: string;
  nama: string;
  sks: number;
  nilai: string;
  masuk_transkrip: string
}

interface Nilai {
  semester: number;
  mata_kuliah: MataKuliah[];
}

const nilai = ref<Nilai[]>([]);
const totalSks = ref(0);
const totalSksDiakui = ref(0);

const fetchRiwayatStudi = async () => {
  try {
    const response = await useApiWithAuthorization.get('riwayat-studi')
    nilai.value = response.data.nilai;
    totalSks.value = response.data.total_sks
    totalSksDiakui.value = response.data.total_sks_diakui

  } catch (error) {
    console.log(error);

  }

}
const nomor = 1;

onMounted(async () => {
  await fetchRiwayatStudi();
})
</script>

<style scoped></style>
