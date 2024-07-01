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
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in pengumuman" :key="p.id">
                <td>{{ p.title }}</td>
                <td>{{ p.author }}</td>
                <td>
                  {{ date.formatDate(p.announcement_date, 'DD-MM-YYYY') }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-page>
    <AddDialogComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import AddDialogComponent from 'src/components/admin/management-pengumuman/AddDialogComponent.vue';
import { usePengumumanStore } from 'src/stores/pengumuman';
import { date } from 'quasar';

const { $state } = usePengumumanStore();
interface Pengumuman {
  id: string;
  title: string;
  author: string;
  announcement_date: string;
}
const pengumuman = ref<Pengumuman[]>([]);

const fetchAnn = async () => {
  try {
    const response = await useApiWithAuthorization.get('admin/announcements');
    pengumuman.value = response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

onMounted(async () => {
  await fetchAnn();
});
</script>
