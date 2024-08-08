<template>
  <div>
    <q-page padding>
      <div class="row q-mb-md">
        <div class="col-md-6 col-xs-6 col-sm-6">
          <div class="text-h6">Hasil Studi</div>
        </div>
        <div class="col-md-6 col-xs-6 col-sm-6">
          <q-select v-model="tahunAkademikModel" :options="tahunAkademikOptions" label="Tahun Akademik"
            @change="filterByTahunAkademik" />
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">No</th>
            <template v-for="(nilaiColumn) in nilaiColumns" :key="nilaiColumn.name">
              <th class="text-left" v-if="nilaiColumn.name === 'mku_kode'">Kode</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'mkl_nama'">Mata Kuliah</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'mku_sks'">SKS</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'nilaihuruf'">Nilai</th>
              <th class="text-left" v-else-if="nilaiColumn.name === 'bobot'">Bobot</th>
              <th class="text-left">Total</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nilaiRow, index) in filteredRows" :key="nilaiRow.mku_kode"
            :class="nilaiRow.is_transkrip === 'Tidak' ? 'bg-pink-11' : ''">
            <td class="text-left">{{ index + 1 }}</td>
            <td class="text-left">{{ nilaiRow.mku_kode }}</td>
            <td class="text-left">{{ nilaiRow.mkl_nama }}</td>
            <td class="text-left">{{ nilaiRow.mku_sks }}</td>
            <td class="text-left">{{ nilaiRow.nilaihuruf }}</td>
            <td class="text-left">{{ nilaiRow.bobot }}</td>
            <td class="text-left">{{ nilaiRow.mku_sks * nilaiRow.bobot }}</td>
          </tr>
          <tr>
            <td class="text-center text-weight-bold" colspan="3">Total</td>
            <td class="text-left text-weight-bold" colspan="3">{{ totalSks }}</td>
            <td class="text-left text-weight-bold">{{ totalSksBobot }}</td>
          </tr>
          <tr>
            <td class="text-center text-weight-bold" colspan="3">IP Semester</td>
            <td class="text-left text-weight-bold" colspan="4">{{ ipSemester }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';

interface Columns {
  name: string;
  friendly_name: string;
  type: string;
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
const filteredRows = ref<RowsInterface[]>([]);
const nilaiColumns = ref<Columns[]>([]);
const totalSks = ref(0);
const totalSksDiAkui = ref(0);
const totalSksBobot = ref(0);
const tahunAkademikModel = ref('');
const tahunAkademikOptions = ref<string[]>([]);
const ipSemester = ref('');

// Function to filter rows by selected academic year/semester
const filterByTahunAkademik = () => {
  if (tahunAkademikModel.value) {
    filteredRows.value = nilaiRows.value.filter(row => row.semester === tahunAkademikModel.value);
  } else {
    filteredRows.value = nilaiRows.value; // Reset filter if no academic year is selected
  }
  calculateTotals();
};

// Fetch academic years/semesters options
const fetchTahunAkademikOptions = () => {
  const semesters = nilaiRows.value.map(row => row.semester);
  tahunAkademikOptions.value = [...new Set(semesters)];

  tahunAkademikModel.value = tahunAkademikOptions.value[0];

};

const calculateTotals = () => {
  totalSks.value = 0;
  totalSksBobot.value = 0;
  filteredRows.value.forEach((nilai: RowsInterface) => {
    totalSks.value += nilai.mku_sks;
    totalSksBobot.value += nilai.mku_sks * nilai.bobot;
  });
  ipSemester.value = (totalSksBobot.value / totalSks.value).toFixed(2);

};



const fetchRiwayatStudi = async () => {
  try {

    const response = await useApiWithAuthorization.get('riwayat-studi');

    nilaiRows.value = response.data.rows;
    nilaiColumns.value = response.data.columns.filter((column: Columns) => column.name !== 'semester');

    // Populate filtered rows and academic year options
    filteredRows.value = nilaiRows.value;
    fetchTahunAkademikOptions();
    calculateTotals();

    const filterTotalSksDiAkui = nilaiRows.value.filter((nilai: RowsInterface) => nilai.is_transkrip !== 'Tidak');
    filterTotalSksDiAkui.map((nilai: RowsInterface) => {
      totalSksDiAkui.value += nilai.mku_sks;
    });

  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchRiwayatStudi();
});

// Watch for changes in tahunAkademikModel to re-filter rows
watch(tahunAkademikModel, filterByTahunAkademik);
</script>

<style scoped></style>
