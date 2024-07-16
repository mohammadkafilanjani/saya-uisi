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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bill, index) in userBills" :key="bill.Deskripsi">
              <td class="text-left">{{ index + 1 }}</td>
              <td class="text-left">{{ bill.Deskripsi }}</td>
              <td class="text-left">{{ bill.Nominal }}</td>
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

interface Tagihan {
  Deskripsi: string;
  Nominal: string;
  'Status Bayar': string;
}

const paidTitle = ref('');
const userBills = ref<Tagihan[]>([]);
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

const paidModel = ref({
  label: '',
  value: ''
});
const belumTerbayar = ref<Tagihan[]>([]);
const sudahTerbayar = ref<Tagihan[]>([]);
const mendatang = ref<Tagihan[]>([]);

const fetchBill = async () => {
  try {
    const response = await useApiWithAuthorization.get('student-bill');

    belumTerbayar.value = response.data.rows.filter((tagihan: Tagihan) => {
      return tagihan['Status Bayar'] === 'Belum dibayar'
    });
    sudahTerbayar.value = response.data.rows.filter((tagihan: Tagihan) => {
      return tagihan['Status Bayar'] === 'Sudah dibayar'
    });
    mendatang.value = response.data.rows.filter((tagihan: Tagihan) => {
      return tagihan['Status Bayar'] === 'Tagihan Mendatang'
    });
    userBills.value = belumTerbayar.value;

  } catch (error) {
    throw error
  }
}

const handleStatusChanged = async () => {

  if (paidModel.value.value === 'unpaid') {
    userBills.value = belumTerbayar.value
  } else if (paidModel.value.value === 'paid') {
    userBills.value = sudahTerbayar.value
  } else {
    userBills.value = mendatang.value
  }
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
