import { mount } from "@vue/test-utils";
import App from "@/App.vue"; // Ajuste o path se for App.vue ou um Layout.vue
import HeaderComponent from "@/shared/components/HeaderComponent.vue";
import MenuComponent from "@/shared/components/MenuComponent.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";

const vuetify = createVuetify({ components, directives });
globalThis.ResizeObserver = require("resize-observer-polyfill");

describe("App Layout Component", () => {
  const mountComponent = () => {
    return mount(App, {
      global: {
        plugins: [vuetify],
        components: (components as any).components,
        stubs: {
          HeaderComponent: true,
          MenuComponent: true,
          "router-view": true, // Stub do roteador para não disparar rotas reais
        },
      },
    });
  };

  it("should render layout structure properly", () => {
    const wrapper = mountComponent();

    // Verifica se os componentes estruturais do Vuetify e os customizados existem
    expect(wrapper.findComponent(HeaderComponent).exists()).toBe(true);
    expect(wrapper.findComponent(MenuComponent).exists()).toBe(true);
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
  });

  it("should toggle navigation drawer when nav icon is clicked", async () => {
    const wrapper = mountComponent();

    // Captura o componente do drawer de navegação
    const drawer = wrapper.findComponent({ name: "VNavigationDrawer" });

    // Pelo script setup, ele inicializa como true
    expect(drawer.props("modelValue")).toBe(true);

    // Encontra o ícone de menu superior e dispara o clique
    const navIcon = wrapper.findComponent({ name: "VAppBarNavIcon" });
    await navIcon.trigger("click");

    // O Vue processa o clique mudando a ref 'drawer' para false
    expect(drawer.props("modelValue")).toBe(false);

    // Clica novamente para garantir a alternância dupla (toggle)
    await navIcon.trigger("click");
    expect(drawer.props("modelValue")).toBe(true);
  });
});
