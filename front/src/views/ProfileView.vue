<script setup>
import { reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const mainStore = useMainStore();

const state = reactive({
  profile : {
    firstname: "",
    lastname: "",
    email: "",
  },
  passwordForm : {
    password_current: "",
    password: "",
    password_confirmation: "",
  },
  response: "",
});

// const connectedUser = computed(() => mainStore.user);

axiosInstance.get("/users/" + '64bec9d34cbb87721464b1f6').then((response) => {
    state.profile = response.data
});


const submitProfile = () => {
  try {
    axiosInstance.put("/users/" + '64bec9d34cbb87721464b1f6', state.profile).then((response) => {
      console.log(response);
      state.response = response
      mainStore.setUser(response.data);
    });
  }
  catch (error) {
    state.response = response
  }
};

const submitPass = () => {
  //
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profil" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6 shadow" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile" class="shadow">
          <span v-if="state.response" :class="`${state.response.status !== 200 ? 'text-red-600' : 'text-black'} text-lg text-center`">
            {{ state.response.data }}
          </span> 
          <FormField label="Avatar" help="500kb max.">
            <FormFilePicker label="Charger" />
          </FormField>

          <FormField label="Prénom" help="Votre nom">
            <FormControl
              v-model="state.profile.firstname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="Nom" help="Votre nom">
            <FormControl
              v-model="state.profile.lastname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Votre e-mail">
            <FormControl
              v-model="state.profile.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Modifier" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass" class="shadow">
          <FormField
            label="Mot de passe actuel"
            help="Votre mot de passe actuel"
          >
            <FormControl
              v-model="state.passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="Nouveau mot de passe" help="Votre nouveau mot de passe">
            <FormControl
              v-model="state.passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirmer le nouveau mot de passe"
            help="Confirmation du nouveau mot de passe"
          >
            <FormControl
              v-model="state.passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Modifier" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
