<template>
  <div>
    <q-dialog @before-show="setModel()" v-model="data.editBillDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Edit Tagihan</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense label="Email" disable v-model="billForm.email" />
            <q-input dense label="Deskripsi" v-model="billForm.description" autofocus :error="v$.description.$error"
              :error-message="v$.description.$errors.map((e) => e.$message).join()" @input="v$.description.$touch"
              @blur="v$.description.$touch" />
            <q-input dense label="Jumlah Uang" v-model="billForm.amount" autofocus :error="v$.amount.$error"
              :error-message="v$.amount.$errors.map((e) => e.$message).join()" @input="v$.amount.$touch"
              @blur="v$.amount.$touch" />

            <q-input label="Tenggat Tagihan" v-model="billForm.due_date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="billForm.due_date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-toggle v-model="billForm.is_paid" color="primary" keep-color label="Lunas" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.editBillDialog = false" />
            <q-btn type="submit" color="primary" label="Edit" :loading="loading" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { useApiWithAuthorization } from 'src/composables/api';
import { useNotify } from 'src/composables/notifications';
import { useRequired } from 'src/composables/validators';
import { usePaymentStore } from 'src/stores/payment';
import { date } from 'quasar';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { $state: data } = usePaymentStore()
const emit = defineEmits(['successEmit']);
const route = useRoute();

const billForm = ref({
  email: '',
  description: '',
  amount: 0,
  due_date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
  is_paid: false
});

const rules = {
  description: { required: useRequired() },
  amount: { required: useRequired() },
  due_date: { required: useRequired() },
}
const v$ = useVuelidate(rules, billForm.value)
const loading = ref(false);

const setModel = () => {
  billForm.value.email = data.editedBillMahasiswa.email;
  billForm.value.description = data.editedBill.description;
  billForm.value.amount = data.editedBill.amount;
  billForm.value.due_date = data.editedBill.due_date;
  if (data.editedBill.is_paid === 1) {
    billForm.value.is_paid = true
  } else {
    billForm.value.is_paid = false
  }

}

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.put(`admin/management-payment/bill/${data.editedBill.id}`, { ...billForm.value, user_id: route.params.id });
      if (response.status === 200) {
        useNotify('Berhasil mengedit Tagihan', 'green');
        data.editBillDialog = false;
        emit('successEmit');
      }

    } catch (error) {
      throw error;
    } finally {
      loading.value = false
    }
  } else {
    v$.value.$touch()
  }
}
</script>

<style scoped></style>
