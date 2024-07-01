<template>
  <div>
    <q-page padding>
      <div class="row justify-center">
        <div class="col-md-6">
          <div class="text-h5 text-center">HUBUNGI PEMILIK</div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-md-6">
          <div class="text-body1 text-center q-mb-xs">
            Terima kasih telah menghubungi pemilik barang.
          </div>
          <div class="text-body1 text-center q-mb-xs">
            masukkan detail data Anda
          </div>
          <div class="text-body1 text-center q-mb-xs">
            sistem akan menghubungkan kepada
            pemilik barang yang discan
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-md-7 col-sm-10 col-xs-10">
          <q-form @submit="onSubmit()">
            <q-input class="q-mb-md" label="Nama" dense v-model="foundForm.nama" autofocus :error="v$.nama.$error"
              :error-message="v$.nama.$errors.map((e) => e.$message).join()" @input="v$.nama.$touch"
              @blur="v$.nama.$touch" />
            <q-input class="q-mb-md" label="No Handphone" dense v-model="foundForm.no_handphone" autofocus
              :error="v$.no_handphone.$error" :error-message="v$.no_handphone.$errors.map((e) => e.$message).join()"
              @input="v$.no_handphone.$touch" @blur="v$.no_handphone.$touch" />
            <q-input class="q-mb-md" label="Alamat" dense v-model="foundForm.alamat" autofocus :error="v$.alamat.$error"
              :error-message="v$.alamat.$errors.map((e) => e.$message).join()" @input="v$.alamat.$touch"
              @blur="v$.alamat.$touch" />
            <q-input class="q-mb-md" label="Catatan" dense v-model="foundForm.catatan" autofocus
              :error="v$.catatan.$error" :error-message="v$.catatan.$errors.map((e) => e.$message).join()"
              @input="v$.catatan.$touch" @blur="v$.catatan.$touch" />
            <q-btn class="q-mt-md" color="green" type="submit" icon="call" :loading="loading">
              Hubungi Pemilik
            </q-btn>
          </q-form>
        </div>
      </div>
    </q-page>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terima Kasih</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Data anda telah kami sampaikan kepada pemilik barang, selanjutnya pemilik yang akan menghubungi.!!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { api } from 'src/boot/axios';
import { useNotify } from 'src/composables/notifications';
import { useMinLength, useNumeric, useRequired } from 'src/composables/validators';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const alert = ref(false);
const route = useRoute();
const loading = ref(false)
const foundForm = ref({
  nama: '',
  no_handphone: '',
  alamat: '',
  catatan: ''
})

const rules = {
  nama: { required: useRequired(), minLength: useMinLength(4) },
  no_handphone: { required: useRequired(), numeric: useNumeric() },
  alamat: { required: useRequired() },
  catatan: { required: useRequired() },
}
const v$ = useVuelidate(rules, foundForm.value)

const onSubmit = async () => {
  try {
    loading.value = true;

    if (!v$.value.$invalid) {
      const response = await api.post(`qr/${route.params.hash}`, {
        name: foundForm.value.nama,
        phone: foundForm.value.no_handphone,
        address: foundForm.value.alamat,
        notes: foundForm.value.catatan,
      });
      if (response.status === 200) {
        useNotify('Berhasil Menghubungi Pemilik', 'green');
        alert.value = true;
      }

    } else {
      v$.value.$touch()
    }

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
