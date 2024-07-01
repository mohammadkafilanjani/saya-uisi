<template>
  <div>
    <q-dialog v-model="data.addDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Tambah Pengumuman</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              label="Judul"
              v-model="pengumumanForm.title"
              autofocus
              :error="v$.title.$error"
              :error-message="v$.title.$errors.map((e) => e.$message).join()"
              @input="v$.title.$touch"
              @blur="v$.title.$touch"
            />
            <q-input
              dense
              label="Konten"
              v-model="pengumumanForm.content"
              autofocus
              :error="v$.content.$error"
              :error-message="v$.content.$errors.map((e) => e.$message).join()"
              @input="v$.content.$touch"
              @blur="v$.content.$touch"
            />
            <q-input
              dense
              label="Tanggal"
              v-model="pengumumanForm.announcement_date"
              autofocus
              :error="v$.announcement_date.$error"
              :error-message="
                v$.announcement_date.$errors.map((e) => e.$message).join()
              "
              @input="v$.announcement_date.$touch"
              @blur="v$.announcement_date.$touch"
            />
            <q-input
              dense
              label="Penulis"
              v-model="pengumumanForm.author"
              autofocus
              :error="v$.author.$error"
              :error-message="v$.author.$errors.map((e) => e.$message).join()"
              @input="v$.author.$touch"
              @blur="v$.author.$touch"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              color="primary"
              label="Cancel"
              @click="data.addDialog = false"
            />
            <q-btn
              type="submit"
              color="primary"
              label="Tambah"
              :loading="loading"
            />
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
import { usePengumumanStore } from 'stores/pengumuman';
import { ref } from 'vue';

const { $state: data } = usePengumumanStore();
const emit = defineEmits(['success']);

const pengumumanForm = ref({
  title: '',
  author: '',
  content: '',
  announcement_date: '',
});

const rules = {
  title: { required: useRequired() },
  author: { required: useRequired() },
  content: { required: useRequired() },
  announcement_date: { required: useRequired() },
};
const v$ = useVuelidate(rules, pengumumanForm.value);
const loading = ref(false);

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true;
    try {
      const response = await useApiWithAuthorization.post(
        'admin/announcements',
        pengumumanForm.value
      );
      if (response.status === 201) {
        useNotify('Berhasil menambahkan Pengumuman', 'green');
        data.addDialog = false;
        emit('success');
      }
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  } else {
    v$.value.$touch();
  }
};
</script>

<style scoped></style>
