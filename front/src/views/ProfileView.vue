<script setup>
import { reactive } from "vue";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
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
import { useMainStore } from "@/stores/main";
import { showToast } from "@/utils/toast";

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

const connectedUser = JSON.parse(localStorage.getItem("user"));

axiosInstance.get("/users/" + connectedUser._id ).then((response) => {
  state.profile = {
    firstname: response.data.firstname, 
    lastname: response.data.lastname, 
    email: response.data.email,
    picture: response.data.picture
  };
});

const submitProfile = () => {
  try {
    axiosInstance.put("/users/" +  connectedUser._id  , state.profile).then((response) => {
      if (response.data.user){
        localStorage.setItem("user", JSON.stringify(response.data.user));
        useMainStore().setUser(state.profile);
      }
      state.response = response;
      showToast(state.response.data.message);
    });
  }
  catch (error) {
    state.response = response
    howToast(state.response.data.message);
  }
  
};

const submitPass = () => {
  //
};
</script>

<!-- <script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  methods: {
    showToast(){
      toast('Profil modifié', {
        autoClose: 2000,
      });
    }
  },
}
</script> -->

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profil" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6 shadow" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile" class="shadow">
          <!-- <span v-if="state.response" :class="`${state.response.status !== 200 ? 'text-red-600' : 'text-blue-500'} text-lg text-center`">
            {{ state.response.data.message }}
          </span>  -->
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
