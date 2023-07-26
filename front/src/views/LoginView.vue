<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {mdiAccount, mdiAsterisk} from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import axiosInstance from "@/utils/axiosInstance";
import { useMainStore } from "@/stores/main";

const form = reactive({
  email: "",
  password: "",
});
const state = reactive({
  error: "",
});

const router = useRouter();

const submit = () => {
  axiosInstance.post("/auth/login", form).then((response) => {
    localStorage.setItem("token", response.data.token);
    useMainStore().setUser(response.data.user);
    router.push("/");
  });
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink" class="flex flex-col">
      <p class="text-center text-2xl text-white font-bold mb-6">
        {{ state.error }}
      </p>
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            type="email"
            required
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            required
            autocomplete="current-password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login"/>
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
