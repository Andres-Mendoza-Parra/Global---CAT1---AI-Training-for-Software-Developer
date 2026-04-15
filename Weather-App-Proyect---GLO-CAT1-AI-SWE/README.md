# 🌦️ Weather App - Modular Dashboard

## 📌 Descripción del Proyecto

Esta aplicación es un panel de control climático modular desarrollado como parte del curso de **Global - CAT1 - AI Training for Software Developer Graduates v2 - Spanish - 2026**. La herramienta permite visualizar el pronóstico extendido de 5 días para múltiples ciudades en diversos países, consumiendo datos en tiempo real de la API de Open-Meteo.

El enfoque principal de este proyecto no es solo la visualización de datos, sino la implementación de una **arquitectura limpia (Clean Architecture)**, modularidad estricta y protocolos de seguridad en el front-end para garantizar la integridad y eficiencia de la aplicación.

## 🚀 Características Principales

  * **Visualización Multiciudad:** Renderizado simultáneo de datos climáticos para múltiples nodos urbanos por país.
  * **Pronóstico de 5 Días:** Datos detallados de temperatura máxima, humedad, velocidad del viento y probabilidad de precipitaciones.
  * **Arquitectura Modular:** Separación clara de responsabilidades (Lógica de API, Manejo de DOM, Utilidades y Estilos).
  * **Sistema de Caché Inteligente:** Implementación de `localStorage` con expiración de 1 hora para optimizar el rendimiento y reducir el consumo de la API.
  * **Diseño Responsivo:** Interfaz moderna con efectos de *glassmorphism* adaptable a dispositivos móviles y escritorio.

## 📂 Estructura del Proyecto

```text
/
├── index.html              # Punto de entrada y estructura semántica
├── assets/
│   └── css/
│       └── styles.css      # Estilos globales y variables de diseño
├── src/
│   ├── main.js             # Controlador principal y gestión de eventos
│   ├── api/
│   │   └── openMeteo.js    # Servicio de conexión y lógica de caché
│   ├── ui/
│   │   └── domManager.js   # Renderizado seguro de componentes de interfaz
│   └── utils/
│       └── formatters.js   # Datos maestros y sanitización de entrada
└── README.md               # Documentación técnica
```

## 🛠️ Guía de Configuración

El proyecto ha sido diseñado para ser ligero y no requiere dependencias externas o servidores de construcción complejos.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Andres-Mendoza-Parra/Global---CAT1---AI-Training-for-Software-Developer
    ```
2.  **Acceder al directorio:**
    ```bash
    cd nombre-del-repo
    ```
3.  **Ejecución:**
    Simplemente abre el archivo `index.html` en tu navegador preferido.
    *Nota: Se recomienda usar una extensión como "Live Server" en VS Code para manejar correctamente los módulos de JavaScript.*

## 🔒 Seguridad y Refactorización

Este proyecto integra medidas de seguridad robustas:

  * **Mitigación de XSS (Cross-Site Scripting):** Se implementó una función de sanitización personalizada que escapa caracteres peligrosos antes de ser inyectados en el DOM.
  * **Eliminación de Estilos Inline:** Siguiendo el principio de separación de preocupaciones, se eliminó toda lógica de estilo del JavaScript, moviéndola a clases CSS dedicadas.
  * **Protección de Credenciales:** Se utiliza la API de Open-Meteo que, por diseño, no requiere API Keys, eliminando el riesgo de exposición de secretos en el cliente.
  * **Rate Limiting UI:** El botón de búsqueda se deshabilita dinámicamente durante las peticiones para prevenir el abuso del servicio y garantizar una experiencia de usuario fluida.

## 🎓 Créditos

**Desarrollador:** Andres Felipe Mendoza Parra
**Curso:** Global - CAT1 - AI Training for Software Developer Graduates v2 - Spanish - 2026

-----

> *Este código sirve como base sólida para futuras integraciones de IA, como modelos de predicción climática o análisis de datos históricos.*