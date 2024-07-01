<template>
  <div>
    <Suspense>
      <DashboardComponent />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const DashboardComponent = defineAsyncComponent(() => import('components/admin/DashboardComponent.vue'));
</script>

<style scoped></style>
