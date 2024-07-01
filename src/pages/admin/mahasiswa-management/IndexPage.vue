<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-6 col-xs-8 col-10">
          <div class="text-h5 q-mb-md">List Mahasiswa</div>
        </div>
        <div class="col-md-6 col-xs-4 col-10">
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Nama</th>
            <th class="text-left">Email</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="mahasiswa in userMahasiswa" :key="mahasiswa.id">
            <tr>
              <td class="text-left">{{ mahasiswa.name }}</td>
              <td class="text-left">{{ mahasiswa.email }}</td>
              <td class="text-left">
                <q-btn color="primary" class="q-mr-md" @click="showAddMahasiswaDialog(mahasiswa)">Tambahkan informasi
                  mahasiswa</q-btn>
                <q-btn color="primary" class="q-mr-md"
                  :to="{ name: 'AdminMahasiswaManagementDetailPage', params: { id: mahasiswa.id } }">Detail</q-btn>
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddMahasiswaDialog />
  </div>
</template>

<script setup lang="ts">
import { useMahasiswaManagement } from 'stores/mahasiswa-management';
import AddMahasiswaDialog from 'src/components/admin/mahasiswa-management/AddMahasiswaDialog.vue';
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { UserMahasiswa } from 'src/models/mahasiswa-management';

const { $state: mahasiswaManagementState } = useMahasiswaManagement();

const userMahasiswa = ref<UserMahasiswa[]>([]);

const showAddMahasiswaDialog = (user: UserMahasiswa) => {
  mahasiswaManagementState.addMahasiswaManagementDialog = true;
  mahasiswaManagementState.selectedAddMahasiswaData = user;
}

onMounted(async () => {
  try {
    const response = await useApiWithAuthorization.get('admin/users/mahasiswa/get');
    userMahasiswa.value = response.data.mahasiswa;

  } catch (error) {
    throw error;
  }
})
</script>

<style scoped></style>
