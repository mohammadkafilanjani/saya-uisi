<template>
  <div>
    <q-page padding>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-6">
          <q-card flat bordered class="q-mr-md">
            <q-card-section>
              <div class="text-h6">Total User: {{ data.dashboard.users.total }}</div>
            </q-card-section>
            <q-separator inset />

            <q-card-section>
              <p>Dosen: {{ data.dashboard.dosen.total }}</p>
              <p>Mahasiswa: {{ data.dashboard.mahasiswa.total }}</p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-3 col-sm-4 col-xs-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Total Program Studi: {{ data.dashboard.program_studi.total }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts" async>
import { useAdminStore } from 'stores/admin';

const { setDashboard, $state: data } = useAdminStore();

const initDashboard = async () => {

  try {
    await setDashboard();
  } catch (error) {
    throw error;
  }
}

await initDashboard();
</script>

<style scoped></style>
