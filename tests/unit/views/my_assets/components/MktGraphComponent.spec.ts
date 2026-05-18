import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import MktGraphComponent from "@/views/my_assets/components/MktGraphComponent.vue";
import LoadingComponent from "@/views/my_assets/components/LoadingComponent.vue";
import NoCurrencySelectedComponent from "@/views/my_assets/components/NoCurrencySelectedComponent.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";
import { useCoin } from "@/stores/CoinStore";

const vuetify = createVuetify({ components, directives });

globalThis.ResizeObserver = require("resize-observer-polyfill");

describe("MktGraphComponent", () => {
  const mountComponent = () => {
    return mount(MktGraphComponent, {
      global: {
        plugins: [vuetify],
        components: (components as any).components,
        stubs: {
          apexchart: true,
          LoadingComponent: true,
          NoCurrencySelectedComponent: true,
        },
      },
    });
  };

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should start showing NoCurrencySelectedComponent with the custom svgPath prop", () => {
    const wrapper = mountComponent();

    const noCurrency = wrapper.findComponent(NoCurrencySelectedComponent);
    expect(noCurrency.exists()).toBe(true);
    expect(noCurrency.props("svgPath")).toContain("M15,4A8,8");

    expect(wrapper.findComponent(LoadingComponent).exists()).toBe(false);
    expect(wrapper.find("apexchart-stub").exists()).toBe(false);
  });

  it("should show loading component when store.loading is true", () => {
    const store = useCoin();
    store.loading = true;

    const wrapper = mountComponent();

    expect(wrapper.findComponent(LoadingComponent).exists()).toBe(true);
    expect(wrapper.findComponent(NoCurrencySelectedComponent).exists()).toBe(
      false
    );
    expect(wrapper.find("apexchart-stub").exists()).toBe(false);
  });

  it("should show apexchart component when store has market cap prices", () => {
    const store = useCoin();
    store.loading = false;
    store.latestMktPrices = [{ x: 1715788800000, y: 5000000000 }];
    store.latestValues = {
      mkt: { price: "R$ 5,00 B", time: "18/05/2026 17:00" },
      prices: { price: "", time: "" },
    } as any;

    const wrapper = mountComponent();

    expect(wrapper.find("apexchart-stub").exists()).toBe(true);
    expect(wrapper.findComponent(LoadingComponent).exists()).toBe(false);
    expect(wrapper.findComponent(NoCurrencySelectedComponent).exists()).toBe(
      false
    );

    expect(wrapper.text()).toContain("R$ 5,00 B");
  });

  it("should format yaxis chart labels across all metric scales (T, B, M, standard)", () => {
    const wrapper = mountComponent();

    const formatter = (wrapper.vm as any).options.yaxis.labels.formatter;

    expect(formatter(1_500_000_000_000)).toBe("R$ 1.50T");
    expect(formatter(9_000_000_000)).toBe("R$ 9.00B");
    expect(formatter(3_500_000)).toBe("R$ 3.50M");
    expect(formatter(750)).toBe("R$ 750");
  });

  it("should update series data when store.latestMktPrices changes via watch", async () => {
    const store = useCoin();

    store.latestMktPrices = [{ x: 1, y: 100 }];

    const wrapper = mountComponent();
    await wrapper.vm.$nextTick();

    store.latestMktPrices = [
      { x: 1, y: 100 },
      { x: 2, y: 200 },
    ];
    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).series[0].data).toHaveLength(2);
    expect((wrapper.vm as any).series[0].data[1].y).toBe(200);
  });

  it("should hit the guard clause in watch when latestMktPrices is empty", async () => {
    const store = useCoin();
    store.latestMktPrices = [{ x: 1, y: 100 }];

    const wrapper = mountComponent();
    await wrapper.vm.$nextTick();

    store.latestMktPrices = [];
    await wrapper.vm.$nextTick();

    expect((wrapper.vm as any).series[0].data).toHaveLength(1);
  });
});
