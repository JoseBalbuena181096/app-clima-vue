<script setup>
    import { reactive, ref } from 'vue';
    import Alerta from './Alerta.vue';

    const busqueda = reactive({
        ciudad: '',
        pais: ''
    });

    const error = ref('');

    const emit = defineEmits(['obtener-clima']);

    const paises = [
        { codigo: 'US', nombre: 'Estados Unidos' },
        { codigo: 'MX', nombre: 'México' },
        { codigo: 'AR', nombre: 'Argentina' },
        { codigo: 'CO', nombre: 'Colombia' },
        { codigo: 'CR', nombre: 'Costa Rica' },
        { codigo: 'ES', nombre: 'España' },
        { codigo: 'PE', nombre: 'Perú' }
    ];

    const consultarClima = ()=>{
        if(Object.values(busqueda).includes('')){
            error.value = "Todos los campos son obligatorios";
            setTimeout(()=>{
                error.value = "";
            },3000);
            return;
        }
        emit('obtener-clima', busqueda);
    }

</script>

<template>
    <form 
    class="formulario"
    @submit.prevent = "consultarClima"
    >
        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="campo">
            <label for="ciudad">Ciudad</label>
            <input 
                type="text"
                id="ciudad"
                placeholder="Ciudad"
                v-model="busqueda.ciudad"
            >
        </div>
        <div class="campo">
            <label for="ciudad">País</label>
            <select 
                id="pais"
                v-model="busqueda.pais"
            >
                <option style="color: black;" value=""> -- Seleccione un país -- </option>
                <option 
                    style="color: black;"
                    :value="pais.codigo" 
                    v-for="pais in paises"
                > 
                    {{ pais.nombre }} 
                </option>
            </select>
            <input type="submit" value="Consultar Clima"/>
        </div>
    </form>
</template>
