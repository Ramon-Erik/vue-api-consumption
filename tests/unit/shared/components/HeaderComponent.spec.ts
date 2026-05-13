import HeaderComponent from "@/shared/components/HeaderComponent.vue";
import { mount } from "@vue/test-utils";

describe("HeaderComponent", () => {
  it("should render properly", () => {
    const wrapper = mount(HeaderComponent);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });
});
