<script setup>
import { computed, ref, watchEffect } from "vue";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";
import { useMainStore } from "@/stores/main";

let user = computed(() =>  JSON.parse(localStorage.getItem("user"))).value;

const mainStore = useMainStore();

watchEffect(() => {
  user = mainStore.currentUser;
});

const userSwitchVal = ref(false);
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
        </div>
        <h1 class="text-2xl">
           <b>{{ user.firstname }} {{ user.lastname }}</b>
        </h1>
        <p>{{ user.companies && user.companies.length ? "Actuellement chez " + user.companies : "Affecté chez aucun client" }}</p>
        <div class="flex justify-center md:block">
          <PillTag :label="`Niveau ${user.level}`" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
