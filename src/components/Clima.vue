<script setup>
    import useClima from '../composables/useClima';

    const {formatearTemperatura} = useClima();

    defineProps({
        clima: {
            type: Object,
            requiered: true
        }
    });
</script>

<template>
    <div class="resultado">
        <h2> Clima de: {{ clima.name }} </h2>
        <p class="actual"> {{ formatearTemperatura(clima.main.temp) }} <span>&deg;C</span></p>
        <div class="temperaturas">
            <p>Min: {{ formatearTemperatura(clima.main.temp_min) }} <span>&deg;C</span></p>
            <p>Max: {{ formatearTemperatura(clima.main.temp_max) }} <span>&deg;C</span></p>
        </div>
    </div>
</template>