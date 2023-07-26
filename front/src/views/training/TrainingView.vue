<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiCertificate, mdiPlus } from "@mdi/js";
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import axiosInstance from "@/utils/axiosInstance";
import { reactive, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";

const modalOpen = ref(false);
const videoRef = ref(null);
watch(videoRef, () => {
  videoRef.value?.play();
});
const state = reactive({
  trainings: [],
  selectedVideo: null,
});
const init = async () => {
  await fetchTraining();
};

const selectVideo = (video) => {
  state.selectedVideo = video;
  modalOpen.value = true;
};

const fetchTraining = async () => {
  try {
    state.trainings = await axiosInstance
      .get("/training/search")
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};
init();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCertificate" title="Formation" main>
        <BaseButton
          href="/#/training/create"
          :icon="mdiPlus"
          label="Ajouter une formation"
          color="bg-[#00BB7E] text-white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <div
        v-for="post in state.trainings"
        :key="post.videoId"
        class="grid grid-cols-3"
      >
        <!-- Video thumbnail -->
        <button
          class="relative flex justify-center items-center focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 rounded-3xl group"
          aria-label="Watch the video"
          @click="selectVideo(post)"
        >
          <img
            class="rounded-3xl shadow-2xl transition-shadow duration-300 ease-in-out"
            :src="
              post?.thumbnail ??
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=3603&q=80'
            "
            alt="Modal video thumbnail"
          />
          <!-- Play icon -->
          <svg
            class="absolute pointer-events-none group-hover:scale-110 transition-transform duration-300 ease-in-out"
            width="72"
            height="72"
          >
            <circle
              class="fill-white"
              cx="36"
              cy="36"
              r="36"
              fill-opacity=".8"
            />
            <path
              class="fill-indigo-500 drop-shadow-2xl"
              d="M44 36a.999.999 0 0 0-.427-.82l-10-7A1 1 0 0 0 32 29V43a.999.999 0 0 0 1.573.82l10-7A.995.995 0 0 0 44 36V36c0 .001 0 .001 0 0Z"
            />
          </svg>
        </button>
      </div>
      <TransitionRoot :show="modalOpen" as="template">
        <Dialog @close="modalOpen = false">
          <!-- Modal backdrop -->
          <TransitionChild
            class-name="fixed inset-0 z-[99999] bg-black bg-opacity-50 transition-opacity"
            enter="transition ease-out duration-200"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition ease-out duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            aria-hidden="true"
          />
          <!-- End: Modal backdrop -->
          <!-- Modal dialog -->
          <TransitionChild
            class-name="fixed inset-0 z-[99999] flex p-6"
            enter="transition ease-out duration-300"
            enter-from="opacity-0 scale-75"
            enter-to="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-75"
          >
            <div class="max-w-5xl mx-auto h-full flex items-center">
              <DialogPanel
                class="w-full max-h-full rounded-3xl shadow-2xl aspect-video bg-black overflow-hidden"
              >
                <video ref="videoRef" loop controls>
                  <source
                    :src="state.selectedVideo.videoUrl"
                    :width="100"
                    :height="150"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </DialogPanel>
            </div>
          </TransitionChild>
          <!-- End: Modal dialog -->
        </Dialog>
      </TransitionRoot>
    </SectionMain>
  </LayoutAuthenticated>
</template>
