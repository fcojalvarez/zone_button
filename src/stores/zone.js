import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { defaultZones } from '../utils/main';

export const useZoneStore = defineStore('zone', () => {
  // State
  const zonesList = ref(defaultZones);
  
  // Getters
  const zones = computed(() => zonesList.value)
  
  // Actions
  const addNewZoneHandler = () => {
    const id = Date.now();
  
    zonesList.value.push({
      id,
      name: 'New zone',
      temperatures: { ambient: 19, desired: 24 },
      isInOperation: false
    });
  }

  const togglePowerZone = ({zoneId}) => {
    const indexZone = findZoneSelected({zoneId});
    const zoneSelected = zonesList.value[indexZone];
  
    zoneSelected.isInOperation = !zoneSelected.isInOperation;
  }
  
  const editDesiredTempHandler = ({ type, zoneId }) => {
    const indexZone = findZoneSelected({zoneId});
    const zoneSelected = zonesList.value[indexZone];
  
    type === 'increase'? zoneSelected.temperatures.desired++ : zoneSelected.temperatures.desired--;

    zoneSelected.status = zoneSelected.temperatures.desired > zoneSelected.temperatures.ambient? 'heating': zoneSelected.temperatures.desired < zoneSelected.temperatures.ambient ? 'cooling' : 'off';
  }

  const deleteZone = ({zoneId}) => {
    zonesList.value = zonesList.value.filter( ({id}) => id !== zoneId );
  }

  const changeZoneName = ({zoneId, newName}) => {
    const indexZone = findZoneSelected({zoneId});
  
    zonesList.value[indexZone].name = newName;
  }

  const editZoneMode = ({zoneId, type}) => {
    const indexZone = findZoneSelected({zoneId});
    
    if(!zonesList.value[indexZone].isInOperation) return;
    
    zonesList.value[indexZone].status = type;
  }

  const findZoneSelected = ({zoneId}) => zonesList.value.findIndex( ({id}) => id === zoneId);
  
  return { 
    addNewZoneHandler,
    changeZoneName,
    deleteZone,
    editDesiredTempHandler,
    editZoneMode,
    togglePowerZone,
    zones,
  }
})
