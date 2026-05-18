<template>
  <v-container class="w-100 d-flex justify-center align-center">
    <loading-component v-if="store.loading"></loading-component>
    <no-currency-selected-component
      v-else-if="store.latestPrices.length === 0"
    ></no-currency-selected-component>
    <v-container v-else>
      <apexchart
        type="line"
        :options="options"
        :series="series"
        :key="series[0].data.length"
      ></apexchart>
      <p>
        Último valor: {{ store.latestValues.prices.price }} em
        {{ store.latestValues.prices.time }}
      </p>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { useCoin } from "@/stores/CoinStore";
import { ref, watch } from "vue";
import NoCurrencySelectedComponent from "./NoCurrencySelectedComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";

const store = useCoin();

const formatter = (val: number) => {
  if (val >= 1e12) return `R$ ${(val / 1e12).toFixed(2)}T`; // Trilhões
  if (val >= 1e9) return `R$ ${(val / 1e9).toFixed(2)}B`; // Bilhões
  if (val >= 1e6) return `R$ ${(val / 1e6).toFixed(2)}M`; // Milhões
  return `R$ ${val.toLocaleString("pt-BR")}`;
};

const options = ref({
  chart: {
    id: "prices",
    toolbar: { show: true },
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      format: "dd/MM HH:mm",
    },
    axisTicks: {
      show: true,
    },
    tickAmount: 6,
  },
  yaxis: {
    labels: {
      formatter,
    },
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  tooltip: {
    x: { format: "dd MMM yyyy HH:mm" },
  },
});

const series = ref([
  {
    name: "Preço BRL",
    data: [] as { x: number; y: number }[],
  },
]);

watch(
  () => store.latestPrices,
  async (newCoin) => {
    if (newCoin.length === 0) return;

    series.value = [
      {
        name: "Preço BRL",
        data: store.latestPrices,
      },
    ];
  },
  { deep: true, immediate: true }
);
</script>
