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
    console.log("cha,ada");

    const response = await coinApi.get(`/${id}/market_chart`, { params });
    console.log(response);
    updatePrices(response.data.prices);
  };

  const updatePrices = (prices: [number, number][]) => {
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
