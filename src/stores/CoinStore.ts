import { coinApi } from "@/services/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCoin = defineStore("coinGecko", () => {
  const params = {
    vs_currency: "brl",
    days: 5,
  };
  const latestPrices = ref<{ x: number; y: number }[]>([]);

  const updateCoinInfo = async (id: string) => {
    try {
      const response = await coinApi.get(`/${id}/market_chart`, { params });
      updatePrices(response.data.prices);
    } catch (error) {
      console.error("esse id não existe");
      updatePrices([]);
    }
  };

  const updatePrices = (prices: [number, number][]) => {
    if (prices.length === 0) {
      latestPrices.value = [];
      return;
    }
    latestPrices.value = prices.map((v) => ({
      x: v[0],
      y: v[1],
    }));
  };
  return {
    latestPrices,
    updateCoinInfo,
  };
});
