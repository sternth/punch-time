import { shallowMount } from '@vue/test-utils';
import AppLogin from '@/components/AppLogin.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(AppLogin, {});
    expect(wrapper.text()).toMatch('Punch-Time Login');
  });
});
