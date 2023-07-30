<template>
  <div
    v-if="!editingMessage"
    class="chat-message"
    @mouseover="showDropdown = true"
    @mouseleave="showDropdown = false"
  >
    <div
      class="avatar chat-message-sender-picture rounded-full block bg-gray-100 dark:bg-slate-800"
      :style="{
        backgroundImage: `url(${
          message.fromUser?.picture
            ? message.fromUser?.picture
            : 'https://avatars.githubusercontent.com/u/33639752?v=4'
        })`,
      }"
    ></div>
    <div>
      <span class="chat-message-sender"
        >{{
          message.fromUser ? message.fromUser.firstname : "Compte supprimé"
        }}
        {{ message.fromUser?.lastname }}
        <small class="chat-message-date">{{
          formatDate(message.createdAt)
        }}</small></span
      >
      <div class="chat-message-content">{{ message.text }}</div>
    </div>

    <div
      v-if="showDropdown && (isCurrentUserMessage() || isCurrentUserAdmin())"
      class="dropdown shadow"
    >
      <button @click="editMessage" class="dropdown-item mr-1" title="Modifier le message">
        <font-awesome-icon :icon="['fas', 'edit']" />
      </button>
      <button
        @click="deleteMessage(message._id)"
        class="dropdown-item text-red-400 mr-1"
        title="Supprimer le message"
      >
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
      </button>
      <button
        v-if="isCurrentUserAdmin()"
        @click="addPoints(message._id, 100)"
        class="dropdown-item"
        title="Ajouter des points"
      >
        <font-awesome-icon :icon="['fas', 'circle-check']" />
      </button>
    </div>
  </div>
  <div v-else>
    <input
      class="block w-full p-4 pl-4 focus:outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @keydown.enter="saveEditedMessage"
      v-model="editedMessageText"
      type="text"
    />
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { ref } from "vue";
import { useMainStore } from "@/stores/main";
import { showToast } from "@/utils/toast";

library.add(faCheckCircle, faStar);
const mainStore = useMainStore();

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editingMessage: false,
      editedMessageText: ref(""),
      showDropdown: false,
    };
  },
  methods: {
    formatDate(date) {
      const dateObj = new Date(date);
      const today = new Date();
      if (
        dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear()
      ) {
        return `Aujourd'hui à ${dateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      } else {
        return dateObj.toLocaleString();
      }
    },
    isCurrentUserMessage() {
      return this.message.fromUser?._id === mainStore.currentUser?._id;
    },
    isCurrentUserAdmin() {
      return mainStore.currentUser.role === "admin"  || mainStore.currentUser.role === "rh";
    },
    deleteMessage() {
      this.$emit("delete-message", this.message._id);
    },
    editMessage() {
      this.editingMessage = true;
      this.editedMessageText = this.message.text;
    },
    addPoints(messageId, pointsToAdd) {
      this.$emit("add-points", messageId, pointsToAdd);
      showToast(`${pointsToAdd} ajoutés à ${this.message.fromUser.firstname}`);
    },
    saveEditedMessage() {
      this.$emit("edit-message", this.message._id, this.editedMessageText);
      this.message.text = this.editedMessageText;
      this.editingMessage = false;
    },
  },
};
</script>

<style>
.chat-message-sender-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}
.chat-message {
  /* background-color: #999; */
  display: flex;
  padding: 8px;
  border-radius: 5px;
  position: relative;
}

.chat-message:hover {
  background-color: #ddd;
}

.chat-message-date {
  color: #aaa;
  font-size: 11px;
  margin-left: 10px;
  font-weight: 400;
}

.dropdown {
  color: #333;
  font-size: 14px;
  position: absolute;
  top: 1px;
  right: 1px;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1px 6px;
  display: flex;
  flex-direction: row;
  z-index: 999;
}

.dropdown-item {
  padding: 5px;
  cursor: pointer;
  border: none;
  background: transparent;
}
</style>
