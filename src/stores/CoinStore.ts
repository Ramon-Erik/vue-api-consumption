import { coinApi } from "@/services/api";
import { defineStore } from "pinia";
import { ref } from "vue";

type values = [number, number][];
interface IResponse {
  prices: values;
  market_caps: values;
  total_volumes: values;
}

export const useCoin = defineStore("coinGecko", () => {
  const params = {
    vs_currency: "brl",
    days: 5,
  };
  const loading = ref(false);
  const latestPrices = ref<{ x: number; y: number }[]>([]);
  const latestMktPrices = ref<{ x: number; y: number }[]>([]);
  const latestVolumePrices = ref<{ x: number; y: number }[]>([]);

  const updateCoinInfo = async (id: string) => {
    console.log(id);
    loading.value = true;
    try {
      const response = await coinApi.get(`/${id}/market_chart`, { params });
      updateWithResponseValues(response.data);
    } catch (error) {
      console.error("esse id não existe");
      updateWithResponseValues({
        market_caps: [],
        prices: [],
        total_volumes: [],
      });
    } finally {
      loading.value = false;
    }
  };

  const updateWithResponseValues = (response: IResponse) => {
    if (
      response.prices.length === 0 ||
      response.market_caps.length === 0 ||
      response.total_volumes.length === 0
    ) {
      latestPrices.value = [];
      latestMktPrices.value = [];
      latestVolumePrices.value = [];
      return;
    }

    console.log(response);

    latestPrices.value = response.prices.map((v) => ({
      x: v[0],
      y: v[1],
    }));

    latestMktPrices.value = response.market_caps.map((v) => ({
      x: v[0],
      y: v[1],
    }));

    latestVolumePrices.value = response.total_volumes.map((v) => ({
      x: v[0],
      y: v[1],
    }));
  };
  return {
    loading,
    latestPrices,
    latestMktPrices,
    latestVolumePrices,
    updateCoinInfo,
  };
});
