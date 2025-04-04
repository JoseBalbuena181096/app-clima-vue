import {ref, computed} from 'vue';
import axios from "axios";

export default function useClima(){

    const clima = ref({});
    const cargando = ref(false);
    const error = ref('');

    const obtenerClima = async ({ciudad, pais}) =>{
        // Importando el API key
        const key = import.meta.env.VITE_API_KEY;
        cargando.value = true;
        error.value = '';
        clima.value = {};

        try {
            // Obtener la lat, y la lng
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;
            const {data} = await axios(url);
            const {lat, lon} = data[0];

            // Despues obtener el clima

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const {data:dataClima} = await axios(urlClima);
            clima.value = dataClima;

        } catch {
            error.value = 'ciudad no encontrada';
        }
        finally{
            cargando.value = false;
        }
    }

    const mostrarClima = computed(()=>{
        return Object.values(clima.value).length > 0;
    });

    const formatearTemperatura = temperatura => parseInt(temperatura - 273.15);

    return {
        obtenerClima,
        clima,
        mostrarClima,
        formatearTemperatura,
        cargando,
        error
    }
}