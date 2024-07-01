<template>
  <div>
    <q-page padding>
      <div class="text-h6 text-left">List Mahasiswa</div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th colspan="1">
            </th>
            <th colspan="1"><q-input outlined dense icon v-model="keyword" :loading="inputLoading"
                @keyup.enter="onEnter()" label="cari berdasarkan email" type="text">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input></th>
            <th colspan="2"><q-select @popup-hide="handleSelectedProdi()" dense v-model="prodiKeyword"
                :options="prodiOptions" label="Program Studi"></q-select>
            </th>
            <th colspan="1">
              <q-select dense v-model="tahunMasukKeyword" @popup-hide="handleSelectedTahunMasuk()"
                :options="tahunMasukOptions" label="Tahun Masuk"></q-select>
            </th>
          </tr>

          <tr>
            <th class="text-left">No</th>
            <th class="text-left">Email</th>
            <th class="text-left">NIM</th>
            <th class="text-left">Tahun Masuk</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mhs, index) in mahasiswa" :key="mhs.id">
            <td class="text-left">
              {{ index }}
            </td>
            <td>{{ mhs.email }}</td>
            <td>{{ mhs.nim }}</td>
            <td>{{ mhs.tahun_masuk }}</td>
            <td>
              <q-btn color="blue" label="Buat Tagihan" @click="handleAddDialog(mhs.email, mhs.id)"></q-btn>
              <q-btn class="q-ml-md" color="blue" label="Lihat Tagihan" :to="{
              name: 'AdminPaymentManagementDetailUserPaymentPage',
              params: { user_id: mhs.id }
            }"></q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <AddDialogComponent />
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref } from 'vue';
import { usePaymentStore } from 'stores/payment';
import AddDialogComponent from 'src/components/admin/payment-management/AddDialogComponent.vue';

interface Prodi {
  id: number;
  name: string;
}

interface Mahasiswa {
  id: number;
  email: string;
  nim: number;
  tahun_masuk: number
}

const keyword = ref('');
const prodiKeyword = ref('');
const prodiOptions = ref<string[]>([]);
const tahunMasukKeyword = ref('');
const inputLoading = ref(false);
const { $state } = usePaymentStore();

function getPastYears(numberOfYears: number): number[] {
  const currentYear = new Date().getFullYear();
  const pastYears: number[] = [];
  for (let i = 0; i < numberOfYears; i++) {
    pastYears.push(currentYear - i);
  }
  return pastYears;
}

const tahunMasukOptions = ref<number[]>([]);
const mahasiswa = ref<Mahasiswa[]>([]);

const fetchProdi = async () => {
  try {
    const response = await useApiWithAuthorization.get('program-studi/get-all');
    prodiOptions.value = response.data.program_studis.map((prodi: Prodi) => prodi.name);
    prodiOptions.value.push('Semua');
    prodiKeyword.value = prodiOptions.value.filter((p: string) => { return p === 'Semua' }).toString();
    tahunMasukOptions.value = getPastYears(8);
  } catch (error) {
    throw error;
  }
}

const fetchMahasiswa = async (program_studi?: string, tahun_masuk?: string, email?: string) => {
  try {
    const response = await useApiWithAuthorization.get('admin/management-payment/get-mahasiswa', {
      params: {
        program_studi,
        tahun_masuk,
        email
      }
    });
    mahasiswa.value = response.data;
  } catch (error) {
    console.log(error);

  }
}

const onEnter = async () => {
  try {
    inputLoading.value = true;
    await fetchMahasiswa('', '', keyword.value);
  } catch (error) {
    throw error;
  } finally {
    inputLoading.value = false;
  }
}

const handleSelectedProdi = async () => {
  try {
    if (prodiKeyword.value === 'Semua') {
      await fetchMahasiswa(undefined, '', keyword.value);
    } else {
      await fetchMahasiswa(prodiKeyword.value, '', keyword.value);
    }
  } catch (error) {

  }
}
const handleSelectedTahunMasuk = async () => {
  try {
    await fetchMahasiswa(prodiKeyword.value, tahunMasukKeyword.value, keyword.value);
  } catch (error) {
    throw error
  }
}

const handleAddDialog = (email: string, id: number) => {
  $state.addBillDialog = true;
  $state.addedMahasiswa.email = email;
  $state.addedMahasiswa.id = id;
}

onMounted(async () => {
  await fetchProdi();
  await fetchMahasiswa();
})
</script>

<style scoped></style>
