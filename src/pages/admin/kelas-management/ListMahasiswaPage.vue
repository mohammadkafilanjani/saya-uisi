<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-6 col-xs-8 col-10">
          <div class="text-h5 q-mb-md">List Mahasiswa untuk Kelas : {{ kelasName }}</div>
        </div>
        <div class="col-md-6 col-xs-4 col-10">
        </div>
      </div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Nama</th>
            <th class="text-left">Email</th>
            <th class="text-left">NIM</th>
            <th class="text-left">Program Studi</th>
            <th class="text-left">Di setujui</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="mahasiswa in mahasiswaKelas" :key="mahasiswa.mahasiswa_id">
            <tr>
              <td class="text-left">{{ mahasiswa.nama_mahasiswa }}</td>
              <td class="text-left">{{ mahasiswa.email }}</td>
              <td class="text-left">{{ mahasiswa.nim }}</td>
              <td class="text-left">{{ mahasiswa.program_studi }}</td>
              <td class="text-left"><q-badge :color="mahasiswa.disetujui ? 'green' : 'red'"
                  :label="mahasiswa.disetujui ? 'Di setujui' : 'Di Tolak'"></q-badge></td>
              <td class="text-left">
                <q-btn color="primary" class="q-mr-md" v-if="mahasiswa.nilai === null"
                  @click="handleAddNilaiDialogComponent(mahasiswa.nama_mahasiswa, mahasiswa.mahasiswa_id)">Beri
                  Nilai</q-btn>
                <q-btn color="green" class="q-mr-md" v-else
                  @click="handleEditNilaiDialogComponent(mahasiswa.nama_mahasiswa, mahasiswa.mahasiswa_id)">Edit
                  Nilai</q-btn>
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddMahasiswaDialog />
    <AddNilaiDialogComponent @success-add="handleSuccess()" />
    <EditNilaiDialogComponent @success-edit="handleSuccess()" />
  </div>
</template>

<script setup lang="ts">
import AddMahasiswaDialog from 'src/components/admin/mahasiswa-management/AddMahasiswaDialog.vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AddNilaiDialogComponent from 'src/components/admin/management-kelas/AddNilaiDialogComponent.vue';
import EditNilaiDialogComponent from 'src/components/admin/management-kelas/EditNilaiDialogComponent.vue';
import { useKelasManagementStore } from 'src/stores/kelas-management';

const route = useRoute();
const kelasName = ref('');
const { $state } = useKelasManagementStore()

interface ListMahasiswaInClass {
  mahasiswa_id: number;
  nama_mahasiswa: string;
  email: string;
  program_studi: string;
  nim: number;
  disetujui: boolean;
  nilai: string | null;
}

const mahasiswaKelas = ref<ListMahasiswaInClass[]>([]);

const fetchMahasiswaInClass = async () => {
  try {
    const response = await useApiWithAuthorization.get(`kelas/${route.params.id}/mahasiswa`);
    mahasiswaKelas.value = response.data.data;
    kelasName.value = response.data.nama_kelas;

  } catch (error) {
    throw error;
  }
}

const handleAddNilaiDialogComponent = (nama_mahasiswa: string, id: number) => {
  $state.addNilaiMahasiswaKelasDialog = true;
  $state.namaMahasiswaAdded = nama_mahasiswa
  $state.idMahasiswaAdded = id
}

const handleEditNilaiDialogComponent = (nama_mahasiswa: string, id: number) => {
  $state.editNilaiMahasiswaKelasDialog = true;
  $state.namaMahasiswaAdded = nama_mahasiswa
  $state.idMahasiswaEdited = id
}

const handleSuccess = async () => {
  await fetchMahasiswaInClass();
}

onMounted(async () => {
  await fetchMahasiswaInClass();
})
</script>

<style scoped></style>
