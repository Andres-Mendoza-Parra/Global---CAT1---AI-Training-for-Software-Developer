/**
 * @file main.js
 * @description Controlador principal. Orquesta la interacción del usuario, coordina la capa 
 * de red y actualiza la interfaz de usuario.
 * @dependencies openMeteo.js, domManager.js, formatters.js
 * @flow Usuario selecciona país -> Habilita botón -> Clic -> Llama API (con protección UI) -> Renderiza OK o Error.
 */

import { getWeatherData } from './api/openMeteo.js';
import { renderWeather, renderError } from './ui/domManager.js';
import { locationData } from './utils/formatters.js';

const select = document.getElementById('countrySelect');
const btn = document.getElementById('searchBtn');

// Habilitar el botón solo si hay una selección válida
select.addEventListener('change', () => {
    btn.disabled = !select.value;
});

btn.addEventListener('click', async () => {
    const countryCode = select.value;
    if (!countryCode) return;

    // Prevención de envíos múltiples (Rate limit a nivel UI)
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = "Cargando...";

    try {
        const data = await getWeatherData(locationData[countryCode], countryCode);
        renderWeather(data);
    } catch (error) {
        console.error("Fetch error:", error);
        renderError("Error al obtener datos detallados. Verifica tu conexión.");
    } finally {
        // Restaurar estado del botón
        btn.disabled = false;
        btn.textContent = originalText;
    }
});