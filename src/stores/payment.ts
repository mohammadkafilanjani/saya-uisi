import { defineStore } from 'pinia';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    addBillDialog: false,
    editBillDialog: false,
    editedBill: {
      id: 0,
      user_id: 0,
      description: '',
      amount: 0,
      due_date: '',
      is_paid: 0,
    },
    editedBillMahasiswa: {
      email: '',
    },
    addedMahasiswa: {
      email: '',
      id: 0,
    },
  }),
});
