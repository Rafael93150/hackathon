<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import {mdiCertificate, mdiPlus} from "@mdi/js";
import axiosInstance from "@/utils/axiosInstance";
import {reactive} from "vue";
import BaseButton from "@/components/BaseButton.vue";

const state = reactive({
  companies: []
})
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
init()
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCertificate" title="Entreprise" main>
        <BaseButton
            href="/#/companies/create"
            :icon="mdiPlus"
            label="Ajouter une entreprise"
            color="bg-[#00BB7E] text-white"
            rounded-full
            small
        />
      </SectionTitleLineWithButton>
      <div class="mt-8 flow-root rounded-lg bg-white border-gray-200 border-2 py-2 px-3">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">#</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nom</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edit</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="company in state.companies" :key="company._id">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <img class=" ml-3 w-11 rounded-full" :src="company?.logo ?? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'" alt=""/>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ company.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm ">
                  <a :href="`/companies/${company._id}`" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
