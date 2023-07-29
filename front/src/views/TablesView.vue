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
    console.log("appui sur supprimer");
    socket.emit("deleteMessage", messageId);
  } catch (error) {
    console.error(error);
  }
};

const saveEditedMessage = async (messageId, messageText) => {
  try {
    if (messageText.trim() === "") {
      socket.emit("deleteMessage", messageId);
    } else {
      socket.emit("editMessage", messageId, messageText);
    }
  } catch (error) {
    console.error(error);
  }
};

const addPoints = async (messageId, pointsToAdd) => {
  try {
    await axiosInstance.post(`/messages/${messageId}/addPoints`, {
      pointsToAdd,
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  socket.on("newMessage", (message) => {
    state.messages.unshift(message);
  });
  socket.on("deleteMessage", (messageId) => {
    state.messages = state.messages.filter(
      (message) => message._id.toString() !== messageId.toString()
    );
  });
  socket.on("editMessage", (messageId, newText) => {
    state.messages = state.messages.map((message) => {
      if (message._id.toString() === messageId.toString()) {
        message.text = newText;
      }
      return message;
    });
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
            @add-points="addPoints"
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
