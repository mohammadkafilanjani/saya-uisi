<template>
  <div>
    <q-dialog @before-show="setModel()" v-model="data.editNilaiMahasiswaKelasDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Edit Nilai</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="nilaiForm.name" autofocus :error="v$.name.$error"
              :error-message="v$.name.$errors.map((e) => e.$message).join()" @input="v$.name.$touch"
              @blur="v$.name.$touch" disable />
            <q-select dense v-model="nilaiForm.nilai" :options="nilaiOptions" label="Nilai" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.editNilaiMahasiswaKelasDialog = false" />
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
import { useKelasManagementStore } from 'src/stores/kelas-management';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { $state: data } = useKelasManagementStore()
const emit = defineEmits(['successEdit']);
const nilaiOptions = ref(['E', 'DE', 'D', 'CD', 'C', 'BC', 'B', 'AB', 'A']);
const route = useRoute();

const nilaiForm = ref({
  name: '',
  nilai: ''
});

const editedIdNilai = ref<number>(0);

const rules = {
  name: { required: useRequired() },
}
const v$ = useVuelidate(rules, nilaiForm.value)
const loading = ref(false);

const setModel = async () => {
  nilaiForm.value.nilai = '';
  nilaiForm.value.name = data.namaMahasiswaAdded;

  try {
    const response = await useApiWithAuthorization.get(`nilai/kelas/${route.params.id}/mahasiswa/${data.idMahasiswaEdited}`);
    nilaiForm.value.nilai = response.data.data.nilai;
    editedIdNilai.value = response.data.data.id;
  } catch (error) {
    throw error;
  }
}

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.put(`admin/nilai/${editedIdNilai.value}`, {
        ...nilaiForm.value,
        mahasiswa_id: data.idMahasiswaAdded,
        kelas_id: route.params.id
      });
      if (response.status === 200) {
        useNotify('Berhasil mengedit nilai', 'green');
        data.editNilaiMahasiswaKelasDialog = false;
        emit('successEdit');
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
