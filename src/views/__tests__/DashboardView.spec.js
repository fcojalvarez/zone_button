import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { mount } from '@vue/test-utils';
import DashboardView from '../DashboardView.vue';
import { useZoneStore } from '../../stores/zone';

describe('DashboardView', () => {
  let wrapper;
  let zoneStore;

  beforeEach(() => {
    setActivePinia(createPinia())
    zoneStore = useZoneStore();
    wrapper = mount(DashboardView);
  })

  it('Add new zone button must be visible', () => {
    const addBtn = wrapper.find('.add-btn');
    
    expect(addBtn.exists()).toBe(true);
  })
  
  it('By default, 4 zones should be displayed', () => {
    expect(zoneStore.zones.length).toBe(4);
  })
  
  it('By clicking on add new zone, 5 zones must be displayed', async() => {
    expect(zoneStore.zones.length).toBe(4);

    const addBtn = wrapper.find('.add-btn');
    await addBtn.trigger('click');

    expect(zoneStore.zones.length).toBe(5);
  })

  it('Modal with zone information should open when you click on a zone', async() => {
    const component = wrapper.vm;
    component.openZone = { id: 1697968259817,
      name: "Bathroom",
      temperatures: { ambient: 20, desired: 20 },
      status: 'off',
      isInOperation: true
    };

    let modalZoneConfigurationComponent = wrapper.find('.modal-container');
    
    expect(modalZoneConfigurationComponent.exists()).toBe(false);
    
    const cardComponent = wrapper.findAll('.card');
    await cardComponent[0].trigger('click');

    modalZoneConfigurationComponent = wrapper.find('.modal-container');
    
    expect(modalZoneConfigurationComponent.exists()).toBe(true);
  })

  it('When a zone is deleted, there should be 4 zones again', async() => {
    const component = wrapper.vm;
    component.openZone = { id: 1697968259817,
      name: "Bathroom",
      temperatures: { ambient: 20, desired: 20 },
      status: 'off',
      isInOperation: true
    };

    expect(zoneStore.zones.length).toBe(5);
    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[0].trigger('click');

    const deleteZoneBtn = wrapper.find('.delete-zone-btn');
    await deleteZoneBtn.trigger('click');
        
    expect(zoneStore.zones.length).toBe(4);
  })

  it('Modal with zone information should open when you click on a zone', async() => {
    const component = wrapper.vm;
    component.openZone = { id: 1697968259817,
      name: "Bathroom",
      temperatures: { ambient: 20, desired: 20 },
      status: 'off',
      isInOperation: true
    };
    
    let modalZoneConfigurationComponent = wrapper.find('.modal-container');
    expect(modalZoneConfigurationComponent.exists()).toBe(false);

    const cardComponent = wrapper.findAll('.card');
    await cardComponent[0].trigger('click');

    modalZoneConfigurationComponent = wrapper.find('.modal-container');
    expect(modalZoneConfigurationComponent.exists()).toBe(true);

    const closeBtn = wrapper.find('.close-btn');
    await closeBtn.trigger('click');

    modalZoneConfigurationComponent = wrapper.find('.modal-container');
    expect(modalZoneConfigurationComponent.exists()).toBe(false);
  })

  it('Status should change when the zone is turned on', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    expect(zoneStore.zones[0].isInOperation).toBe(false);
    
    const powerButtonFirstCard = wrapper.findAll('.power-button')[0];
    await powerButtonFirstCard.trigger('click');
    
    expect(zoneStore.zones[0].isInOperation).toBe(true);
  })

  it('Background color should change when the zone is turned off', async() => {
    const cardsComponent = wrapper.findAll('.card');

    expect(cardsComponent[0].classes()).toContain('success');
    
    const powerButtonFirstCard = wrapper.findAll('.power-button')[0];
    await powerButtonFirstCard.trigger('click');

    expect(cardsComponent[0].classes()).not.toContain('success');
  })

  it('Should change text, background color, icon and status when switching from heating to cooling mode', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');
    
    expect(cardsComponent[2].find('footer').html()).toContain('Heating to');
    expect(cardsComponent[2].find('.cooling-icon').exists()).toBe(false);
    expect(cardsComponent[2].find('.heating-icon').exists()).toBe(true);
    expect(cardsComponent[2].classes()).toContain('heating');
    expect(cardsComponent[2].classes()).not.toContain('cooling');
    
    
    const coolingBtn = wrapper.find('#cooling-btn');
    await coolingBtn.trigger('click');
    
    expect(cardsComponent[2].find('footer').html()).toContain('Cooling to');
    expect(cardsComponent[2].find('.cooling-icon').exists()).toBe(true);
    expect(cardsComponent[2].find('.heating-icon').exists()).toBe(false);
    expect(cardsComponent[2].classes()).not.toContain('heating');
    expect(cardsComponent[2].classes()).toContain('cooling');
  })

  it('Temperature should increase if the + button is clicked', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');

    expect(cardsComponent[2].find('.room-status').html()).toContain('24º');
    
    const coolingBtn = wrapper.find('#increase-btn');
    await coolingBtn.trigger('click');

    expect(cardsComponent[2].find('.room-status').html()).toContain('25º');
  })

  it('Temperature should decrease if the - button is clicked', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');

    expect(cardsComponent[2].find('.room-status').html()).toContain('25º');
    
    const coolingBtn = wrapper.find('#decrease-btn');
    await coolingBtn.trigger('click');

    expect(cardsComponent[2].find('.room-status').html()).toContain('24º');
  })

  it('Device should shut down when powering off from the modal', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');

    expect(cardsComponent[2].classes()).toContain('is-operating');
    
    const powerBtn = cardsComponent[2].find('.power-button');
    await powerBtn.trigger('click');
    
    expect(cardsComponent[2].classes()).not.toContain('is-operating');
  })

  it('Input name zone must be disabled', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');

    const modalZoneConfigurationComponent = wrapper.find('.modal-container');
    const inputZoneName = modalZoneConfigurationComponent.find('input'); 

    expect('disabled' in inputZoneName.attributes()).toBe(true);
  })
  
  it('Input name zone must be activated by clicking on the pencil icon', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');

    const modalZoneConfigurationComponent = wrapper.find('.modal-container');
    const inputZoneName = modalZoneConfigurationComponent.find('input'); 
    const editInputBtn = modalZoneConfigurationComponent.find('.edit-btn');

    expect('disabled' in inputZoneName.attributes()).toBe(true);
    await editInputBtn.trigger('click');
    expect('disabled' in inputZoneName.attributes()).toBe(false);
  })
  
  it('If you change the zone name, it should be changed on the card', async() => {
    const component = wrapper.vm;
    
    component.openZone = { id: 1697968257867,
      name: "Living room",
      temperatures: { ambient: 21, desired: 24 },
      status: 'off',
      isInOperation: false
    };

    const cardsComponent = wrapper.findAll('.card');
    await cardsComponent[2].trigger('click');

    const modalZoneConfigurationComponent = wrapper.find('.modal-container');
    const inputZoneName = modalZoneConfigurationComponent.find('input'); 
    const editInputBtn = modalZoneConfigurationComponent.find('.edit-btn');
    
    expect(cardsComponent[2].find('.room-name').text()).toBe('Bedroom');
    expect(inputZoneName.element.value).toBe('Bedroom');
    
    await editInputBtn.trigger('click');
    await inputZoneName.setValue('Edited');
    
    const saveInputBtn = modalZoneConfigurationComponent.find('.save-btn');
    await saveInputBtn.trigger('click');
    
    expect(cardsComponent[2].find('.room-name').text()).toBe('Edited');
    expect(inputZoneName.element.value).toBe('Edited');
  })
})
