<template>
  <div>
    <q-page padding>
      <div class="row q-mb-md">
        <div class="col-md-6">
          <div class="text-h6">List Riwayat Kehadiran Mata Kuliah</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 " v-for="history in attendanceHistories" :key="history.matakuliah">
          <q-card class="my-card q-ma-md">
            <q-card-section>
              <div class="text-h6 q-mb-sm">{{ history.matakuliah }}</div>
              <div class="text-body1">Semester {{ history.data[0].semester }}</div>
              <div class="text-body1">{{ history.data[0].kelas }}</div>
              <div class="text-body1">{{ history.data[0].tahun_ajaran }}</div>
            </q-card-section>

            <q-card-actions>
              <q-btn color="primary" @click="handleShowDialog(history);">Lihat List
                Kehadiran</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page>
    <q-dialog v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">List Kehadiran {{ selectedMataKuliah?.matakuliah }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-markup-table wrap-cells>
            <thead>
              <tr>
                <th class="text-left">Pertemuan</th>
                <th class="text-left">Tanggal</th>
                <th class="text-left">Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in selectedMataKuliah?.data" :key="h.tanggal">
                <td>{{ h.pertemuan }}</td>
                <td>{{ date.formatDate(h.tanggal, ' DD MMMM YYYY', {
          months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
            'Oktober', 'September', 'November', 'Desember']
        }) }}</td>
                <td><q-badge :color="h.kehadiran === 'Tidak Hadir' ? 'red' : 'green'">{{ h.kehadiran }}</q-badge>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { useUserStore } from 'src/stores/user'
import { date } from 'quasar';

const userStore = useUserStore();
const attendanceHistories = ref<AttendanceHistoryStudy[]>([]);
const dialog = ref(false);
const maximizedToggle = ref(true)

interface AttendanceHistory {
  tahun_ajaran: string;
  semester: string;
  nim: string;
  matakuliah: string;
  kelas: string;
  tanggal: string;
  kehadiran: string;
  pertemuan: number;
}


interface AttendanceHistoryStudy { matakuliah: string; data: AttendanceHistory[] }

const fetchAttendanceHistories = async () => {
  try {
    const response = await useApiWithAuthorization.get(`attendance-histories/mahasiswa/${userStore.$state.id}`);
    attendanceHistories.value = response.data.data;

    attendanceHistories.value = groupByMatakuliah(response.data.rows);

  } catch (error) {
    console.error('Failed to fetch attendance histories:', error);
    throw error;
  }
};

const groupByMatakuliah = (data: AttendanceHistory[]) => {
  const grouped = data.reduce((acc, current) => {
    const { matakuliah } = current;
    if (!acc[matakuliah]) {
      acc[matakuliah] = { matakuliah, data: [] };
    }
    acc[matakuliah].data.push(current);
    return acc;
  }, {} as { [key: string]: { matakuliah: string; data: AttendanceHistory[] } });

  return Object.values(grouped);
};

const selectedMataKuliah = ref<AttendanceHistoryStudy>();

const handleShowDialog = (mataKuliahData: AttendanceHistoryStudy) => {
  dialog.value = true;
  selectedMataKuliah.value = mataKuliahData

}


onMounted(async () => {
  await fetchAttendanceHistories();

});
</script>
