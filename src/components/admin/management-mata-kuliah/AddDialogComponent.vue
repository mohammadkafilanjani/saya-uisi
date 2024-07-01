<template>
  <div>
    <q-dialog @before-show="setModel()" v-model="managementMataKuliahState.addManagementMataKuliahDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Form Tambah Mata Kuliah</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input label="Nama Mata Kuliah" dense v-model="mataKuliahForm.nama_mata_kuliah" autofocus
              :error="v$.nama_mata_kuliah.$error"
              :error-message="v$.nama_mata_kuliah.$errors.map((e) => e.$message).join()"
              @input="v$.nama_mata_kuliah.$touch" @blur="v$.kode.$touch" />
            <q-input label="Kode" dense v-model="mataKuliahForm.kode" autofocus :error="v$.kode.$error"
              :error-message="v$.kode.$errors.map((e) => e.$message).join()" @input="v$.kode.$touch"
              @blur="v$.kode.$touch" />
            <q-input label="SKS" dense v-model="mataKuliahForm.sks" autofocus :error="v$.sks.$error"
              :error-message="v$.sks.$errors.map((e) => e.$message).join()" @input="v$.sks.$touch"
              @blur="v$.sks.$touch" />
            <q-select v-model="mataKuliahForm.program_studi_id" :options="prodiOptions" label="Program Studi" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel"
              @click="managementMataKuliahState.addManagementMataKuliahDialog = false" />
            <q-btn type="submit" color="primary" label="Tambah" :loading="loading" />
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
import { useInteger, useRequired, useExceptZero } from 'src/composables/validators';
import { ProgramStudiOptions } from 'src/models/prodi';
import { ProgramStudi } from 'src/models/programStudi';
import { useManagementMataKuliah } from 'src/stores/management-mata-kuliah';
import { ref } from 'vue';

const { $state: managementMataKuliahState } = useManagementMataKuliah()
const emit = defineEmits(['successAddMataKuliah']);

const mataKuliahForm = ref({
  nama_mata_kuliah: '',
  sks: 0,
  kode: '',
  program_studi_id: {
    id: 0,
    label: '',
    name: '',
    value: 0
  },
});
const prodiOptions = ref<ProgramStudiOptions[]>([])

const rules = {
  nama_mata_kuliah: { required: useRequired() },
  kode: { required: useRequired() },
  sks: { required: useRequired(), integer: useInteger(), exceptZero: useExceptZero() },
}
const v$ = useVuelidate(rules, mataKuliahForm.value)
const loading = ref(false);

const setModel = async () => {
  try {
    const prodiResponse = await useApiWithAuthorization.get('program-studi/get-all');



    prodiOptions.value = prodiResponse.data.program_studis.map((prodi: ProgramStudi) => {
      return {
        name: prodi.name,
        value: prodi.id,
        label: prodi.name,
        id: prodi.id
      }
    })
    mataKuliahForm.value.program_studi_id = prodiOptions.value[0];

  } catch (error) {
    throw error;
  }
}


const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.post('admin/management-mata-kuliah', {
        ...mataKuliahForm.value,
        program_studi_id: mataKuliahForm.value.program_studi_id.id
      });
      if (response.status === 201) {
        useNotify('Berhasil menambahkan Program studi', 'green');
        managementMataKuliahState.addManagementMataKuliahDialog = false;
        emit('successAddMataKuliah');
      }

    } catch (error) {
      console.log(error);

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
