<template>
  <v-list
    density="compact"
    class="border-e-md"
    style="max-width: 300px; width: 100%"
  >
    <v-list-subheader>
      <h1 class="mt-4 mb-5">Cosmobit</h1>
    </v-list-subheader>

    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  { text: "Dashboard", icon: "mdi-solar-panel" },
  { text: "Portfolio", icon: "mdi-presentation" },
  { text: "My assets", icon: "mdi-layers-triple-outline" },
  { text: "Market Overview", icon: "mdi-finance" },
  { text: "Analytics", icon: "mdi-sine-wave" },
  { text: "Data API", icon: "mdi-flag" },
]);
</script>
