<script setup>
import { computed, ref } from "vue";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";


const user = computed(
  () =>  JSON.parse(localStorage.getItem("user")));

const userSwitchVal = ref(false);
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
          <!-- <FormCheckRadio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Notifications"
            :input-value="true"
          /> -->
        </div>
        <h1 class="text-2xl">
           <b>{{ user.firstname }} {{ user.lastname }}</b>
        </h1>
        <p>{{ user.companies && user.companies.length ? "Actuellement chez" + user.companies : "Affecté chez aucun client" }}</p>
        <div class="flex justify-center md:block">
          <PillTag :label="`Niveau ${user.level}`" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
