<template>
  <div>
    <q-page padding>
      <div class="row justify-center">
        <div class="text-h6">{{ pengumuman.title }}</div>
      </div>
      <div class="row justify-center">
        <div class="text-overline">{{ date.formatDate(pengumuman.announcement_date, 'DD MMMM YYYY') }}</div>
      </div>
      <div class="row justify-center">
        <q-img class="q-my-sm" :src="storageURL + pengumuman.image" width="200px"></q-img>
      </div>
      <div class="row">
        <div class="col-md-8 col-sm-10 col-xs-12">
          <div class="text-body1">{{ pengumuman.content }}</div>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="text-body1 text-weight-bold">Ditulis oleh {{ pengumuman.author }}</div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { storageURL } from 'src/boot/axios';
import { useApiWithAuthorization } from 'src/composables/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { date } from 'quasar'

const route = useRoute()
const pengumuman = ref({
  id: 0,
  title: '',
  content: '',
  author: '',
  announcement_date: '',
  image: ''
})
const getPengumuman = async () => {
  try {
    const response = await useApiWithAuthorization.get(`admin/announcements/${route.params.id}`);
    pengumuman.value = response.data;

  } catch (error) {
    console.log(error);

  }
}

onMounted(async () => {
  await getPengumuman();

})
</script>

<style scoped></style>
