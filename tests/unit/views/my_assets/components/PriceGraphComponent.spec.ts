import { createPinia, setActivePinia } from "pinia";
import { coinApi } from "@/services/api";
import { flushPromises, mount } from "@vue/test-utils";
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

jest.mock("@/services/api", () => ({
  coinApi: {
    get: jest.fn(),
  },
}));

const mockedApi = coinApi as jest.Mocked<typeof coinApi>;

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
});
