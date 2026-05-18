import NoCurrencySelectedComponent from "@/views/my_assets/components/NoCurrencySelectedComponent.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";

const vuetify = createVuetify({
  components,
  directives,
});
globalThis.ResizeObserver = require("resize-observer-polyfill");

describe("NoCurrencySelectedComponent", () => {
  it("should have a container", () => {
    const wrapper = mount(NoCurrencySelectedComponent, {
      global: {
        plugins: [vuetify],
        components: (components as any).components,
      },
    });

    const container = wrapper.find('[data-test-id="noCurrency"]');

    expect(container.exists()).toBe(true);
    expect(container.text()).toContain(
      "Selecione uma moeda na caixa de seleção acima"
    );
  });
});
