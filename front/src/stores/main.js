import {defineStore} from "pinia";
export const useMainStore = defineStore("main", {
  state: () => ({
    id: null,
    userName: null,
    userEmail: null,
    userRole: null,
  }),
  actions: {
    setUser(payload) {
      if (payload._id) {
        this.id = payload._id;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.firstname && payload.lastname) {
        this.userName = payload.firstname + " " + payload.lastname;
      }
      if (payload.role) {
        this.userRole = payload.role;
      }
    },
  },
});
