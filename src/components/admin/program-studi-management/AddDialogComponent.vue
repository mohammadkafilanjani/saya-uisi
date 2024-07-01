<template>
  <div>
    <q-dialog v-model="data.addProgramStudiDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Nama Program Studi</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="programStudiForm.name" autofocus :error="v$.name.$error"
              :error-message="v$.name.$errors.map((e) => e.$message).join()" @input="v$.name.$touch"
              @blur="v$.name.$touch" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.addProgramStudiDialog = false" />
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
import { useRequired } from 'src/composables/validators';
import { useProgramStudiStore } from 'stores/program-studi';
import { ref } from 'vue';

const { $state: data } = useProgramStudiStore()
const emit = defineEmits(['successAddProgramStudi']);

const programStudiForm = ref({
  name: ''
});

const rules = {
  name: { required: useRequired() },
}
const v$ = useVuelidate(rules, programStudiForm.value)
const loading = ref(false);

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.post('admin/program-studi', programStudiForm.value);
      if (response.status === 201) {
        useNotify('Berhasil menambahkan Program studi', 'green');
        data.addProgramStudiDialog = false;
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
