<template>
  <div>
    <q-page padding>
      <div class="row q-mb-md">
        <div class="col-md-6">
          <div class="text-h6">List Riwayat Kehadiran</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <q-markup-table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kelas</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="attendance in attendanceHistories" :key="attendance.id">
                <td>{{ date.formatDate(attendance.date, 'DD-MM-YYYY') }}</td>
                <td>{{ attendance.class.nama_kelas }}</td>
                <td>{{ attendance.status }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { date } from 'quasar';
import { useUserStore } from 'src/stores/user';

const attendanceHistories = ref<AttendanceHistories[]>([]);
const userStore = useUserStore();
interface ClassName {
  nama_kelas: string;
}
interface AttendanceHistories {
  date: string;
  id: number;
  class: ClassName;
  status: string;
}

const fetchAttendanceHistories = async () => {
  try {
    const response = await useApiWithAuthorization.get(`attendance-histories/mahasiswa/${userStore.$state.id}`);
    console.log(response.data);
    attendanceHistories.value = response.data.data; // Adjust this according to your API response structure

  } catch (error) {
    console.error('Failed to fetch attendance histories:', error);
    throw error;
  }
};

onMounted(async () => {
  await fetchAttendanceHistories();
});
</script>
