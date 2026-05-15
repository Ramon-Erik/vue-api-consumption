<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <menu-component></menu-component>
    </v-navigation-drawer>

    <v-app-bar flat border="b">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <header-component></header-component>
    </v-app-bar>

    <v-main class="d-flex">
      <v-container fluid class="pa-0 mr-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "./shared/components/HeaderComponent.vue";
import MenuComponent from "./shared/components/MenuComponent.vue";

const drawer = ref(true);
</script>
