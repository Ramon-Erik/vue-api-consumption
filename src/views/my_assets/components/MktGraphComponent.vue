<template>
  <v-container class="w-100 d-flex justify-center align-center">
    <loading-component v-if="store.loading"></loading-component>
    <no-currency-selected-component
      v-else-if="store.latestMktPrices.length === 0"
      svgPath="M15,4A8,8 0 0,1 23,12A8,8 0 0,1 15,20A8,8 0 0,1 7,12A8,8 0 0,1 15,4M15,18A6,6 0 0,0 21,12A6,6 0 0,0 15,6A6,6 0 0,0 9,12A6,6 0 0,0 15,18M3,12C3,14.61 4.67,16.83 7,17.65V19.74C3.55,18.85 1,15.73 1,12C1,8.27 3.55,5.15 7,4.26V6.35C4.67,7.17 3,9.39 3,12Z"
    ></no-currency-selected-component>
    <apexchart
      v-else
      type="line"
      :options="options"
      :series="series"
      :key="series[0].data.length"
    ></apexchart>
  </v-container>
</template>
<script setup lang="ts">
import NoCurrencySelectedComponent from "./NoCurrencySelectedComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import { useCoin } from "@/stores/CoinStore";
import { ref, watch } from "vue";

const store = useCoin();

const options = ref({
  chart: {
    id: "market-cap",
    toolbar: { show: true },
    foreColor: "#373d3f",
  },
  colors: ["#7c4dff"],
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      format: "dd/MM HH:mm",
    },
    tickAmount: 6,
  },
  yaxis: {
    labels: {
      formatter: (val: number) => {
        if (val >= 1e12) return `R$ ${(val / 1e12).toFixed(2)}T`; // Trilhões
        if (val >= 1e9) return `R$ ${(val / 1e9).toFixed(2)}B`; // Bilhões
        if (val >= 1e6) return `R$ ${(val / 1e6).toFixed(2)}M`; // Milhões
        return `R$ ${val.toLocaleString("pt-BR")}`;
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    x: { format: "dd MMM yyyy HH:mm" },
  },
});

const series = ref([
  {
    name: "Market Cap BRL",
    data: [] as { x: number; y: number }[],
  },
]);

watch(
  () => store.latestMktPrices,
  async (newCoin) => {
    if (newCoin.length === 0) return;
    series.value = [
      {
        name: "Market Cap BRL",
        data: store.latestMktPrices, // Usando a variável de Market Cap da Store
      },
    ];
  },
  { deep: true, immediate: true }
);
</script>
