import MktGraphComponent from "@/views/my_assets/components/MktGraphComponent.vue";
import PriceGraphComponent from "@/views/my_assets/components/PriceGraphComponent.vue";
import DashboardView from "@/views/my_assets/DashboardView.vue";
import { coinApi } from "@/services/api";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify.js";
import * as directives from "vuetify/dist/vuetify.js";

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
const mockedCoinApi = coinApi as jest.Mocked<typeof coinApi>;

describe("My Assets View", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mountComponent = () => {
    return mount(DashboardView, {
      global: {
        plugins: [vuetify],
        stubs: {
          PriceGraphComponent: true,
          MktGraphComponent: true,
        },
        components: (components as any).components,
      },
    });
  };

  it("should render properly", () => {
    const wrapper = mountComponent();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  it("should render a select with eight options", () => {
    const wrapper = mountComponent();

    const select = wrapper.find("select");
    const options = wrapper.findAll("option");

    expect(select.exists()).toBe(true);
    expect(select.isVisible()).toBe(false);

    expect(options.length).toBe(7);
  });

  it("should render two graph components", () => {
    const wrapper = mountComponent();

    const pricesGraph = wrapper.findComponent(PriceGraphComponent);
    const mktGraph = wrapper.findComponent(MktGraphComponent);

    expect(pricesGraph.exists()).toBe(true);
    expect(pricesGraph.isVisible()).toBe(true);

    expect(mktGraph.exists()).toBe(true);
    expect(mktGraph.isVisible()).toBe(true);

    expect(wrapper.text()).toContain("Preço (BRL)");
    expect(wrapper.text()).toContain("Capitalização de Mercado");
  });

  it("should call api when selected a coin", async () => {
    mockedCoinApi.get.mockResolvedValue({
      data: {
        prices: [[1715788800000, 400000]],
        market_caps: [[1715788800000, 8000000000]],
        total_volumes: [[1715788800000, 8000000000]],
      },
    });

    const wrapper = mountComponent();

    const select = wrapper.findComponent({ name: "VSelect" });

    await select.vm.$emit("update:modelValue", "bitcoin");

    expect(mockedCoinApi.get).toHaveBeenCalled();
  });
});
