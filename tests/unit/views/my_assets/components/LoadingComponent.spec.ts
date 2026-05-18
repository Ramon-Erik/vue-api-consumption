import LoadingComponent from "@/views/my_assets/components/LoadingComponent.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";

const vuetify = createVuetify({
  components,
  directives,
});
globalThis.ResizeObserver = require("resize-observer-polyfill");

describe("Loading Component", () => {
  it("should render a .v-progress-circular div", () => {
    const wrapper = mount(LoadingComponent, {
      global: {
        plugins: [vuetify],
        components: (components as any).components,
      },
    });

    const loading = wrapper.find(".v-progress-circular");

    expect(loading.exists()).toBe(true);
    expect(loading.isVisible()).toBe(true);
  });
});
