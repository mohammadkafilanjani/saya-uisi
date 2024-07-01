<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-6 col-sm-8 col-xs 10">
          <div class="text-h5 q-mb-md">Manajemen Kelas</div>
        </div>
        <div class="col-md-6 col-sm-8 col-xs 10">
          <q-btn color="primary" @click="(() => data.addKelasDialog = true)">Tambah Kelas</q-btn>
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Nama Kelas</th>
            <th class="text-left">Nama Dosen</th>
            <th class="text-left">Program Studi</th>
            <th class="text-left">Semester</th>
            <th class="text-left">Tahun Ajaran</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kelas in data.kelas" :key="kelas.id">
            <td class="text-left">{{ kelas.nama_kelas }}</td>
            <td class="text-left">{{ kelas.nama_dosen }}</td>
            <td class="text-left">{{ kelas.nama_program_studi }}</td>
            <td class="text-left">{{ kelas.semester }}</td>
            <td class="text-left">{{ kelas.tahun_ajaran }}</td>
            <td class="text-left">
              <q-btn size="sm" color="red" class="q-mr-md" @click="handleDeleteKelas(kelas.id)">hapus</q-btn>
              <q-btn size="sm" color="green" @click="showEditDialog(kelas)">edit</q-btn>
              <q-btn size="sm" color="primary" class="q-ml-md"
                :to="{ name: 'AdminKelasManagementListMahasiswaPage', params: { id: kelas.id } }">List Mahasiswa</q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddDialogComponent @success-add-kelas="handleSuccess" />
    <EditDialogComponent @success-edit-kelas="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
import { useKelasManagementStore } from 'src/stores/kelas-management';
import { onMounted } from 'vue';
import AddDialogComponent from 'src/components/admin/management-kelas/AddDialogComponent.vue';
import EditDialogComponent from 'src/components/admin/management-kelas/EditDialogComponent.vue';
import { useQuasar } from 'quasar'
import { useApiWithAuthorization } from 'src/composables/api';
import { useNotify } from 'src/composables/notifications';
import { Kelas } from 'src/models/kelas';

const { $state: data, setKelas } = useKelasManagementStore()
const { dialog } = useQuasar()

const fetchKelasManagement = async () => {
  try {
    await setKelas()
  } catch (error) {
    console.log(error);

  }
}

const handleSuccess = async () => {
  await fetchKelasManagement();
}

const handleDeleteKelas = async (id: number) => {
  dialog({
    title: 'Konfirmasi',
    message: 'anda yakin?',
    cancel: true,
    persistent: true,
    ok: {
      push: false
    }
  }).onOk(async () => {
    try {
      const response = await useApiWithAuthorization.delete(`admin/management-kelas/${id}`);
      if (response.status === 200) {
        await fetchKelasManagement();
        useNotify('Kelas Berhasil di hapus', 'green');
      }
    } catch (error) {
      throw error;
    }
  })
}



const showEditDialog = (kelas: Kelas) => {
  data.editKelasDialog = true
  data.editedKelas = kelas;

}

onMounted(async () => {
  await fetchKelasManagement();
})
</script>

<style scoped></style>
