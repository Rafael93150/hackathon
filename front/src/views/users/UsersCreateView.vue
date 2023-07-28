<script setup>
import { reactive } from "vue"; // Importez ref pour créer des références réactives
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiChartTimelineVariant, mdiAccount, mdiMail, mdiAsterisk, mdiAccountPlusOutline } from "@mdi/js";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/toast";

const state = reactive({
  newUser : {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    skills: [],
    password: ""
  },
  responseMessage: ""
});


const createUser = async () => {
    axiosInstance.post("users", state.newUser).then((response) => {
    showToast(response.data.message);
    }).catch ((error) => {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    });
};

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountPlusOutline"
        title="Ajout d'un nouvel utilisateur"
        main
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 form-container">
      <!-- Formulaire de création d'utilisateur -->
      <CardBox is-form @submit.prevent="createUser" class="shadow">
          <FormField label="Nom" help="Votre nom">
            <FormControl
              v-model="state.newUser.firstname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>

          <FormField label="Prénom" help="Votre prénom">
            <FormControl
              v-model="state.newUser.lastname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>

          <FormField label="Compétences" help="Vos compétences">
            <FormControl
              v-model="state.newUser.skills"
              :icon="mdiAccount"
              name="skills"
              required
              autocomplete="skills"
            />
          </FormField>

          <FormField label="Adresse" help="Votre adresse postale">
            <FormControl
              v-model="state.newUser.address"
              :icon="mdiAccount"
              name="address"
              required
              autocomplete="address"
            />
          </FormField>

          <FormField label="Email" help="Votre adresse email">
            <FormControl
              v-model="state.newUser.email"
              :icon="mdiMail"
              name="email"
              type="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="Numéro de téléphone" help="Votre numéro de téléphone">
            <FormControl
              v-model="state.newUser.phone"
              :icon="mdiAccount"
              name="tel"
              type="tel"
              required
              autocomplete="tel"
            />
          </FormField>

          <FormField label="Mot de passe" help="Votre Mot de passe">
            <FormControl
              v-model="state.newUser.password"
              :icon="mdiAsterisk"
              name="password"
              type="password"
              required
              autocomplete="password"
            />
          </FormField>

        <!-- Autres champs du formulaire ici -->
        <template #footer>
            <BaseButtons>
              <BaseButton class="button" color="info" type="submit" label="Créer" />
            </BaseButtons>
          </template>

      </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100% ; 
    width: auto;
  }

  .form-container .shadow {
    max-width: 500px; /* Adjust this value as needed to control the maximum width of the form */
    width: 100%; /* Ensure the form takes the available width within the container */
  }

  .button{
    width: 300px;
    justify-content: center;
    align-items: center;
    background-color: #00BB7E;
    margin-left: 50px;
  }
</style>