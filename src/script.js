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

// Mapeo de clases a cambiar
const COLOR_CLASSES = {
    'bg-indigo-600': 'bg-{color}-600', // Navbar
    'text-indigo-600': 'text-{color}-600', // Textos
    'text-indigo-500': 'text-{color}-500', // Iconos
    'hover:bg-indigo-50': 'hover:bg-{color}-50', // Hovers
    'from-indigo-50': 'from-{color}-50', // Gradientes
    'to-indigo-100': 'to-{color}-100',
    'border-indigo-600': 'border-{color}-600', // Bordes
    'bg-indigo-100': 'bg-{color}-100' // Fondos
};

// ==============================================
// CARGADOR INICIAL
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    initColorPicker();
    loadSavedTheme();
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
    
    // Prevenir cierre cuando se hace clic en el menú
    colorMenu.addEventListener('click', e => e.stopPropagation());
    
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
    const colorClass = e.currentTarget.getAttribute('data-color');
    const colorName = colorClass.split('-')[1]; // Extraer 'blue' de 'bg-blue-500'
    
    applyTheme(colorName);
    showConfirmation();
    saveTheme(colorName);
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

function applyTheme(colorName) {
    // 1. Cambiar navbar
    document.querySelector('nav').className = `shadow-lg bg-${colorName}-600`;
    
    // 2. Cambiar botón flotante
    colorToggle.className = `fixed bottom-8 right-8 w-16 h-16 z-50 bg-${colorName}-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-${colorName}-700 transition-all duration-300`;
    
    // 3. Cambiar todas las clases relacionadas al color
    Object.keys(COLOR_CLASSES).forEach(oldClass => {
        const newClass = COLOR_CLASSES[oldClass].replace('{color}', colorName);
        
        document.querySelectorAll(`.${oldClass}`).forEach(element => {
            element.classList.replace(oldClass, newClass);
        });
    });
    
    // 4. Cambiar clases específicas que no siguen el patrón
    document.querySelectorAll('[class*="indigo"]').forEach(element => {
        const classes = Array.from(element.classList);
        
        classes.forEach(cls => {
            if (cls.includes('indigo')) {
                const newClass = cls.replace('indigo', colorName);
                element.classList.replace(cls, newClass);
            }
        });
    });
    
    // 5. Cambiar día seleccionado en calendario
    const selectedDay = document.querySelector('.bg-indigo-100');
    if (selectedDay) {
        selectedDay.className = selectedDay.className.replace('bg-indigo-100', `bg-${colorName}-100`);
        selectedDay.className = selectedDay.className.replace('text-indigo-600', `text-${colorName}-600`);
    }
    
    closeColorMenu();
}

function showConfirmation() {
    colorToggle.innerHTML = CONFIRMATION_ICON;
    setTimeout(() => {
        colorToggle.innerHTML = DEFAULT_ICON;
    }, CONFIRMATION_DELAY);
}

function saveTheme(colorName) {
    localStorage.setItem('themeColor', colorName);
}

function loadSavedTheme() {
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        // Buscar el botón correspondiente al color guardado
        const button = document.querySelector(`[data-color*="${savedColor}"]`);
        if (button) {
            // Simular click para aplicar el tema
            button.click();
        }
    }
}