<script setup>
import { useMainStore } from "@/stores/main";
import { computed } from "vue";

const mainStore = useMainStore();

const props = defineProps({
  username: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  api: {
    type: String,
    default: "avataaars",
  },
});

const getImageUrl = computed(() => {
  return mainStore.currentUser.picture
    ? mainStore.currentUser.picture
    : "https://avatars.githubusercontent.com/u/33639752?v=4";
});

const username = computed(() => props.username);

</script>

<template>
  <div
    class="avatar rounded-full block bg-gray-100 dark:bg-slate-800"
    :style="{ backgroundImage: `url(${getImageUrl})` }"
  >
    <!-- <img
      :src="
        mainStore.currentUser.picture
          ? mainStore.currentUser.picture
          : 'https://avatars.githubusercontent.com/u/33639752?v=4'
      "
      :alt="username"
      class="avatar rounded-full block bg-gray-100 dark:bg-slate-800"
    /> -->
  </div>
</template>

<style>
.avatar {
  height: 250px;
  width: 250px;
  background-position: center;
  background-size: cover;
}
</style>
