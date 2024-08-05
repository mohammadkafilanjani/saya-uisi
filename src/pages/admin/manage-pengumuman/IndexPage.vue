<template>
  <div>
    <q-page padding>
      <div class="row q-mb-md">
        <div class="col-md-6">
          <div class="text-h6">List Pengumuman</div>
        </div>
        <div class="col-md-6">
          <q-btn color="primary" @click="$state.addDialog = true">Tambah</q-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <q-markup-table>
            <thead>
              <tr>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Tanggal Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in $state.pengumuman" :key="p.id">
                <td>{{ p.title }}</td>
                <td>{{ p.author }}</td>
                <td>
                  {{ date.formatDate(p.announcement_date, 'DD-MM-YYYY') }}
                </td>
                <td>
                  <q-btn color="blue" flat icon="info"
                    :to="{ name: 'AdminDetailPengumumanPage', params: { id: p.id } }"><q-tooltip>Detail</q-tooltip></q-btn>
                  <q-btn color="red" flat icon="delete" @click="handleDelete(p.id)"></q-btn>
                  <q-btn color="green" flat icon="edit" @click="handleEdit(p)"></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-page>
    <AddDialogComponent />
    <EditDialogComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AddDialogComponent from 'src/components/admin/management-pengumuman/AddDialogComponent.vue';
import EditDialogComponent from 'src/components/admin/management-pengumuman/EditDialogComponent.vue';
import { usePengumumanStore } from 'src/stores/pengumuman';
import { date, useQuasar } from 'quasar';
import { useApiWithAuthorization } from 'src/composables/api';
import { Pengumuman } from 'src/models/pengumuman';

const { $state, fetchAnn } = usePengumumanStore();
const { dialog } = useQuasar();

const handleDelete = async (id: string) => {
  dialog({
    title: 'Konfirmasi',
    message: 'Ingin menghapus pengumuman?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useApiWithAuthorization.delete(`admin/announcements/${id}`);
      await fetchAnn();

    } catch (error) {
      console.log(error);

    }
  })
}

const handleEdit = (p: Pengumuman) => {
  $state.editDialog = true;
  $state.edited = p;
}

onMounted(async () => {
  await fetchAnn();
});
</script>
