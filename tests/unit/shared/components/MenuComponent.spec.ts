import MenuComponent from "@/shared/components/MenuComponent.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify/dist/vuetify.js";
import * as components from "vuetify/dist/vuetify.js";
import * as directives from "vuetify/dist/vuetify.js";

globalThis.ResizeObserver = require("resize-observer-polyfill");

const vuetify = createVuetify({
  components,
  directives,
});

describe("Menu Component", () => {
  const mountComponent = () => {
    return mount(MenuComponent, {
      global: {
        plugins: [vuetify],
        components: (components as any).components,
      },
    });
  };
  it("should render properly", () => {
    const wrapper = mountComponent();

    expect(wrapper.text()).toContain("Cripto");
  });
  it("should render six list items", () => {
    const wrapper = mountComponent();
    const listItems = wrapper.findAll(".v-list-item");

    expect(listItems.length).toBe(6);
  });
});
