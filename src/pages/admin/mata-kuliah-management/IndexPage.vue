<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-6 col-sm-8 col-xs 10">
          <div class="text-h5 q-mb-md">Manajemen Mata Kuliah</div>
        </div>
        <div class="col-md-6 col-sm-8 col-xs 10">
          <q-btn color="primary" @click="(() => managementaMataKuliahState.addManagementMataKuliahDialog = true)">Tambah
            Mata Kuliah</q-btn>
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Kode</th>
            <th class="text-left">Nama</th>
            <th class="text-left">SKS</th>
            <th class="text-left">PRODI</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mataKuliah in managementaMataKuliahState.mataKuliah" :key="mataKuliah.id">
            <td class="text-left">{{ mataKuliah.kode }}</td>
            <td class="text-left">{{ mataKuliah.nama_mata_kuliah }}</td>
            <td class="text-left">{{ mataKuliah.sks }}</td>
            <td class="text-left">{{ mataKuliah.program_studi.name }}</td>
            <td class="text-left">
              <q-btn color="red" class="q-mr-md" @click="handleDeleteMataKuliah(mataKuliah.id)">hapus</q-btn>
              <q-btn color="green" @click="showEditDialog(mataKuliah.id, mataKuliah)">edit</q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddDialogComponent @success-add-mata-kuliah="handleSuccessAddMataKuliah()" />
    <EditDialogComponent @success-edit-mata-kuliah="handleSuccessAddMataKuliah()" />
  </div>
</template>

<script setup lang="ts">
import { useManagementMataKuliah } from 'src/stores/management-mata-kuliah';
import { onMounted } from 'vue';
import AddDialogComponent from 'src/components/admin/management-mata-kuliah/AddDialogComponent.vue';
import EditDialogComponent from 'src/components/admin/management-mata-kuliah/EditDialogComponent.vue';
import { useQuasar } from 'quasar'
import { useApiWithAuthorization } from 'src/composables/api';
import { useNotify } from 'src/composables/notifications';
import { MataKuliah } from 'src/models/mata-kuliah';

const { $state: managementaMataKuliahState } = useManagementMataKuliah()
const { dialog } = useQuasar()

const fetchMataKuliah = async () => {
  try {
    const response = await useApiWithAuthorization.get('admin/management-mata-kuliah');
    managementaMataKuliahState.mataKuliah = response.data.data

  } catch (error) {
    console.log(error);
    throw error;
  }
}


const handleSuccessAddMataKuliah = async () => {
  await fetchMataKuliah();
}

const handleDeleteMataKuliah = async (id: number) => {
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
      const response = await useApiWithAuthorization.delete(`admin/management-mata-kuliah/${id}`);
      if (response.status === 200) {
        await fetchMataKuliah();
        useNotify('Program studi Berhasil di hapus', 'green');
      }
    } catch (error) {
      throw error;
    }
  })
}

const showEditDialog = (id: number, matakuliah: MataKuliah) => {
  managementaMataKuliahState.editManagementMataKuliahDialog = true
  managementaMataKuliahState.editedMataKuliah = matakuliah;
}

onMounted(async () => {
  await fetchMataKuliah();
})
</script>

<style scoped></style>
