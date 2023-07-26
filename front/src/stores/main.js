import {defineStore} from "pinia";
export const useMainStore = defineStore("main", {
  state: () => ({
    currentUser : {
      id: "",
      userEmail: "",
      userName: "",
      userRole: ""
    }
  }),
  actions: {      
    async setUser(payload) {
      if (payload._id) {
        this.currentUser.id = payload._id;
      }
      if (payload.email) {
        this.currentUser.userEmail = payload.email;
      }
      if (payload.firstname && payload.lastname) {
        this.currentUser.userName = payload.firstname + " " + payload.lastname;
      }
      if (payload.role) {
        this.currentUser.userRole = payload.role;
      }
    },
  },
});
