<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-6 col-sm-8 col-xs 10">
          <div class="text-h5 q-mb-md">Manajemen Program Studi</div>
        </div>
        <div class="col-md-6 col-sm-8 col-xs 10">
          <q-btn color="primary" @click="(() => data.addProgramStudiDialog = true)">Tambah Prodi</q-btn>
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Nama</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="programStudi in data.programStudi" :key="programStudi.id">
            <td class="text-left">{{ programStudi.name }}</td>
            <td class="text-left"><q-btn color="red" class="q-mr-md"
                @click="handleDeleteProgramStudi(programStudi.id)">hapus</q-btn>
              <q-btn color="green" @click="showEditDialog(programStudi.id, programStudi.name)">edit</q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddDialogComponent @success-add-program-studi="handleSuccessAddProgramStudi" />
    <EditDialogComponent @success-edit-program-studi="handleSuccessAddProgramStudi" />
  </div>
</template>

<script setup lang="ts">
import { useProgramStudiStore } from 'src/stores/program-studi';
import { onMounted } from 'vue';
import AddDialogComponent from 'src/components/admin/program-studi-management/AddDialogComponent.vue';
import EditDialogComponent from 'src/components/admin/program-studi-management/EditDialogComponent.vue';
import { useQuasar } from 'quasar'
import { useApiWithAuthorization } from 'src/composables/api';
import { useNotify } from 'src/composables/notifications';

const { $state: data, setProgramStudi } = useProgramStudiStore()
const { dialog } = useQuasar()

const fetchProgramStudi = async () => {
  try {
    await setProgramStudi();
  } catch (error) {
    throw error;
  }
}

const handleSuccessAddProgramStudi = async () => {
  await fetchProgramStudi();
}

const handleDeleteProgramStudi = async (id: number) => {
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
      const response = await useApiWithAuthorization.delete(`admin/program-studi/${id}`);
      if (response.status === 200) {
        await fetchProgramStudi();
        useNotify('Program studi Berhasil di hapus', 'green');
      }
    } catch (error) {
      throw error;
    }
  })
}

const showEditDialog = (id: number, name: string) => {
  data.editProgramStudiDialog = true
  data.editedProgramStudi.id = id;
  data.editedProgramStudi.name = name;
}

onMounted(async () => {
  await fetchProgramStudi();
})
</script>

<style scoped></style>
