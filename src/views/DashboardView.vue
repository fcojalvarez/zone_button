<script setup>
import { ref } from 'vue';
import { ModalZoneConfiguration, ZoneButton } from '../components';
import { useZoneStore } from '../stores/zone';
import { storeToRefs } from 'pinia';

const zoneStore = useZoneStore();
const { zones } = storeToRefs(zoneStore);
const { addNewZoneHandler, changeZoneName, deleteZone, editDesiredTempHandler, togglePowerZone, editZoneMode } = zoneStore;

const isOpenModalConfiguration = ref(false);
const openZone = ref(null);

// Methods
const openInfoZone = (infoZone) => {
  openZone.value = {...infoZone};
  isOpenModalConfiguration.value = true;
}

const closeModalZone = () => {
  isOpenModalConfiguration.value = false;
  openInfoZone.value = null;
}

const deleteZoneHandler = ({zoneId}) => {
  closeModalZone();
  deleteZone({zoneId})
}

const editModeZoneHandler = ({zoneId, type}) => {
  editZoneMode({zoneId, type});
}
</script>

<template>
  <header class="d-flex justify-between">
    <h1 class="title">My zones</h1>

    <button class="add-btn pointer" @click="addNewZoneHandler">Add new zone</button>
  </header>

  <section class="container-zone-buttons">
    <TransitionGroup>
      <div v-for="zone in zones" :key="zone.id">
        <zone-button
          :zone="zone"
          @power-device="togglePowerZone"
          @open-info-zone="openInfoZone"
        />
      </div>
    </TransitionGroup>
  </section>
  
  <Transition>
    <modal-zone-configuration
      v-if="isOpenModalConfiguration"
      :zone="openZone"
      @edit-desired-temperature="editDesiredTempHandler"
      @close="closeModalZone"
      @name-edited="changeZoneName"
      @delete-zone="deleteZoneHandler"
      @edit-mode="editModeZoneHandler"
      @power-device="togglePowerZone"
    />
  </Transition>
</template>

<style lang="scss" scoped>
header {
 padding: 2rem 0;
}
.container-zone-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
.title {
  font-size: 1.2rem;
}
.add-btn {
  background: #0a2a3b;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  padding: .5rem 3rem;
}
.add-btn:hover {
  background: #01808e;
}

@media(min-width: 640px) {
  .container-zone-buttons {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media(min-width: 1024px) {
  .container-zone-buttons {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
