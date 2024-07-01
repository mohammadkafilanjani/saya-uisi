<template>
  <div>
    <q-page padding>
      <q-markup-table wrap-cells>
        <thead>
          <tr>
            <th class="text-left">Nama</th>
            <th class="text-left">Email</th>
            <th class="text-left">Peran</th>
            <th class="text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data.users" :key="user.id">
            <td class="text-left">{{ user.name }}</td>
            <td class="text-left">{{ user.email }}</td>
            <td class="text-left">{{ user.role.name }}</td>
            <td class="text-left"><q-btn color="purple" @click="showChangeRoleDialog(user.id)">Ganti
                Peran</q-btn></td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-page>
    <ChangeRoleDialog @success-change-role="handleSuccessChangeRole()" />
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from 'src/stores/admin';
import { useUserManagement } from 'src/stores/user-management';
import { onMounted } from 'vue';
import ChangeRoleDialog from 'src/components/admin/user-management/ChangeRoleDialog.vue';

const { $state: data, setUsers } = useAdminStore()
const { $state: userManagementState } = useUserManagement()

const showChangeRoleDialog = (id: number) => {
  userManagementState.showChangeRoleDialog = true;
  userManagementState.selectedUserIdToChangeRole = id;
}

const handleSuccessChangeRole = async () => {
  try {
    await setUsers();
  } catch (error) {

    throw error;
  }
}

onMounted(async () => {
  try {
    await setUsers();
  } catch (error) {

    throw error;
  }
})
</script>

<style scoped></style>
