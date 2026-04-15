/**
 * @file openMeteo.js
 * @description Capa de servicio para la API. Maneja peticiones de red y políticas de caché
 * (1 hora) para proteger la cuota de la API y mejorar el rendimiento.
 * @dependencies Ninguna.
 * @flow main.js llama a getWeatherData -> Verifica caché -> Si no hay, fetch a Open-Meteo -> Mapea resultados -> Retorna.
 */

const CACHE_KEY = 'weather_cache_v3';
const ONE_HOUR = 3600000;

export async function getWeatherData(cities, countryCode) {
    if (!cities || cities.length === 0) throw new Error("Datos de ciudad inválidos.");

    const now = Date.now();
    const fullCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    
    // Retorno temprano si hay caché válido
    if (fullCache[countryCode]?.timestamp > now - ONE_HOUR) {
        return fullCache[countryCode].data;
    }

    const lats = cities.map(c => c.lat).join(',');
    const lons = cities.map(c => c.lon).join(',');
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,relative_humidity_2m_max,wind_speed_10m_max,precipitation_sum&forecast_days=5&timezone=auto`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    const dataArray = Array.isArray(data) ? data : [data];

    const results = cities.map((city, i) => {
        const cityData = dataArray[i].daily;
        return {
            name: city.name,
            forecast: cityData.time.map((t, idx) => ({
                date: t,
                temp: cityData.temperature_2m_max[idx],
                hum: cityData.relative_humidity_2m_max[idx],
                wind: cityData.wind_speed_10m_max[idx],
                precip: cityData.precipitation_sum[idx]
            }))
        };
    });

    // Guardar en caché
    fullCache[countryCode] = { timestamp: now, data: results };
    localStorage.setItem(CACHE_KEY, JSON.stringify(fullCache));
    
    return results;
}