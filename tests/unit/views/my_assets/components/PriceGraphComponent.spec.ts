import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import PriceGraphComponent from "@/views/my_assets/components/PriceGraphComponent.vue";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";
import { createVuetify } from "vuetify";
import { useCoin } from "@/stores/CoinStore";
import NoCurrencySelectedComponent from "@/views/my_assets/components/NoCurrencySelectedComponent.vue";
import LoadingComponent from "@/views/my_assets/components/LoadingComponent.vue";

const vuetify = createVuetify({
  components,
  directives,
});

globalThis.ResizeObserver = require("resize-observer-polyfill");

describe("Price Graph Component", () => {
  const mountComponent = () => {
    return mount(PriceGraphComponent, {
      props: {
        selectedCoin: undefined,
      },
      global: {
        plugins: [vuetify],
        components: (components as any).components,
        stubs: {
          apexchart: true,
        },
      },
    });
  };
  beforeEach(() => {
    setActivePinia(createPinia());
    jest.clearAllMocks();
  });

  it("should start with no currency component", () => {
    const wrapper = mountComponent();

    const noCurrencyComponent = wrapper.findComponent(
      NoCurrencySelectedComponent
    );
    const loadingComponent = wrapper.findComponent(LoadingComponent);
    const apexchartComponent = wrapper.find("apexchart-stub");

    expect(noCurrencyComponent.exists()).toBe(true);
    expect(noCurrencyComponent.isVisible()).toBe(true);

    expect(loadingComponent.exists()).toBe(false);
    expect(apexchartComponent.exists()).toBe(false);
  });

  it("when loading should show loading component", async () => {
    const store = useCoin();

    store.loading = true;

    const wrapper = mountComponent();
    await wrapper.vm.$nextTick();

    const noCurrencyComponent = wrapper.findComponent(
      NoCurrencySelectedComponent
    );
    const loadingComponent = wrapper.findComponent(LoadingComponent);
    const apexchartComponent = wrapper.find("apexchart-stub");

    expect(loadingComponent.exists()).toBe(true);
    expect(loadingComponent.isVisible()).toBe(true);

    expect(noCurrencyComponent.exists()).toBe(false);
    expect(apexchartComponent.exists()).toBe(false);
  });

  it("after a request should show apexchart component", async () => {
    const store = useCoin();

    store.latestPrices = [{ x: 0, y: 0 }];

    const wrapper = mountComponent();
    await wrapper.vm.$nextTick();

    const noCurrencyComponent = wrapper.findComponent(
      NoCurrencySelectedComponent
    );
    const loadingComponent = wrapper.findComponent(LoadingComponent);
    const apexchartComponent = wrapper.find("apexchart-stub");

    expect(apexchartComponent.exists()).toBe(true);
    expect(apexchartComponent.isVisible()).toBe(true);

    expect(noCurrencyComponent.exists()).toBe(false);
    expect(loadingComponent.exists()).toBe(false);
  });

  it("should format coins across all numeric scales", () => {
    const wrapper = mountComponent();
    const formatter = wrapper.vm.formatter;

    expect(formatter(2000000000000)).toBe("R$ 2.00T");
    expect(formatter(8000000000)).toBe("R$ 8.00B");
    expect(formatter(5000000)).toBe("R$ 5.00M");
    expect(formatter(450)).toBe("R$ 450");
  });

  it("should update series data when store has prices", async () => {
    const store = useCoin();
    store.latestPrices = [{ x: 1715788800000, y: 500000 }];

    const wrapper = mountComponent();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.series[0].data).toHaveLength(1);
    expect(wrapper.vm.series[0].data[0].y).toBe(500000);
  });

  it("should stop execution in watch if latestPrices is empty", async () => {
    const store = useCoin();

    store.latestPrices = [{ x: 1, y: 1 }];

    const wrapper = mountComponent();
    await wrapper.vm.$nextTick();

    store.latestPrices = [];
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.series[0].data).toHaveLength(1);
  });
});
