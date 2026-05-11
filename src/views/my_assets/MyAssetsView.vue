<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>Gráficos monetários atualizados</v-card-title>
        <v-select label="Selecione a moeda" :items="items"></v-select>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const items = ref(["bitcoin", "ethereum", "tether", "ripple"]);
</script>
