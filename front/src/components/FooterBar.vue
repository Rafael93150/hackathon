<script setup>
import {containerMaxW} from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";
const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6 mt-auto" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
        >&copy;{{ year }},
          <a href="" target="_blank">Carbon.it</a>.</b
        >
        <slot/>
      </div>
      <div class="rounded-full bg-black">
        <img
          src="/logo.png"
          alt="carbon"
          class="w-28 mt-2 ml-2"
        />
      </div>
    </BaseLevel>
  </footer>
</template>
