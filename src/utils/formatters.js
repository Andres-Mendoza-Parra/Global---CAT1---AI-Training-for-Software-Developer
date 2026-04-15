/**
 * @file formatters.js
 * @description Módulo de utilidades puras. Contiene datos estáticos, formateadores de fechas
 * y funciones de seguridad (sanitización) para la capa de presentación.
 * @dependencies Ninguna.
 */

export const locationData = {
    "CO": [
        { name: "Bogotá", lat: 4.6097, lon: -74.0817 },
        { name: "Cali", lat: 3.4516, lon: -76.5320 },
        { name: "Medellín", lat: 6.2442, lon: -75.5812 },
        { name: "Barranquilla", lat: 10.9685, lon: -74.7813 }
    ],
    "MX": [
        { name: "CDMX", lat: 19.4326, lon: -99.1332 },
        { name: "Monterrey", lat: 25.6866, lon: -100.3161 },
        { name: "Guadalajara", lat: 20.6597, lon: -103.3496 }
    ],
    "AR": [
        { name: "B. Aires", lat: -34.6037, lon: -58.3816 },
        { name: "Rosario", lat: -32.9468, lon: -60.6393 },
        { name: "Córdoba", lat: -31.4135, lon: -64.1811 }
    ],
    "CL": [
        { name: "Santiago", lat: -33.4489, lon: -70.6693 },
        { name: "Valparaíso", lat: -33.0472, lon: -71.6127 },
        { name: "Concepción", lat: -36.8201, lon: -73.0444 }
    ],
    "PE": [
        { name: "Lima", lat: -12.0464, lon: -77.0428 },
        { name: "Cusco", lat: -13.5320, lon: -71.9675 },
        { name: "Arequipa", lat: -16.4090, lon: -71.5375 }
    ],
    "ES": [
        { name: "Madrid", lat: 40.4168, lon: -3.7038 },
        { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
        { name: "Valencia", lat: 39.4699, lon: -0.3763 }
    ]
};

export const toFahrenheit = (c) => Math.round((c * 9/5) + 32);

export const formatDate = (iso) => 
    new Intl.DateTimeFormat('es', { weekday: 'short', day: 'numeric' }).format(new Date(iso));

/**
 * Función de seguridad para mitigar ataques XSS básicos.
 * Escapa caracteres peligrosos antes de inyectarlos en el DOM.
 * @param {string|number} str - El valor a sanitizar.
 * @returns {string} - Cadena segura para HTML.
 */
export const escapeHTML = (str) => {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag)
    );
};