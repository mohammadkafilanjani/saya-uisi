<template>
  <div>
    <q-dialog @before-show="setModel()" v-model="data.editJadwalDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Edit Jadwal Kelas</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input autofocus label="Tanggal" v-model="jadwalForm.tanggal" mask="date" :rules="['date']"
              :error="v$.tanggal.$error" :error-message="v$.tanggal.$errors.map((e) => e.$message).join()"
              @input="v$.tanggal.$touch" @blur="v$.tanggal.$touch">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="jadwalForm.tanggal">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Waktu Mulai" v-model="jadwalForm.waktu_mulai" mask="time" :rules="['time']"
              :error="v$.waktu_mulai.$error" :error-message="v$.waktu_mulai.$errors.map((e) => e.$message).join()"
              @input="v$.waktu_mulai.$touch" @blur="v$.waktu_mulai.$touch">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="jadwalForm.waktu_mulai">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Waktu Akhir" v-model="jadwalForm.waktu_akhir" mask="time" :rules="['time']"
              :error="v$.waktu_akhir.$error" :error-message="v$.waktu_akhir.$errors.map((e) => e.$message).join()"
              @input="v$.waktu_akhir.$touch" @blur="v$.waktu_akhir.$touch">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="jadwalForm.waktu_akhir">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Ruangan" dense v-model="jadwalForm.ruangan" :error="v$.ruangan.$error"
              :error-message="v$.ruangan.$errors.map((e) => e.$message).join()" @input="v$.ruangan.$touch"
              @blur="v$.ruangan.$touch" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.editJadwalDialog = false" />
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
import { useManagementJadwalStore } from 'src/stores/management-jadwal';
import { ref } from 'vue';
import { date } from 'quasar';

const { $state: data } = useManagementJadwalStore()
const emit = defineEmits(['successEmit']);

const jadwalForm = ref({
  tanggal: date.formatDate(Date.now(), 'YYYY/MM/DD'),
  waktu_mulai: '10:00',
  waktu_akhir: '12.00',
  ruangan: ''
});

const rules = {
  tanggal: { required: useRequired() },
  waktu_mulai: { required: useRequired() },
  waktu_akhir: { required: useRequired() },
  ruangan: { required: useRequired() },
}
const v$ = useVuelidate(rules, jadwalForm.value)
const loading = ref(false);
const setModel = async () => {
  try {
    const response = await useApiWithAuthorization.get(`admin/management-jadwal/${data.editedData.id_jadwal}`);
    const responseData = response.data.data;
    jadwalForm.value.tanggal = date.formatDate(responseData.tanggal, 'YYYY/MM/DD');
    jadwalForm.value.waktu_mulai = responseData.waktu_mulai;
    jadwalForm.value.waktu_akhir = responseData.waktu_selesai;
    jadwalForm.value.ruangan = responseData.ruangan;

  } catch (error) {

  }
}

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.put(`admin/management-jadwal/${data.editedData.id_jadwal}`, {
        ...jadwalForm.value,
        kelas_id: data.editedData.kelas_id,
        waktu_selesai: jadwalForm.value.waktu_akhir
      });
      console.log(response);

      if (response.status === 200) {
        useNotify('Berhasil mengedit Jadwal Kelas', 'green');
        data.editJadwalDialog = false;
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
