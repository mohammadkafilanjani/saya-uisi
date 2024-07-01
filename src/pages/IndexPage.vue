<template>
  <div>
    <q-page padding>
      <div class="row justify-center">
        <div class="col-md-9 col-sm-10 col-xs-12">
          <div class="row justify-center">
            <div
              :class="$q.screen.lt.md ? ' col-md-7 col-sm-6 col-xs-10 order2 q-mb-md' : 'col-md-7 col-sm-6 col-xs-10'">
              <q-card class="my-card q-mr-md q-pa-md">
                <q-card-section horizontal>
                  <div class="text-body1 text-weight-bold">Jumlah SKS</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="text-subtitle2">
                        <q-icon name="fiber_manual_record" color="blue" />
                        Sudah Di ambil
                      </div>

                      <div class="text-body1 q-ml-lg text-weight-bold">{{ totalSks }} SKS</div>

                    </div>
                    <div class="col-md-1 justify-center row" v-if="$q.screen.gt.xs">
                      <q-separator inset class="full-height text-center" :vertical="true" color="grey"></q-separator>
                    </div>
                    <div class="col-md-5">
                      <div class="text-subtitle2 text-grey">
                        <q-icon name="fiber_manual_record" color="grey" />
                        Yang belum diambil
                      </div>

                      <div class="text-body1 q-ml-lg text-grey text-weight-bold">{{ 144 - totalSks }} SKS</div>
                    </div>

                  </div>

                </q-card-section>
              </q-card>
            </div>
            <div :class="$q.screen.lt.md ? ' col-md-5 col-sm-6 col-xs-10 order-last' : 'col-md-5 col-sm-6 col-xs-10'">
              <q-card class="my-card q-mr-md q-pa-md">
                <q-card-section horizontal>
                  <div class="text-body1 text-weight-bold">Prestasi Akademik</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="text-subtitle2">
                        <q-icon name="fiber_manual_record" color="blue" />
                        IPK
                      </div>

                      <div class="text-body1 q-ml-lg text-weight-bold">{{ ipk }}</div>

                    </div>
                    <div class="col-md-1 justify-center row" v-if="$q.screen.gt.xs">
                      <q-separator inset class="full-height text-center" :vertical="true" color="grey"></q-separator>
                    </div>
                    <div class="col-md-5">
                      <div class="text-subtitle2 ">
                        <q-icon name="fiber_manual_record" color="green" />
                        IP Semester
                      </div>

                      <div class="text-body1 q-ml-lg text-weight-bold">{{ ips }}</div>
                    </div>

                  </div>

                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-md-11">
              <Suspense>
                <classScheduleComponent />
                <template #fallback>
                  Loading..
                </template>
              </Suspense>
            </div>
          </div>
        </div>

        <div
          :class="$q.screen.lt.md ? 'order-first col-md-3 col-sm-8 col-xs-10 q-mb-md' : 'col-md-3 col-sm-8 col-xs-10 '">
          <Suspense>
            <SidebarComponent />
            <template #fallback>
              <q-card>
                <div class="text-h6">Loading..</div>
              </q-card>
            </template>
          </Suspense>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { defineAsyncComponent, onMounted, ref } from 'vue';

const SidebarComponent = defineAsyncComponent(() => import('src/components/mahasiswa/SidebarComponent.vue'))
const classScheduleComponent = defineAsyncComponent(() => import('src/components/mahasiswa/ClassScheduleComponent.vue'));

const totalSks = ref<number>(0);
const ipk = ref<number>(0);
const ips = ref<number>(0);

const fetchTotalSks = async () => {
  try {
    const response = await useApiWithAuthorization.get('mahasiswa/total-sks');
    totalSks.value = response.data.total_sks;
    ipk.value = response.data.ipk;
    ips.value = response.data.ips;


  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  await fetchTotalSks();
})
</script>

<style scoped>
.order2 {
  order: 2;
}
</style>
