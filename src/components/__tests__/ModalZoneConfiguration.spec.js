import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import ModalZoneConfiguration from '../ModalZoneConfiguration.vue';

describe('ModalZoneConfiguration', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ModalZoneConfiguration, {
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

  it('Must emit the event "close" when x button is clicked', async() => {
    const closeBtn = wrapper.find('.close-btn');

    expect(wrapper.emitted('close')).not.toBeTruthy();

    await closeBtn.trigger('click');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.emitted('close').length).toBe(1);
  })


  it('Must emit the event "name-edited" when edit zone name', async() => {
    const editBtn = wrapper.find('.edit-btn');
    expect(wrapper.emitted('name-edited')).not.toBeTruthy();
    
    await editBtn.trigger('click');
    const saveBtn = wrapper.find('.save-btn');
    await saveBtn.trigger('click');
    
    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted('name-edited')).toBeTruthy();
    expect(wrapper.emitted('name-edited').length).toBe(1);
  })

  it('Must emit the event "edit-desired-temperature" when + or - button is clicked', async() => {
    const increaseBtn = wrapper.find('#increase-btn');
    const decreaseBtn = wrapper.find('#decrease-btn');

    expect(wrapper.emitted('edit-desired-temperature')).not.toBeTruthy();

    await increaseBtn.trigger('click');
    
    expect(wrapper.emitted('edit-desired-temperature')).toBeTruthy();
    expect(wrapper.emitted('edit-desired-temperature').length).toBe(1);
    
    await decreaseBtn.trigger('click');

    expect(wrapper.emitted('edit-desired-temperature').length).toBe(2);
  })

  it('Must emit the event "edit-mode" when cooling or heating button is clicked', async() => {
    const coolingBtn = wrapper.find('#cooling-btn');
    const heatingBtn = wrapper.find('#heating-btn');

    expect(wrapper.emitted('edit-mode')).not.toBeTruthy();

    await coolingBtn.trigger('click');
    
    expect(wrapper.emitted('edit-mode')).toBeTruthy();
    expect(wrapper.emitted('edit-mode').length).toBe(1);

    await heatingBtn.trigger('click');

    expect(wrapper.emitted('edit-mode').length).toBe(2);
  })

  it('Must emit the event "power-device" when power button is clicked', async() => {
    const powerBtn = wrapper.find('.power-button');

    expect(wrapper.emitted('power-device')).not.toBeTruthy();

    await powerBtn.trigger('click');
    
    expect(wrapper.emitted('power-device')).toBeTruthy();
    expect(wrapper.emitted('power-device').length).toBe(1);
  })

  it('Must emit the event "delete-zone" when power button is clicked', async() => {
    const deleteBtn = wrapper.find('.delete-zone-btn');

    expect(wrapper.emitted('delete-zone')).not.toBeTruthy();

    await deleteBtn.trigger('click');
    
    expect(wrapper.emitted('delete-zone')).toBeTruthy();
    expect(wrapper.emitted('delete-zone').length).toBe(1);
  })
})
