import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ZoneButton from '../ZoneButton.vue';

describe('ZoneButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ZoneButton, {
        props: {
            zone: { id: 1697968257867,
                name: "Living room",
                temperatures: { ambient: 21, desired: 24 },
                status: 'off',
                isInOperation: false
            },
        },
      });
  })

  it('It should emit the event "power-device" when clicking on power icon', async() => {
    const powerBtn = wrapper.find('.power-button');

    expect(wrapper.emitted('power-device')).not.toBeTruthy();

    await powerBtn.trigger('click');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted('power-device')).toBeTruthy();
    expect(wrapper.emitted('power-device').length).toBe(1);
  })

  it('It should emit the event "open-info-zone" when clicking on a zone card', async() => {
    const zoneCard = wrapper.find('.card');

    expect(wrapper.emitted('open-info-zone')).not.toBeTruthy();

    await zoneCard.trigger('click');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted('open-info-zone')).toBeTruthy();
    expect(wrapper.emitted('open-info-zone').length).toBe(1);
  })

})
