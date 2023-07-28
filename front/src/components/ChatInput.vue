<template>
    <div class="chat-input">
      <input v-model="message" @keydown.enter="sendMessage" placeholder="Saisissez votre message..." />
      <button @click="sendMessage">Envoyer</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      sendMessage() {
        if (this.message.trim() !== "") {
          this.$emit("send-message", this.message.trim());
          this.message = "";
        }
      },
    },
  };
  </script>
  
  <style>
  /* Styles pour le composant ChatInput */
  </style>
  