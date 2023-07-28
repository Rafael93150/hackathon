<script setup>
import ChatInput from "@/components/ChatInput.vue";
import ChatMessages from "@/components/ChatMessages.vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import axiosInstance from "@/utils/axiosInstance";
import { onMounted, reactive } from "vue";
import { useMainStore } from "@/stores/main";
import io from "socket.io-client";

const mainStore = useMainStore();
const socket = io("http://localhost:3000");

const state = reactive({
  messages: [],
});

axiosInstance.get("/messages/populated").then((response) => {
  state.messages = response.data.reverse();
});

const handleSendMessage = (message) => {
  socket.emit("newMessage", {
    fromUser: mainStore.currentUser._id,
    text: message,
  });
};

const deleteMessage = async (messageId) => {
  try {
    await axiosInstance.delete(`/messages/${messageId}`);
    state.messages = state.messages.filter(
      (message) => message._id !== messageId
    );
  } catch (error) {
    console.error(error);
  }
};

const saveEditedMessage = async (messageId, messageText) => {
  try {
    if (messageText.trim() === "") {
      await axiosInstance.delete(`/messages/${messageId}`);
      state.messages = state.messages.filter(
        (message) => message._id !== messageId
      );
    } else {
      await axiosInstance.put(`/messages/${messageId}`, {
        text: messageText,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  socket.on("newMessage", (message) => {
    state.messages.unshift(message);
  });
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="chat">
        <div class="chat-messages">
          <ChatMessages
            v-for="message in state.messages"
            :key="message._id"
            :message="message"
            @delete-message="deleteMessage"
            @edit-message="saveEditedMessage"
          />
        </div>
        <ChatInput @send-message="handleSendMessage" />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style>
.chat-messages {
  display: flex;
  flex-direction: column-reverse;
  height: calc(100vh - 150px);
  overflow-y: scroll;
}
</style>
