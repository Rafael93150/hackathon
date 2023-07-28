<script setup>
import ChatInput from "@/components/ChatInput.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import axiosInstance from "@/utils/axiosInstance";
import { ref } from "vue";

const state = ref({
  messages: [],
});

const init = async () => {
  await fetchEvents();
};

const fetchEvents = async () => {
  state.messages = await axiosInstance.get("/messages/").then((response) => {
    return response.data;
  });
};

const handleSendMessage = (message) => {
  // Ici, vous pouvez ajouter la logique pour envoyer le message au serveur
  // et mettre à jour la liste des messages côté client.
  // Exemple :
  // messages.value.push({
  //   id: messages.value.length + 1,
  //   sender: "Utilisateur 1",
  //   content: message,
  // });
};

init();

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="chat">
        <div class="chat-messages">
          <ChatMessages v-for="message in state.messages" :key="message._id" :message="message" />
        </div>
        <!-- <ChatInput @send-message="handleSendMessage" /> -->
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
