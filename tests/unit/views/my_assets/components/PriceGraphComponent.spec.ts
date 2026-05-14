import { createPinia, setActivePinia } from "pinia";
import { coinApi } from "@/services/api";
import { flushPromises, mount } from "@vue/test-utils";
import PriceGraphComponent from "@/views/my_assets/components/PriceGraphComponent.vue";

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

  it("should start with selectedCoin undefined", () => {
    const wrapper = mountComponent();

    expect(wrapper.props().selectedCoin).toBe(undefined);
  });

  it("should make a new API call when prop change", async () => {
    const wrapper = mountComponent();

    expect(wrapper.props().selectedCoin).toBe(undefined);

    await wrapper.setProps({
      selectedCoin: "bitcoin",
    });

    await flushPromises();

    expect(wrapper.props().selectedCoin).toBe("bitcoin");
    expect(mockedApi.get).toBeCalledTimes(1);
  });
});
