import MyAssetsView from "@/views/my_assets/MyAssetsView.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify.js";
import * as directives from "vuetify/dist/vuetify.js";

const vuetify = createVuetify({
  components,
  directives,
});

globalThis.ResizeObserver = require("resize-observer-polyfill");

describe("My Assets View", () => {
  const mountComponent = () => {
    return mount(MyAssetsView, {
      global: {
        plugins: [vuetify],
      },
    });
  };
  it("should render properly", () => {
    const wrapper = mountComponent();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });
});
