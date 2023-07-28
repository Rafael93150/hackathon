<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiChartTimelineVariant } from "@mdi/js";
import { reactive } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import router from "@/router";
import BaseButton from "@/components/BaseButton.vue";
import { CheckIcon, ClockIcon } from "@heroicons/vue/20/solid";

const state = reactive({
  user: {},
  companies: [],
});

const init = async () => {
  await fetchUser();
  await fetchCompanies();
};

const fetchCompanies = async () => {
  try {
    state.companies = await axiosInstance
      .get("users/" + router.currentRoute.value.params.id + "/companies")
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};
const fetchUser = async () => {
  try {
    state.user = await axiosInstance
      .get("users/" + router.currentRoute.value.params.id)
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
init();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Détail utilisateur"
        main
      >
        <BaseButton
          :href="'/#/users/' + router.currentRoute.value.params.id + '/edit'"
          label="Modifier l'utilisateur"
          color="bg-[#00BB7E] text-white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section aria-labelledby="personal-information">
          <div class="shadow sm:overflow-hidden sm:rounded-md">
            <div class="bg-white px-4 py-6 sm:p-6">
              <div>
                <h2
                  id="personal-information"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Infomations personnelles
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Quelques informations sur l'utilisateur.
                </p>
              </div>
              <div class="mt-6 grid grid-cols-4 gap-6">
                <div class="col-span-4 sm:col-span-2">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Prénom
                  </h2>
                  <p class="mt-2 block w-full sm:text-sm sm:leading-6">
                    {{ state.user.firstname }}
                  </p>
                </div>
                <div class="col-span-4 sm:col-span-2">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Nom
                  </h2>
                  <p class="mt-2 block w-full sm:text-sm sm:leading-6">
                    {{ state.user.lastname }}
                  </p>
                </div>
                <div class="col-span-4 sm:col-span-2">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Adresse mail
                  </h2>
                  <p class="mt-2 block w-full sm:text-sm sm:leading-6">
                    {{ state.user.email }}
                  </p>
                </div>

                <div class="col-span-4 sm:col-span-2">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Numéro de téléphone
                  </h2>
                  <p class="mt-2 block w-full sm:text-sm sm:leading-6">
                    +33 6 12 34 56 78
                  </p>
                </div>
                <div class="col-span-4 sm:col-span-2">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Niveau
                  </h2>
                  <p class="mt-2 block w-full sm:text-sm sm:leading-6">
                    {{ state.user.level }}
                  </p>
                </div>
                <div class="col-span-4 sm:col-span-2">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Points
                  </h2>
                  <p class="mt-2 block w-full sm:text-sm sm:leading-6">
                    {{ state.user.points }}
                  </p>
                </div>
                <div class="col-span-4">
                  <h2
                    class="block text-base font-medium leading-6 text-gray-900"
                  >
                    Compétences
                  </h2>
                  <ul class="flex flex-1 overflow-auto">
                    <li
                      v-for="skill in state.user.skills"
                      :key="skill"
                      class="mt-3 inline-flex items-center rounded-full bg-yellow-100 px-4 py-1 text-base font-medium text-yellow-700"
                    >
                      {{ skill }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-6">
        <div class="sm:px-6 lg:col-span-2 lg:px-0">
          <section aria-labelledby="personal-information">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="bg-white px-4 py-6 sm:p-6">
                <div>
                  <h2
                    id="personal-information"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Entreprise
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Parcours de l'utilisateur dans les entreprises.
                  </p>
                  <div class="flow-root">
                    <ul role="list" class="mt-4">
                      <li
                        v-for="(company, companyIndex) in state.companies"
                        :key="company._id"
                      >
                        <div class="relative pb-8">
                          <span
                            v-if="companyIndex !== state.companies.length - 1"
                            class="absolute left-4 top-1 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                          <div class="relative flex space-x-3">
                            <div>
                              <span
                                :class="[
                                  companyIndex === 0
                                    ? 'bg-[#5B98D2]'
                                    : 'bg-[#00BB7E]',
                                  ' h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                                ]"
                              >
                                <ClockIcon
                                  v-if="companyIndex === 0"
                                  class="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                                <CheckIcon
                                  v-else
                                  class="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div
                              class="flex min-w-0 flex-1 justify-between space-x-4 pt-1"
                            >
                              <div>
                                <p class="text-lg text-black">
                                  {{ company.name }}
                                </p>
                              </div>
                              <div
                                class="whitespace-nowrap text-right text-sm text-gray-500"
                              >
                                <time datetime="2020-09-20">
                                  20 sept. 2020
                                </time>
                                -
                                <time datetime="2020-09-22"> today </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="sm:px-6 lg:col-span-1 lg:px-0">
          <section aria-labelledby="personal-information">
            <div class="shadow sm:overflow-hidden sm:rounded-md">
              <div class="bg-white px-4 py-6 sm:p-6">
                <div>
                  <h2
                    id="personal-information"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Niveau de compétences
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Niveau de compétences de l'utilisateur.
                  </p>
                  <img
                    class="mr-auto ml-auto h-80 max-w-80 mt-5"
                    :src="`/levels/level-${state.user.level}.png`"
                    alt="level"
                  />
                  <p
                    class="text-center text-lg text-gray-500 mt-2 mr-auto ml-auto"
                  >
                    Niveau {{ state.user.level }}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
