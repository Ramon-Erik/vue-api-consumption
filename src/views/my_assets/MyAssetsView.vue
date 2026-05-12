<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>Gráficos monetários atualizados</v-card-title>
        <v-select
          label="Selecione a moeda"
          :items="items"
          v-model="selectedCoin"
        ></v-select>
      </v-card-item>
    </v-card>
  </v-container>
  <v-container class="d-flex flex-wrap ga-6">
    <v-container style="max-width: 600px">
      Preço nos 5 últimos dias
      <price-graph-component
        :selectedCoin="selectedCoin"
      ></price-graph-component>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PriceGraphComponent from "./components/PriceGraphComponent.vue";

const items = [
  { title: "Bitcoin (BTC)", value: "bitcoin" },
  { title: "Ethereum (ETH)", value: "ethereum" },
  { title: "Solana (SOL)", value: "solana" },
  { title: "Tether (USDT)", value: "tether" },
  { title: "Cardano (ADA)", value: "cardano" },
  { title: "Ripple (XRP)", value: "ripple" },
  { title: "Dogecoin (DOGE)", value: "dogecoin" },
];

const selectedCoin = ref<string | undefined>(undefined);
</script>
