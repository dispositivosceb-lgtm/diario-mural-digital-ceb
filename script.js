const fotos = [
    { nombre: "foto1.jpg", etiqueta: "Celebraciones Dia Del Libro" },
    { nombre: "foto2.jpg", etiqueta: "Celebraciones Dia Del Libro" },
    { nombre: "foto3.jpg", etiqueta: "Licenciatura 2026" },
    { nombre: "foto4.jpg", etiqueta: "Licenciatura 2026" },
    { nombre: "foto5.jpg", etiqueta: "Licenciatura 2026" },
    { nombre: "foto6.jpg", etiqueta: "Licenciatura 2026" },
    { nombre: "foto7.jpg", etiqueta: "Actividades de semana santa" },
    { nombre: "foto8.jpg", etiqueta: "Actividades de semana santa" },
    { nombre: "foto9.jpg", etiqueta: "Celebramos la neurodiversidad" },
    { nombre: "foto10.jpg", etiqueta: "Celebramos la neurodiversidad" }
];

const frases = ["Colegio estrella de belén", "Compartiendo la buena nueva"];

let currentFotoIdx = 0;
let currentFraseIdx = 0;

function updatePhoto() {
    const imgElement = document.getElementById('display-photo');
    const labelElement = document.getElementById('header-text');
    
    if (fotos.length === 0) return;

    const fotoActual = fotos[currentFotoIdx];

    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        imgElement.src = `img/${fotoActual.nombre}`;
        labelElement.innerText = fotoActual.etiqueta;
        imgElement.style.opacity = 1;
    }, 800);

    currentFotoIdx = (currentFotoIdx + 1) % fotos.length;
}

function updateText() {
    const textDiv = document.getElementById('dynamic-text');
    
    textDiv.classList.add('slide-out');

    setTimeout(() => {
        currentFraseIdx = (currentFraseIdx + 1) % frases.length;
        textDiv.innerText = frases[currentFraseIdx];

        textDiv.classList.remove('slide-out');
        textDiv.classList.add('slide-in-top');

        textDiv.offsetHeight; 

        textDiv.classList.remove('slide-in-top');
    }, 800);
}

function startClock() {
    const display = document.getElementById('time-display');
    
    function fetchAndUpdateTime() {
        fetch('https://worldtimeapi.org/api/timezone/America/Santiago')
            .then(response => response.json())
            .then(data => {
                const datetime = new Date(data.datetime);
                const hh = String(datetime.getHours()).padStart(2, '0');
                const mm = String(datetime.getMinutes()).padStart(2, '0');
                display.innerText = `${hh}:${mm}`;
            })
            .catch(error => {
                console.error('Error obteniendo hora de internet:', error);
                // Si falla internet, usa hora local
                const now = new Date();
                const hh = String(now.getHours()).padStart(2, '0');
                const mm = String(now.getMinutes()).padStart(2, '0');
                display.innerText = `${hh}:${mm}`;
            });
    }
    
    fetchAndUpdateTime();
    // Actualiza cada minuto para sincronizar con la hora oficial
    setInterval(fetchAndUpdateTime, 60000);
}

window.onload = () => {
    updatePhoto();
    startClock();
    setInterval(updatePhoto, 60000);
    setInterval(updateText, 30000);
};
