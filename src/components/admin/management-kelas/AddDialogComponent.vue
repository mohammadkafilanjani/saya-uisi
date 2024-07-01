<template>
  <div>
    <q-dialog @before-show="setModel()" v-model="data.addKelasDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit()">
          <q-card-section>
            <div class="text-h6">Tambah Kelas</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input label="Nama Kelas" dense v-model="mataKuliahForm.name" autofocus :error="v$.name.$error"
              :error-message="v$.name.$errors.map((e) => e.$message).join()" @input="v$.name.$touch"
              @blur="v$.name.$touch" />
            <q-input label="Ruagan Kelas" dense v-model="mataKuliahForm.ruangan" autofocus :error="v$.ruangan.$error"
              :error-message="v$.ruangan.$errors.map((e) => e.$message).join()" @input="v$.ruangan.$touch"
              @blur="v$.ruangan.$touch" />
            <q-input label="Semester" dense v-model="mataKuliahForm.semester" autofocus :error="v$.semester.$error"
              :error-message="v$.semester.$errors.map((e) => e.$message).join()" @input="v$.semester.$touch"
              @blur="v$.semester.$touch" />
            <q-select use-input input-debounce="0" v-model="mataKuliahForm.mata_kuliah_select"
              :options="mataKuliahSelectOptions" @filter="filterMataKuliahSelect" label="Mata Kuliah">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select use-input input-debounce="0" v-model="mataKuliahForm.dosen" :options="dosenSelectOptions"
              @filter="filterDosenSelect" label="Dosen">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input class="q-mt-md" hint="Contoh : 2023/2024" label="Tahun Ajaran" dense
              v-model="mataKuliahForm.tahun_ajaran" autofocus :error="v$.tahun_ajaran.$error"
              :error-message="v$.tahun_ajaran.$errors.map((e) => e.$message).join()" @input="v$.tahun_ajaran.$touch"
              @blur="v$.tahun_ajaran.$touch" />
            <q-select label="Hari" :options="hariOptions" v-model="mataKuliahForm.hari">
            </q-select>
            <q-input label="Waktu Mulai" v-model="mataKuliahForm.waktu_mulai" mask="time" :rules="['time']"
              :error="v$.waktu_mulai.$error" :error-message="v$.waktu_mulai.$errors.map((e) => e.$message).join()"
              @input="v$.waktu_mulai.$touch" @blur="v$.waktu_mulai.$touch">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="mataKuliahForm.waktu_mulai">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input label="Waktu Selesai" v-model="mataKuliahForm.waktu_selesai" mask="time" :rules="['time']"
              :error="v$.waktu_selesai.$error" :error-message="v$.waktu_selesai.$errors.map((e) => e.$message).join()"
              @input="v$.waktu_selesai.$touch" @blur="v$.waktu_selesai.$touch">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="mataKuliahForm.waktu_selesai">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="data.addKelasDialog = false" />
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
import { useNumeric, useRequired } from 'src/composables/validators';
import { useKelasManagementStore } from 'src/stores/kelas-management';
import { ref } from 'vue';
import { MataKuliahOptions } from 'src/models/mata-kuliah';
import { DosenOptions } from 'src/models/dosen';

const { $state: data } = useKelasManagementStore()
const emit = defineEmits(['successAddKelas']);
const hariOptions = ['senin', 'selasa', 'rabu', 'kamis', "jum'at", 'sabtu', 'minggu'];

const mataKuliahForm = ref({
  name: '',
  semester: '',
  mata_kuliah_select: {
    nama_mata_kuliah: '',
    id: 0,
    label: '',
    value: 0,
  },
  dosen: {
    name: '',
    id: 0,
    label: '',
    value: 0,
  },
  tahun_ajaran: '2023/2024',
  hari: '',
  waktu_mulai: '',
  waktu_selesai: '',
  ruangan: ''
});

const mataKuliahOptions = ref<MataKuliahOptions[]>([])
const dosenOptions = ref<DosenOptions[]>([])
const mataKuliahSelectOptions = ref();
const dosenSelectOptions = ref();

const rules = {
  name: { required: useRequired() },
  tahun_ajaran: { required: useRequired() },
  semester: { required: useRequired(), numeric: useNumeric() },
  hari: { required: useRequired() },
  waktu_mulai: { required: useRequired() },
  waktu_selesai: { required: useRequired() },
  ruangan: { required: useRequired() },
}
const v$ = useVuelidate(rules, mataKuliahForm.value)
const loading = ref(false);


const setModel = async () => {

  try {
    const mataKuliahOptionsResponse = await useApiWithAuthorization.get('mata-kuliah/get/options');

    mataKuliahOptions.value = mataKuliahOptionsResponse.data.mataKuliahOptions.map((mataKuliah: MataKuliahOptions) => {
      return {
        nama_mata_kuliah: mataKuliah.nama_mata_kuliah,
        value: mataKuliah.id,
        label: mataKuliah.nama_mata_kuliah,
        id: mataKuliah.id
      }
    })

    const dosenOptionsResponse = await useApiWithAuthorization.get('dosen/get-all')
    dosenOptions.value = dosenOptionsResponse.data.dosens.map((dosen: DosenOptions) => {
      return {
        name: dosen.name,
        value: dosen.id,
        label: dosen.name,
        id: dosen.id
      }
    })

  } catch (error) {
    throw error;
  }
}

const filterDosenSelect = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      dosenSelectOptions.value = dosenOptions.value

    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    dosenSelectOptions.value = dosenOptions.value.filter((v) => v.name.toLowerCase().indexOf(needle) > -1)
  })
}
const filterMataKuliahSelect = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      mataKuliahSelectOptions.value = mataKuliahOptions.value

    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    mataKuliahSelectOptions.value = mataKuliahOptions.value.filter((v) => v.nama_mata_kuliah.toLowerCase().indexOf(needle) > -1)
  })
}

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    loading.value = true
    try {
      const response = await useApiWithAuthorization.post('admin/management-kelas', {
        ...mataKuliahForm.value,
        nama_kelas: mataKuliahForm.value.name,
        mata_kuliah_id: mataKuliahForm.value.mata_kuliah_select.id,
        dosen_id: mataKuliahForm.value.dosen.id,
      });
      if (response.status === 201) {
        useNotify('Berhasil menambahkan Kelas', 'green');
        data.addKelasDialog = false;
        emit('successAddKelas');
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
