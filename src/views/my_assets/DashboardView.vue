<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title>Gráficos monetários atualizados</v-card-title>
        <v-select
          label="Selecione a moeda"
          :items="items"
          v-model="selectedCoin"
          @update:model-value="changeValue"
        ></v-select>
      </v-card-item>
    </v-card>
  </v-container>
  <v-container class="d-flex flex-wrap ga-8">
    <v-card class="w-100 ma-0" style="max-width: 450px">
      <v-card-title>Preço (BRL)</v-card-title>
      <v-card-subtitle>
        Valor unitário atual para compra e venda da moeda.
      </v-card-subtitle>
      <price-graph-component></price-graph-component>
    </v-card>
    <v-card class="w-100 ma-0" style="max-width: 450px">
      <v-card-title class="text-break">Capitalização de Mercado</v-card-title>
      <v-card-subtitle>
        Tamanho total da rede (Preço × Moedas em circulação).
      </v-card-subtitle>
      <mkt-graph-component></mkt-graph-component>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PriceGraphComponent from "./components/PriceGraphComponent.vue";
import MktGraphComponent from "./components/MktGraphComponent.vue";
import { useCoin } from "@/stores/CoinStore";

const store = useCoin();

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

const changeValue = async () => {
  if (selectedCoin.value && selectedCoin.value.trim()) {
    await store.updateCoinInfo(selectedCoin.value);
  }
};
</script>
