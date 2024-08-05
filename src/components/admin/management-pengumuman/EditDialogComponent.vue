<template>
  <div>
    <q-dialog @before-show="setModel" v-model="data.editDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Edit Pengumuman</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense label="Judul" v-model="pengumumanForm.title" autofocus :error="v$.title.$error"
              :error-message="v$.title.$errors.map((e) => e.$message).join()" @input="v$.title.$touch"
              @blur="v$.title.$touch" />
            <q-input dense label="Konten" v-model="pengumumanForm.content" autofocus :error="v$.content.$error"
              :error-message="v$.content.$errors.map((e) => e.$message).join()" @input="v$.content.$touch"
              @blur="v$.content.$touch" />
            <q-input label="Tanggal" v-model="pengumumanForm.announcement_date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="pengumumanForm.announcement_date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input dense label="Penulis" v-model="pengumumanForm.author" autofocus :error="v$.author.$error"
              :error-message="v$.author.$errors.map((e) => e.$message).join()" @input="v$.author.$touch"
              @blur="v$.author.$touch" />
            <q-file v-model="pengumumanForm.image" label="Upload Gambar" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.editDialog = false" />
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
import { usePengumumanStore } from 'stores/pengumuman';
import { ref } from 'vue';
import { date } from 'quasar';

const { $state: data, fetchAnn } = usePengumumanStore();
const emit = defineEmits(['success']);

const pengumumanForm = ref({
  title: '',
  author: '',
  content: '',
  announcement_date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
  image: [] as any
});

const setModel = () => {
  pengumumanForm.value.title = data.edited.title
  pengumumanForm.value.author = data.edited.author
  pengumumanForm.value.content = data.edited.content
  pengumumanForm.value.announcement_date = data.edited.announcement_date
  pengumumanForm.value.image = null
}

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
    console.log(pengumumanForm.value);

    try {
      const response = await useApiWithAuthorization.post(
        `admin/announcements/${data.edited.id}`,
        { ...pengumumanForm.value, _method: 'PUT' }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
      if (response.status === 200) {
        await fetchAnn();
        useNotify('Berhasil mengedit Pengumuman', 'green');
        data.editDialog = false;
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
