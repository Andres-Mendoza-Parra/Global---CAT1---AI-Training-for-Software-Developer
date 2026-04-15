/**
 * @file domManager.js
 * @description Capa de presentación (UI). Se encarga exclusivamente de tomar los datos procesados
 * y renderizarlos en el DOM de forma segura.
 * @dependencies formatters.js (para escapeHTML y formatDate).
 * @flow Recibe el JSON parseado -> Aplica sanitización -> Genera HTML dinámico -> Inyecta en el DOM.
 */

import { formatDate, escapeHTML } from '../utils/formatters.js';

export function renderWeather(weatherList) {
    const container = document.getElementById('weatherResult');
    
    // Uso estricto de escapeHTML para prevenir XSS
    container.innerHTML = weatherList.map(city => `
        <div class="weather-card">
            <h3 class="city-name">${escapeHTML(city.name)}</h3>
            <div class="forecast-grid">
                ${city.forecast.map(day => `
                    <div class="day-item">
                        <span class="day-date">${escapeHTML(formatDate(day.date))}</span>
                        <span class="day-temp">${escapeHTML(day.temp)}°C</span>
                        <div class="day-details">
                            <span>💧 ${escapeHTML(day.hum)}%</span>
                            <span>💨 ${escapeHTML(day.wind)} km/h</span>
                            <span>🌧️ ${escapeHTML(day.precip)} mm</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

export const renderError = (msg) => {
    document.getElementById('weatherResult').innerHTML = 
        `<div class="error-msg">${escapeHTML(msg)}</div>`;
};