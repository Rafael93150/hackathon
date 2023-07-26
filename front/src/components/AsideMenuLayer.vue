<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useStyleStore } from "@/stores/style.js";
import AsideMenuList from "@/components/AsideMenuList.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";
import BaseIcon from "@/components/BaseIcon.vue";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menu-click", "aside-lg-close-click"]);

const styleStore = useStyleStore();

const logoutItem = computed(() => ({
  label: "Déconnexion",
  icon: mdiLogout,
  color: "bg-[#00BB7E] text-white pl-4",
  isLogout: true,
}));

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};
</script>

<template>
  <aside
    id="aside"
    class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
  >
    <div
      class="lg:rounded-2xl flex-1 flex flex-col overflow-hidden bg-[#282B2A]"
    >
      <div class="flex flex-row h-14 items-center justify-between bg-[#00BB7E]">
        <div
          class="flex justify-center items-center flex-1 lg:pl-6 xl:text-center xl:pl-0 pb-6"
        >
          <img
            class="w-auto mt-12 flex items-center justify-center lg:justify-start xl:justify-center"
            src="/logo.png"
            alt="carbon"
          />
        </div>
      </div>
      <div
        :class="
          styleStore.darkMode
            ? 'aside-scrollbars-[slate] '
            : styleStore.asideScrollbarsStyle
        "
        class="flex-1 overflow-y-auto overflow-x-hidden mt-6"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>
