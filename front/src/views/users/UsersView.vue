<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiCertificate, mdiPlus } from "@mdi/js";
import axiosInstance from "@/utils/axiosInstance";
import { reactive } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";
import { showToast } from "@/utils/toast";

const state = reactive({
  users: [],
  companies: [],
});
const init = async () => {
  await fetchUsers();
  await fetchCompanies();
};

const fetchUsers = async () => {
  try {
    state.users = await axiosInstance.get("users").then((response) => {
      console.log(response.data)
      return response.data;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchCompanies = async () => {
  try {
    state.companies = await axiosInstance.get("companies").then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const deleteUser = async (userId) => {
  if (
    confirm(
      `Êtes-vous certain de vouloir procéder à la suppression de cet utilisateur ?`
    )
  ) {
    try {
      const response = await axiosInstance.delete(`users/${userId}`);
      showToast(response.data.message);
      await fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  }
};

const getCompanyName = (companyId) => {
  state.companies.filter((company) => {
    if (company._id === companyId) {
      return company.name;
    }
  });
};

init();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCertificate"
        title="Utilisateurs"
        main
      >
        <BaseButton
          href="/#/users/create"
          :icon="mdiPlus"
          label="Ajouter un utilisateur"
          color="bg-[#00BB7E] text-white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <div
        class="mt-8 flow-root rounded-lg bg-white border-gray-200 border-2 py-2 px-3"
      >
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Informations personelles
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Entreprise actuelle
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Niveau
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rôle
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="person in state.users"
                  :key="person._id"
                  @click="
                    () =>
                      router.push({
                        name: 'userDetail',
                        params: { id: person._id },
                      })
                  "
                >
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-11 w-11 flex-shrink-0">
                        <img
                          class="h-11 w-11 rounded-full"
                          :src="
                            person?.picture ??
                            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          "
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">
                          {{ person.firstname }} {{ person.lastname }}
                        </div>
                        <div class="mt-1 text-gray-500">{{ person.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ person.title }}</div>
                    <div class="mt-1 text-gray-500">{{ getCompanyName(person.companies[0]) }}</div>
                  </td>
                  <td
                    class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-center"
                  >
                    <img
                      class="h-12 w-12 mr-auto ml-auto"
                      :src="`/levels/level-${person.level}.png`"
                      alt="level"
                    />
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {{ person.role }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm">
                    <a
                      :href="`/#/users/update/${person._id}`"
                      class="text-black-300 hover:text-green-800 mr-2"
                      ><font-awesome-icon :icon="['fas', 'edit']" />
                    </a>
                    <a
                      class="text-red-600 hover:text-red-800 cursor-pointer"
                      @click="deleteUser(person._id)"
                    >
                      <font-awesome-icon :icon="['fas', 'trash-alt']"
                    /></a>
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
