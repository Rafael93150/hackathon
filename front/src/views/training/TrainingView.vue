<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiCertificate } from "@mdi/js";
import YouTube from "vue3-youtube";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import axiosInstance from "@/utils/axiosInstance";
import { reactive } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { onMounted } from "vue";
import { languages } from "@/data/languages";

const state = reactive({
  trainings: [],
  selectedVideo: null,
  openModal: false,
  search: "",
});

const colors = [
  "bg-yellow-100 text-yellow-700",
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
  "bg-indigo-100 text-indigo-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
];

const init = async () => {
  await fetchTraining();
};

onMounted(() => {
  initSearch();
});

const initSearch = async () => {
  try {
    // Effectuer la recherche avec le terme "JavaScript" par défaut
    state.trainings = await axiosInstance
      .get("/training/search", {
        params: {
          search_query: "NodeJs",
        },
      })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    console.error("Error fetching Trainings:", error);
  }
};

const selectVideo = (video) => {
  state.selectedVideo = video;
  state.openModal = true;
};

const closeModal = () => {
  state.openModal = false;
};

const fetchTraining = async () => {
  try {
    state.trainings = await axiosInstance
      .get("/training/search")
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    console.error("Error fetching trainings:", error);
  }
};

const submit = async () => {
  try {
    state.trainings = await axiosInstance
      .get("/training/search", {
        params: {
          search_query: state.search,
        },
      })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    console.error("Error fetching Trainings:", error);
  }
};

const getRandomColorClass = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

init();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiCertificate"
        title="Formations  "
        main
      >
        <form @submit.prevent="submit">
          <div>
            <label
              for="search"
              class="block text-sm font-medium leading-6 text-gray-900 sr-only"
              >Search</label
            >
            <div class="mt-2 flex rounded-md shadow-sm">
              <div
                class="relative flex flex-grow items-stretch focus-within:z-10"
              >
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <MagnifyingGlassIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  v-model="state.search"
                  type="text"
                  name="search"
                  class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>
              <button
                type="submit"
                class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </SectionTitleLineWithButton>
      <ul class="flex overflow-auto space-x-2 hidescrollbar">
        <li
          v-for="skill in languages"
          :key="skill"
          :class="getRandomColorClass()"
          class="h-fit inline-flex items-center rounded-full px-4 py-1 text-sm cursor-pointer"
          @click="(state.search = skill) , submit()"
        >
          {{ skill }}
        </li>
      </ul>
      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4"
      >
        <article
          v-for="post in state.trainings"
          :key="post.videoId"
          class="flex flex-col items-start text-left"
        >
          <div class="relative w-full">
            <img
              :src="post.thumbnail"
              alt=""
              class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />
            <div
              class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
            />
          </div>
          <div class="max-w-xl">
            <div class="group relative">
              <h3
                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <button @click="selectVideo(post)">
                  <span class="absolute inset-0 text-left" />
                  {{ post.title }}
                </button>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ post.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
      <TransitionRoot as="template" :show="state.openModal">
        <Dialog as="div" class="relative z-10" @close="closeModal">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel
                  class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
                >
                  <YouTube :src="state.selectedVideo.videoUrl" />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </SectionMain>
  </LayoutAuthenticated>
</template>
