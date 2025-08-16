// ==============================================
// IMPORTACIONES (si hubieran módulos o librerías)
// ==============================================
// Ejemplo: 
// import { funcion } from './modulo.js';
// const plugin = require('plugin');

// ==============================================
// ELEMENTOS DEL DOM
// ==============================================
const colorToggle = document.getElementById('colorToggle');
const colorMenu = document.getElementById('colorMenu');
const colorOptions = document.querySelectorAll('[data-color]');

// ==============================================
// VARIABLES/CONSTANTES GLOBALES
// ==============================================
const CONFIRMATION_DELAY = 1000; // ms
const DEFAULT_ICON = '<i class="fas fa-palette text-2xl"></i>';
const CONFIRMATION_ICON = '<i class="fas fa-check text-2xl"></i>';

// ==============================================
// CARGADOR INICIAL
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    initColorPicker();
});

// ==============================================
// FUNCIONES PRINCIPALES
// ==============================================
function initColorPicker() {
    setupEventListeners();
}

function setupEventListeners() {
    // Toggle del menú
    colorToggle.addEventListener('click', handleToggleClick);
    
    // Cierre al hacer clic fuera
    document.addEventListener('click', closeColorMenu);
    
    // Selección de color
    colorOptions.forEach(option => {
        option.addEventListener('click', handleColorSelection);
    });
}

// ==============================================
// MANEJADORES DE EVENTOS
// ==============================================
function handleToggleClick(e) {
    e.stopPropagation();
    toggleColorMenu();
}

function handleColorSelection(e) {
    e.stopPropagation();
    const newColor = e.currentTarget.getAttribute('data-color');
    changeMainColor(newColor);
    showConfirmation();
}

// ==============================================
// FUNCIONES DE UTILIDAD
// ==============================================
function toggleColorMenu() {
    colorMenu.classList.toggle('hidden');
    colorMenu.classList.toggle('animate-fadeIn');
}

function closeColorMenu() {
    colorMenu.classList.add('hidden');
}

function changeMainColor(newColor) {
    colorToggle.className = colorToggle.className.replace(/bg-\w+-\d+/, newColor);
    closeColorMenu();
}

function showConfirmation() {
    colorToggle.innerHTML = CONFIRMATION_ICON;
    setTimeout(() => {
        colorToggle.innerHTML = DEFAULT_ICON;
    }, CONFIRMATION_DELAY);
}

// ==============================================
// API CALLS (si hubieran llamadas a APIs)
// ==============================================
// Ejemplo:
// async function fetchColors() {
//     const response = await fetch('/api/colors');
//     return response.json();
// }