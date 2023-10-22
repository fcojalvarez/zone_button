<script setup>
import { ref, nextTick  } from 'vue';
import { PencilIcon, PowerIcon, SaveIcon, CoolingIcon, HeatingIcon } from './';

const props = defineProps({
    zone: Object
})

const inputNameRef = ref(null);

const isDisabled = ref(true);
const isEditing = ref(false);
const inputModel = ref(props.zone.name);

const saveRoomNameHandler = () => {
    emit('name-edited', {newName: inputModel.value, zoneId: props.zone.id });
    isEditing.value = false;
    isDisabled.value = true;
}

const activeEditHandler = () => {
    isEditing.value = true;
    isDisabled.value = false;
    nextTick(() => {
        inputNameRef.value?.focus();
    })
}

const emit = defineEmits(['name-edited', 'edit-desired-temperature', 'close', 'delete-zone', 'edit-mode', 'power-device'])
</script>

<template>
    <section class="background-modal">
        <section class="modal-container">
            <header>
                <div class="d-flex">
                    <input ref="inputNameRef" type="text" :disabled="isDisabled" v-model="inputModel">
                    <pencil-icon v-if="!isEditing" :width="20" :height="20" class="pointer" @click="activeEditHandler"/>
                    <save-icon v-else :width="20" :height="20" class="pointer" @click="saveRoomNameHandler"/>
                </div>
                <button class="close-btn button-hover-shadow" @click="$emit('close')">X</button>
            </header>
        
            <h3 class="text-center">{{ zone.temperatures.desired }}º</h3>
            <div class="ambient-temperature text-center">
                <span>
                    Ambient temperature:
                    <span class="bold">{{ zone.temperatures.ambient }}º</span>
                </span>
            </div>

            <div class="container-buttons">
                <button class="button-hover-shadow" @click="$emit('edit-desired-temperature', {type:'decrease', zoneId: zone.id})">-</button>
                <button class="button-hover-shadow" @click="$emit('edit-desired-temperature', {type:'increase', zoneId: zone.id})">+</button>
            </div>
            <div class="container-buttons">
                <button class="button-hover-shadow btn-with-icons" @click="$emit('edit-mode', {type:'cooling', zoneId: zone.id})">
                    <cooling-icon color="#0000AA" width="24"/>
                </button>
                <button class="button-hover-shadow btn-with-icons" @click="$emit('edit-mode', {type:'heating', zoneId: zone.id})">
                    <heating-icon color="#DD0000" width="24"/>
                </button>
            </div>
            <div class="container-buttons">
                <button class="button-hover-shadow power-button btn-with-icons" @click="$emit('power-device', {zoneId: zone.id})">
                    <power-icon />
                </button>
            </div>

            <button class="delete-zone-btn" @click="$emit('delete-zone', {zoneId: zone.id})">
                Delete zone
            </button>
        </section>
    </section>
</template>

<style lang="scss" scoped>
section.background-modal {
    filter: blur(100%);
    background: #99999979;
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
    width: 100vw;
    z-index: 999;
}
section.modal-container {
    background: white;
    padding: 2rem 4rem;
    position: absolute;
    border-radius: 10px;
    box-shadow: 10px 10px 30px 0 rgba(0,0,0,0.22);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    header {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0 1rem 0;

        input {
            font-size: 1.5rem;
        }
        input, input:focus {
            border: none;
            outline: none;
        }
        input:disabled {
            background: transparent;
        }

        button {
            cursor: pointer;
            border: none;
            background: transparent;
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1rem;
        }
    }
    
    h3 {
        text-align: center;
        font-size: 3rem;
    }
    .container-buttons {
        margin-top: 1rem; 
        display: flex;
        justify-content: center;
        gap: 1rem;

        button {
            width: 3rem;
            height: 3rem;
            border-radius: 5px;
            border: 1px solid #aaa;
            background: #eee;
            font-size: 1.5rem;
            cursor: pointer;

            &.power-button {
                width: 7rem;
                height: 3rem;
            }
        }
        button:hover {
            background: #ddd;
        }
        .btn-with-icons {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .ambient-temperature {
        width: 100%;
        display: block;

        span {
            font-size: .9rem;
    
            .bold {
                font-weight: 500;
            }
        }
    }

    .delete-zone-btn {
        background: transparent;
        color: #dd0000;
        border: none;
        cursor: pointer;
        font-size: .9rem;
        margin: 2rem auto 1rem;
        display: block;
    }
}
</style>