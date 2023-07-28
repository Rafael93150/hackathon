<script setup>
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/toast";
import { reactive } from "vue"; 
import { mdiAccount, mdiMail, mdiChartTimelineVariant } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";



const state = reactive({
  newCompany : {
    name: "",
    address: "",
    email: "",
    phone: "",
    logo: null
  },
});


const createCompany = async () => {
  console.log(state.newCompany);
    axiosInstance.post("companies", state.newCompany).then((response) => {
    showToast(response.data.message);
    window.location.href = "#/companies";
    }).catch ((error) => {
    console.error("Erreur lors de la création de l'entreprise:", error);
    });
};


</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Création d'une entreprise"
        main
      />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 form-container">
      <CardBox is-form @submit.prevent="createCompany" class="shadow">

        <FormField label="Logo" help="Logo de la société">
            <FormFilePicker :modelValue="state.newCompany.logo"  label="Logo"/>
        </FormField>

          <FormField label="Nom" help="Le nom de l'entreprise">
            <FormControl
              v-model="state.newCompany.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>

          <FormField label="Adresse" help="Adresse de l'entreprise">
            <FormControl
              v-model="state.newCompany.address"
              :icon="mdiAccount"
              name="address"
              required
              autocomplete="address"
            />
          </FormField>

          <FormField label="Email" help="Adresse email de l'entreprise">
            <FormControl
              v-model="state.newCompany.email"
              :icon="mdiMail"
              name="email"
              type="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="Numéro de téléphone" help="Numéro de téléphone de l'entreprise">
            <FormControl
              v-model="state.newCompany.phone"
              :icon="mdiAccount"
              name="tel"
              type="tel"
              required
              autocomplete="tel"
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
    background-color: #4be980;
    margin-left: 50px;
  }
</style>