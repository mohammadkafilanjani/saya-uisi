<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-6 col-sm-8 col-xs 10">
          <div class="text-h5 q-mb-md">Manajemen Jadwal Kelas</div>
        </div>
        <div class="col-md-6 col-sm-8 col-xs 10">
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th colspan="4">
              <div class="text-h6 text-left">List Kelas</div>
            </th>
          </tr>
          <tr>
            <th class="text-left">Nama Kelas</th>
            <th class="text-left">Mata Kuliah</th>
            <th class="text-left">Dosen</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kelas in classes" :key="kelas.id_kelas" :class="kelas.jadwal_dibuat ? '' : 'bg-warning'">
            <td class="text-left">{{ kelas.nama_kelas }}</td>
            <td class="text-left">{{ kelas.nama_mata_kuliah }}</td>
            <td class="text-left">{{ kelas.nama_dosen }}</td>
            <td class="text-left">
              <q-btn color="primary" v-if="!kelas.jadwal_dibuat" class="q-mr-md"
                @click="handleAddManagementJadwalDialog(kelas.id_kelas)">Buat
                Jadwal</q-btn>
              <q-btn color="green" v-else class="q-mr-md"
                @click="handleEditManagementJadwalDialog(kelas.id_kelas, kelas.jadwal_id)">Edit Jadwal</q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddDialogComponent @success-emit="fetchClasses()" />
    <EditDialogComponent @success-emit="fetchClasses()" />
    <!-- <AddDialogComponent @success-add-program-studi="handleSuccessAddProgramStudi" />
    <EditDialogComponent @success-edit-program-studi="handleSuccessAddProgramStudi" /> -->
  </div>
</template>


<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref } from 'vue';
import { useManagementJadwalStore } from 'stores/management-jadwal';
import AddDialogComponent from 'src/components/admin/management-jadwal/AddDialogComponent.vue';
import EditDialogComponent from 'src/components/admin/management-jadwal/EditDialogComponent.vue';

const { $state } = useManagementJadwalStore();

interface ClassesAndScheduleStatus {
  id_kelas: number;
  nama_kelas: string;
  nama_dosen: string;
  nama_mata_kuliah: string;
  jadwal_dibuat: boolean;
  id_dosen: number;
  id_mata_kuliah: number;
  jadwal_id: number | null;
}

const classes = ref<ClassesAndScheduleStatus[]>([]);

const fetchClasses = async () => {
  try {
    const response = await useApiWithAuthorization.get('admin/classes/schedule-status');
    classes.value = response.data.data;

  } catch (error) {
    console.log(error);

  }

}

const handleAddManagementJadwalDialog = (kelas_id: number) => {
  $state.addJadwalDialog = true;
  $state.addedData.kelas_id = kelas_id;
}

const handleEditManagementJadwalDialog = (kelas_id: number, id_jadwal: number | null) => {
  $state.editJadwalDialog = true;
  $state.addedData.kelas_id = kelas_id;
  $state.editedData.kelas_id = kelas_id
  $state.editedData.id_jadwal = id_jadwal
}



onMounted(async () => {
  await fetchClasses();
})

</script>

<style scoped></style>
