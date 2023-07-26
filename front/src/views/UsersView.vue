<script setup>
import SectionMain from "@/components/SectionMain.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import {mdiChartTimelineVariant} from "@mdi/js";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Utilisateurs" main>
      </SectionTitleLineWithButton>
      <CardBox class="mb-6" has-table>
        <TableSampleClients checkable/>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
