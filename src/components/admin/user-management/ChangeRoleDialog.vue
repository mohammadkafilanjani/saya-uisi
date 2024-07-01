<template>
  <div>
    <q-dialog @before-show="setRolesSelect" v-model="userManagementState.showChangeRoleDialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Ganti Peran</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select v-model="roleModel" :options="roleOptions" label="Ganti Peran" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn type="submit" color="primary" label="Ganti Role" :loading="loading" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useApiWithAuthorization } from 'src/composables/api';
import { useUserManagement } from 'stores/user-management';
import { ref } from 'vue';
import { RoleSelect } from 'src/models/role';
import { useNotify } from 'src/composables/notifications';

const emit = defineEmits(['successChangeRole'])
const loading = ref(false);
const { $state: userManagementState } = useUserManagement()
const roleOptions = ref<RoleSelect[]>([])
const roleModel = ref<RoleSelect>({
  id: 0,
  name: '',
  label: '',
  value: 0
})

const setRolesSelect = async () => {
  try {
    const response = await useApiWithAuthorization.get('roles');
    roleOptions.value = response.data.data.map((role: RoleSelect) => {
      return {
        name: role.name,
        id: role.id,
        label: role.name,
        value: role.id
      }
    })

  } catch (error) {
    throw error;
  }
}

const onSubmit = async () => {
  try {
    loading.value = true;
    const response = await useApiWithAuthorization.put(`admin/users/change-role/${userManagementState.selectedUserIdToChangeRole}`, {
      role_id: roleModel.value.id
    })
    if (response.status === 200) {
      useNotify(response.data.message, 'green');
      emit('successChangeRole');
      userManagementState.showChangeRoleDialog = false;
    }

  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
