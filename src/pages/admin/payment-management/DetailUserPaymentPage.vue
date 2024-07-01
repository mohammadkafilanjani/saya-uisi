<template>
  <div>
    <q-page padding>
      <div class="text-h6 q-mb-md">Tagihan Mahasiswa </div>
      <div class="text-body1"> {{ mahasiswa.email }}</div>
      <div class="text-body1 text-grey"> {{ mahasiswa.nim }}</div>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Deskripsi</th>
            <th class="text-left">Jumlah</th>
            <th class="text-left">Tenggat</th>
            <th class="text-left">Lunas</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id">
            <td class="text-left">
              {{ bill.description }}
            </td>
            <td class="text-left">
              {{ bill.amount }}
            </td>
            <td class="text-left">
              {{ bill.due_date }}
            </td>
            <td class="text-left">
              <q-badge :color="bill.is_paid === 0 ? 'red' : 'green'"
                :label="bill.is_paid === 0 ? 'Belum lunas' : 'lunas'"></q-badge>
            </td>
            <td class="text-left">
              <q-btn label="Edit" color="green" @click="handleEditDialog(bill)"></q-btn>
              <q-btn label="Hapus" color="red" @click="deleteBill(bill)"></q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <EditDialogComponent @success-emit="fetchBillMahasiswa()" />
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { usePaymentStore } from 'src/stores/payment';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import EditDialogComponent from 'src/components/admin/payment-management/EditDialogComponent.vue';
import { useQuasar } from 'quasar';

interface Bill {
  id: number;
  user_id: number;
  description: string;
  amount: number;
  due_date: string;
  is_paid: number;
}
interface Mahasiswa {
  nim: number;
  email: string
}

const route = useRoute();
const { dialog } = useQuasar();
const bills = ref<Bill[]>([]);
const mahasiswa = ref<Mahasiswa>({
  email: '',
  nim: 0
})
const { $state } = usePaymentStore()

const fetchBillMahasiswa = async () => {
  try {
    const response = await useApiWithAuthorization.get(`admin/users/${route.params.user_id}/bills`)
    bills.value = response.data;
  } catch (error) {
    throw error
  }
}

const fetchMahasiswaByUserId = async () => {
  try {
    const response = await useApiWithAuthorization.get(`admin/users/mahasiswa/getByUserId/${route.params.user_id}`)
    mahasiswa.value = response.data

  } catch (error) {
    throw error
  }
}

const handleEditDialog = (bill: Bill) => {
  $state.editedBill = bill;
  $state.editBillDialog = true;
  $state.editedBillMahasiswa.email = mahasiswa.value.email;
}

const deleteBill = (bill: Bill) => {
  dialog({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin menghapus tagihan?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await useApiWithAuthorization.delete(`admin/management-payment/bill/${bill.id}`);
    await fetchBillMahasiswa();
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

onMounted(async () => {
  await fetchBillMahasiswa();
  await fetchMahasiswaByUserId();
})
</script>

<style scoped></style>
