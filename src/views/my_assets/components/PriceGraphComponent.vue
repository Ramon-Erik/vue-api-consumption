<template>
  <div>
    <apexchart
      width="600"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { useCoin } from "@/stores/CoinStore";
import { ref, watch } from "vue";

const store = useCoin();
const props = defineProps<{
  selectedCoin: string | undefined;
}>();

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
      formatter: (val: number) =>
        `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
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

// watch(
//   () => props.selectedCoin,
//   async (newCoin) => {
//     if (!newCoin) return;

//     await store.updateCoinInfo(newCoin);

//     series.value = [
//       {
//         name: "Preço BRL",
//         data: store.latestPrices,
//       },
//     ];
//   },
//   { immediate: true }
// );
</script>
