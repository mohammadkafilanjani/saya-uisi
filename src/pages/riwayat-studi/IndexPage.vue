<template>
  <div>
    <q-page padding>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">No</th>
            <template v-for="(nilaiColumn) in nilaiColumns" :key="nilaiColumn.name">
              <th class="text-left" v-if="nilaiColumn.name === 'mku_kode'">Kode</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'mkl_nama'">Mata Kuliah</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'mku_sks'">SKS</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'nilaihuruf'">Nilai</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'semester'">Semester</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'is_transkrip'">Masuk Tranksrip</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nilaiRow, index) in nilaiRows" :key="nilaiRow.mku_kode"
            :class="nilaiRow.is_transkrip === 'Tidak' ? 'bg-pink-11' : ''">
            <td class="text-left">{{ index + 1 }}</td>
            <td class="text-left">{{ nilaiRow.mku_kode }}</td>
            <td class="text-left">{{ nilaiRow.mkl_nama }}</td>
            <td class="text-left">{{ nilaiRow.mku_sks }}</td>
            <td class="text-left">{{ nilaiRow.nilaihuruf }}</td>
            <td class="text-left">{{ nilaiRow.semester }}</td>
            <td class="text-left">{{ nilaiRow.is_transkrip }}</td>
          </tr>
          <tr>
            <td class="text-center text-weight-bold" colspan="4">Total SKS yang diambil</td>
            <td class="text-center text-weight-bold" colspan="3">{{ totalSks }}</td>
          </tr>
          <tr>
            <td class="text-center text-weight-bold" colspan="4">Total SKS yang diakui</td>
            <td class="text-center text-weight-bold" colspan="3">{{ totalSksDiAkui }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref } from 'vue';

interface Columns {
  name: string;
  friendly_name: string;
  type: string
}

interface RowsInterface {
  mku_kode: string;
  mkl_nama: string;
  mku_sks: number;
  nilaihuruf: string;
  bobot: number;
  semester: string;
  is_transkrip: string;
}

const nilaiRows = ref<RowsInterface[]>([]);
const nilaiColumns = ref<Columns[]>([]);
const totalSks = ref(0);
const totalSksDiAkui = ref(0);

const fetchRiwayatStudi = async () => {
  try {
    const response = await useApiWithAuthorization.get('riwayat-studi')

    nilaiRows.value = response.data.rows
    nilaiColumns.value = response.data.columns;
    nilaiColumns.value = nilaiColumns.value.filter((column: Columns) => column.name !== 'bobot');
    nilaiRows.value.map((nilai: RowsInterface) => {
      totalSks.value += nilai.mku_sks;
    })
    const filterTotalSksDiAkui = nilaiRows.value.filter((nilai: RowsInterface) => nilai.is_transkrip !== 'Tidak');
    filterTotalSksDiAkui.map((nilai: RowsInterface) => {
      totalSksDiAkui.value += nilai.mku_sks;
    })

  } catch (error) {
    console.log(error);

  }

}
onMounted(async () => {
  await fetchRiwayatStudi();
})
</script>

<style scoped></style>
