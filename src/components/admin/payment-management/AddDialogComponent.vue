<template>
  <div>
    <q-dialog @before-show="setModel()" v-model="data.addBillDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Buat Tagihan</div>
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
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.addBillDialog = false" />
            <q-btn type="submit" color="primary" label="Buat" :loading="loading" />
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

const { $state: data } = usePaymentStore()
const emit = defineEmits(['successAddProgramStudi']);

const billForm = ref({
  email: '',
  description: '',
  amount: 0,
  due_date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
});

const rules = {
  description: { required: useRequired() },
  amount: { required: useRequired() },
  due_date: { required: useRequired() },
}
const v$ = useVuelidate(rules, billForm.value)
const loading = ref(false);

const setModel = () => {
  billForm.value.email = data.addedMahasiswa.email;
}

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.post('admin/management-payment/bill', { ...billForm.value, user_id: data.addedMahasiswa.id });
      if (response.status === 201) {
        useNotify('Berhasil menambahkan Tagihan', 'green');
        data.addBillDialog = false;
        emit('successAddProgramStudi');
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
