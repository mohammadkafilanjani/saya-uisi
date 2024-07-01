<template>
  <div>
    <q-dialog @before-show="setModel" v-model="state.addMahasiswaManagementDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit" enctype="multipart/form-data">
          <q-card-section>
            <div class="text-h6">Tambah Mahasiswa</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input class="q-mb-md" label="Nama Mahasiswa" dense v-model="mahasiswaForm.name" autofocus disable />
            <q-input class="q-mb-md" label="Email" dense v-model="mahasiswaForm.email" autofocus disable />
            <q-input class="q-mb-md" label="NIM" dense v-model="mahasiswaForm.nim" autofocus :error="v$.nim.$error"
              :error-message="v$.nim.$errors.map((e) => e.$message).join()" @input="v$.nim.$touch"
              @blur="v$.nim.$touch" />
            <q-input class="q-mb-md" label="Tahun Masuk" dense v-model="mahasiswaForm.tahun_masuk" autofocus
              :error="v$.tahun_masuk.$error" :error-message="v$.tahun_masuk.$errors.map((e) => e.$message).join()"
              @input="v$.tahun_masuk.$touch" @blur="v$.tahun_masuk.$touch" />

            <q-input class="q-mb-md" label="Nomer HP" dense v-model="mahasiswaForm.no_handphone" autofocus
              :error="v$.no_handphone.$error" :error-message="v$.no_handphone.$errors.map((e) => e.$message).join()"
              @input="v$.no_handphone.$touch" @blur="v$.no_handphone.$touch" />

            <q-select v-model="mahasiswaForm.dosen_wali_id" :options="dosenOptions" label="Dosen Wali" />
            <q-select v-model="mahasiswaForm.program_studi_id" :options="prodiOptions" label="Program Studi" />

            <q-file v-model="mahasiswaForm.gambar" label="Foto Mahasiswa" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Submit" type="submit" :loading="loading" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { useApiWithAuthorization } from 'src/composables/api';
import { useNumeric, useRequired } from 'src/composables/validators';
import { ManagementMahasiswaForm } from 'src/models/mahasiswa-management';
import { useMahasiswaManagement } from 'stores/mahasiswa-management'
import { ref } from 'vue';
import { DosenOptions, DosenWithoutNIDN } from 'src/models/dosen';
import { ProgramStudi } from 'src/models/programStudi';
import { ProgramStudiOptions } from 'src/models/prodi';
import { AxiosError } from 'axios';
import { useNotify } from 'src/composables/notifications';


const { $state: state } = useMahasiswaManagement();
const loading = ref(false);
const mahasiswaForm = ref<ManagementMahasiswaForm>({
  name: '',
  email: '',
  nim: '',
  gambar: [],
  dosen_wali_id: {
    id: 0,
    label: '',
    name: '',
    value: 0
  },
  program_studi_id: {
    id: 0,
    label: '',
    name: '',
    value: 0
  },
  no_handphone: 0,
  qr_code: '',
  tahun_masuk: '2024',
})

const dosenOptions = ref<DosenOptions[]>([])
const prodiOptions = ref<ProgramStudiOptions[]>([])

const rules = {
  nim: { required: useRequired(), numeric: useNumeric() },
  no_handphone: { required: useRequired(), numeric: useNumeric() },
  tahun_masuk: { required: useRequired() },
}
const v$ = useVuelidate(rules, mahasiswaForm.value)

const setModel = async () => {
  mahasiswaForm.value.email = state.selectedAddMahasiswaData.email
  mahasiswaForm.value.name = state.selectedAddMahasiswaData.name
  try {
    const dosenResponse = await useApiWithAuthorization.get('dosen/get-all');
    const prodiResponse = await useApiWithAuthorization.get('program-studi/get-all');

    dosenOptions.value = dosenResponse.data.dosens.map((dosen: DosenWithoutNIDN) => {
      return {
        name: dosen.name,
        label: dosen.name,
        id: dosen.id,
        value: dosen.id
      }
    })
    mahasiswaForm.value.dosen_wali_id = dosenOptions.value[0];

    prodiOptions.value = prodiResponse.data.program_studis.map((prodi: ProgramStudi) => {
      return {
        name: prodi.name,
        value: prodi.id,
        label: prodi.name,
        id: prodi.id
      }
    })
    mahasiswaForm.value.program_studi_id = prodiOptions.value[0];

  } catch (error) {
    throw error;
  }
}

const onSubmit = async () => {

  if (!v$.value.$invalid) {
    try {
      loading.value = true;
      await useApiWithAuthorization.post('admin/management-mahasiswa', {
        ...mahasiswaForm.value,
        user_id: state.selectedAddMahasiswaData.id,
        dosen_wali_id: mahasiswaForm.value.dosen_wali_id.id,
        program_studi_id: mahasiswaForm.value.program_studi_id.id
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      state.addMahasiswaManagementDialog = false
    } catch (error) {
      if (error instanceof AxiosError) {

        if (error.response?.status === 400) {

          useNotify(error.response?.data.error, 'red')
        } else {
          useNotify(error.message, 'red')
        }

      } else {
        useNotify('something went wrong!', 'red')
      }
      console.log(error);

    } finally {
      loading.value = false;
    }
  } else {
    v$.value.$touch()
  }

}
</script>

<style scoped></style>
