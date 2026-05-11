<template>
  <v-app>
    <v-main class="d-flex">
      <menu-component></menu-component>
      <v-container class="pa-0 mr-0">
        <header-component></header-component>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeaderComponent from "./shared/components/HeaderComponent.vue";
import MenuComponent from "./shared/components/MenuComponent.vue";
</script>
