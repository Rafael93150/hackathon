<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiCertificate, mdiPlus } from "@mdi/js";
import axiosInstance from "@/utils/axiosInstance";
import { reactive } from "vue";
import BaseButton from "@/components/BaseButton.vue";

const state = reactive({
  companies: [],
});
const init = async () => {
  await fetchCompanies();
};

const fetchCompanies = async () => {
  try {
    state.companies = await axiosInstance.get("companies").then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};

const connectedUser = JSON.parse(localStorage.getItem("user"));

init();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCertificate"
        title="Entreprises"
        main
      >
        <BaseButton
          v-if="connectedUser.role === 'rh' || connectedUser.role === 'admin'"
          href="/#/companies/create"
          :icon="mdiPlus"
          label="Ajouter une entreprise"
          color="bg-[#00BB7E] text-white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          v-for="company in state.companies"
          :key="company._id"
          class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div class="flex-shrink-0">
            <img
              class="h-10 rounded-full"
              :src="
                company.logo ??
                'https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png'
              "
              alt="companyName"
            />
          </div>
          <div class="min-w-0 flex-1">
            <a :href="`/companies/${company._id}`" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">
                {{ company.name }}
              </p>
            </a>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
