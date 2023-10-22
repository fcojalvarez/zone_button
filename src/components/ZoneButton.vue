<script>
export default { name: "zone-button" };
</script>

<script setup>
import { computed } from 'vue';
import { PowerIcon, HeatingIcon, CoolingIcon } from './index';

const props = defineProps({
    zone: Object
})

const roomStatus = computed(() => {
    if(!props.zone.isInOperation) return 'OFF';

    const titles = {
        heating: `Heating to ${props.zone.temperatures.desired}º`,
        cooling: `Cooling to ${props.zone.temperatures.desired}º`,
        off: 'Success'
    }

    return titles[props.zone.status];
})
const powerButtonColor = computed(() => {
    if(!props.zone.isInOperation) return '#CBD2D9';

    const colorStatus = {
        heating: '#FFC8BD',
        cooling: '#B3ECFF',
        off: '#C6F7E5'
    }

    return colorStatus[props.zone.status];
})
const roomStatusTextColor = computed(() => {
    if(!props.zone.isInOperation) return '#9AA5B1';

    const colorStatus = {
        heating: '#FFC3BD',
        cooling: '#B3ECFF',
        off: '#C6F7E5'
    }

    return colorStatus[props.zone.status];
})

const test = computed(() => props.zone.status )

const emit = defineEmits(['power-device', 'open-info-zone'])
</script>

<template>
    <main
        :class="['card', {
            'is-operating': zone.isInOperation,
            'heating': zone.status === 'heating' && zone.isInOperation,
            'cooling': zone.status === 'cooling' && zone.isInOperation,
            'success': zone.status === 'off' && zone.isInOperation
        }]"
        @click="$emit('open-info-zone', {...zone})"
    >
        <transition>
            <heating-icon
                v-if="zone.isInOperation && test === 'heating'"
                class="heating-icon rotating" 
            />
            <cooling-icon
                v-else-if="zone.isInOperation && test === 'cooling'"
                class="cooling-icon rotating"  
            />
        </transition>

        <section class="card-content">
            <header class="header">
                <h1 v-show="zone.temperatures.ambient" :class="['temperature', zone.isInOperation? 'on-colors': 'off-colors']">
                    {{zone.temperatures.ambient}}º
                </h1>
                <button
                    :class="['power-button', zone.isInOperation? 'on-colors': 'off-colors']"
                    @click.stop="$emit('power-device', {zoneId: zone.id})"
                >
                    <power-icon />
                </button>
            </header>
    
            <footer>
                <p :class="['room-name text-ellipsis', zone.isInOperation? 'on-colors' : 'off-colors']">
                    {{zone.name}}
                </p>

                <Transition>
                  <span
                      :class="['room-status text-ellipsis', zone.isInOperation? 'on-colors' : 'off-colors']"
                  >
                      {{ roomStatus }}
                  </span>
                </Transition>
            </footer>
        </section>
    </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style scoped lang="scss">
@property --firstColor {
  syntax: '<color>';
  inherits: false;
  initial-value: white;
}
@property --secondColor {
  syntax: '<color>';
  inherits: false;
  initial-value: white;
}

.card {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    background: #fff;
    box-shadow: 2px 2px 15px 0 rgba(0,0,0,0.22);
    height: 130px;
    width: 200px;
    padding: 17px 13px;
    transition: --firstColor .5s;
    transition: --secondColor .5s;
    background: linear-gradient(to bottom right, var(--firstColor) 0%, var(--secondColor) 100%);

    &.cooling {
        --firstColor: #40C3F7;
        --secondColor: #0B69A3;
    }
    
    &.heating {
        --firstColor: #EF694E;
        --secondColor: #CF1E11;
    }
    
    &.success {
        --firstColor: #2DCC9A;
        --secondColor: #01644F;
    }

    &.is-operating {
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.34);
    }

    .card-content {
        z-index: 9;
    }
    .header {
        display: flex;
        justify-content: space-between;
        
    }
    .temperature {
        color: #7B8794;
        font-size: 33px;
        transition: color .2s ease-in-out;
        &.on-colors {
            color: #fff;
        }
    }
    .power-button {
        background: transparent;
        border: none;
        transition: color .2s ease-in-out;
        color:#CBD2D9;
        margin-left: auto;
        cursor: pointer;
        z-index: 9;

        &.on-colors {
            color: v-bind('powerButtonColor');
        }
    }

    footer {
        .room-name {
            transition: color .15s ease-in-out;
            font-size: 16px;
            color: #1F2933;

            &.on-colors {
                color: #fff;
            }
        }


        .room-status {
            font-size: 13px;
            transition: color .2s ease-in-out;
            color: v-bind(roomStatusTextColor);
            display: block;
        }
    }

    .heating-icon, .cooling-icon {
        position: absolute;
        width: 100px;
        height: 100px;
        bottom: -20%;
        right: -20%;
        color: #FFFFFF55;
    }
    
    .rotating {
        -webkit-animation: rotating 10s linear infinite;
        -moz-animation: rotating 10s linear infinite;
        -ms-animation: rotating 10s linear infinite;
        -o-animation: rotating 10s linear infinite;
        animation: rotating 10s linear infinite;
    }
}
</style>