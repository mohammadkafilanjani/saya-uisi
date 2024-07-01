<template>
  <div>
    <q-page padding>
      <div class="row items-center justify-between">
        <div class="col-md-4 col-sm-6 col-xs-8">
          <div class="text-h6">Tagihan yang {{ paidTitle }}</div>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-4">
          <q-select @popup-hide="handleStatusChanged" dense label="Jenis Tagihan" v-model="paidModel"
            :options="paidOptions"></q-select>
        </div>
      </div>
      <div class="row">
        <q-markup-table wrap-cells class="full-width">
          <thead>
            <tr>
              <th class="text-left">No</th>
              <th class="text-left">Deskripsi</th>
              <th class="text-left">Nominal</th>
              <th class="text-left">Tanggal Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bill, index) in userBills" :key="bill.id">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left">{{ bill.description }}</td>
              <td class="text-left">{{ bill.amount }}</td>
              <td class="text-left">{{ date.formatDate(bill.updated_at, 'DD-MM-YYYY') }}</td>
            </tr>
            <tr v-if="userBills.length === 0">
              <td colspan="4">
                <div class="text-center q-pa-md text-h6">Tidak ada tagihan Belum Terbayar</div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="row justify-center q-mt-xl q-pt-xl">
        <div class="text-body1 text-center">NB: Jika sudah melakukan pembayaran atau ada ketidaksesuaian tagihan,
          silakan konfirmasi ke email finance@uisi.ac.id atau WA ke +62 813-3101-1010.</div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref, watchEffect } from 'vue';
import { date } from 'quasar';

interface BillUser {
  id: number;
  user_id: number;
  description: string;
  amount: number;
  due_date: string;
  is_paid: number;
  updated_at: number;
}

const paidTitle = ref('');
const userBills = ref<BillUser[]>([]);
const paidOptions = [
  {
    label: 'Belum Terbayar',
    value: 'unpaid',
  },
  {
    label: 'Sudah Terbayar',
    value: 'paid',
  },
  {
    label: 'Mendatang',
    value: 'upcoming',
  }

];
const paidModel = ref();

const fetchBill = async (query?: string) => {
  try {
    if (query === undefined) {
      const response = await useApiWithAuthorization.get('user/filtered-bills/?status=unpaid');
      userBills.value = response.data
    } else {
      const response = await useApiWithAuthorization.get(`user/filtered-bills/?status=${query}`);
      userBills.value = response.data
    }
  } catch (error) {
    throw error
  }
}

const handleStatusChanged = async () => {
  await fetchBill(paidModel.value.value);
}


onMounted(async () => {
  await fetchBill();

  paidModel.value = paidOptions[0];
})

watchEffect(() => {
  if (paidModel.value) {
    paidTitle.value = paidModel.value.label
  }
})
</script>

<style scoped></style>
