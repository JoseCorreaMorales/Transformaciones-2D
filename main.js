const canvas = document.getElementById('planoCartesiano');
const context = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const scale = 40; // Escala para convertir coordenadas en píxeles

const points = []; // Arreglo para almacenar los puntos
let figure = []; // Inicializa la variable 'figure'

/* botones para las traslaciones */
const translateButton = document.querySelector('.translate-btn');
const scaleButton = document.querySelector('.scale-btn');
const rotateButton = document.querySelector('.rotate-btn');


canvas.addEventListener('click', function (event) {
    // Obtener las coordenadas del evento y convertirlas a coordenadas cartesianas
    const x = (event.clientX - canvas.getBoundingClientRect().left - centerX) / scale;
    const y = -(event.clientY - canvas.getBoundingClientRect().top - centerY) / scale;

    // Agregar el punto al arreglo
    points.push({ x, y });

    // Dibujar la figura con los puntos actualizados
    figure = points.slice(); // Copia los puntos a 'figure'
    drawFigure(figure);
});


/* dibujar los ejes */
function drawAxes() {
    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(canvas.width, centerY);
    context.moveTo(centerX, 0);
    context.lineTo(centerX, canvas.height);
    context.strokeStyle = '#000';
    context.lineWidth = 5;
    context.stroke();
}


function drawNumbers() {
    context.font = 'bold 25px Roboto, sans-serif';
    context.fillStyle = '#000'; 
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // Números en el eje X
    for (let x = -10; x <= 10; x++) {
        if (x !== 0) {
            const xPos = centerX + (x * scale);
            context.fillText(x.toString(), xPos, centerY + 5); /* desplar 5px los numeros */
        }
    }

    // Números en el eje Y
    for (let y = -10; y <= 10; y++) {
        if (y !== 0) {
            const yPos = centerY - (y * scale);
            context.fillText(y.toString(), centerX - 20, yPos);
        }
    }
}

// Función para dibujar la figura
function drawFigure(points) {
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    drawAxes();
    drawNumbers();

    context.fillStyle = "#364b43";
    context.beginPath();

    if (points && points.length > 0) { // Verificar si points tiene valores válidos
        context.moveTo(centerX + (points[0].x * scale), centerY - (points[0].y * scale));

        for (let i = 1; i < points.length; i++) {
            context.lineTo(centerX + (points[i].x * scale), centerY - (points[i].y * scale));
        }
    }

    context.closePath();
    context.fill();
}

/* apliando las formulas  */
function translateFigure(points, dx, dy) {
    return points.map(point => ({ x: point.x + dx, y: point.y + dy }));
}

function scaleFigure(points, scaleX, scaleY) {
    return points.map(point => ({ x: point.x * scaleX, y: point.y * scaleY }));
}

function rotateFigure(points, angleDegrees) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return points.map(point => ({
        x: point.x * Math.cos(angleRadians) - point.y * Math.sin(angleRadians),
        y: point.x * Math.sin(angleRadians) + point.y * Math.cos(angleRadians)
    }));
}

translateButton.addEventListener('click', function () {
    const dx = Number(document.getElementById('translateX').value);
    const dy = Number(document.getElementById('translateY').value);
   
    figure = translateFigure(figure, dx, dy);
    updateCanvas();
});

scaleButton.addEventListener('click', function () {
    const scaleX = Number(document.getElementById('scaleX').value);
    const scaleY = Number(document.getElementById('scaleY').value);
    figure = scaleFigure(figure, scaleX, scaleY);
    updateCanvas();
});

rotateButton.addEventListener('click', function () {
    const angleDegrees = Number(document.getElementById('rotateAngle').value);
    figure = rotateFigure(figure, angleDegrees);
    updateCanvas();
});

function updateCanvas() {
    drawAxes();
    drawNumbers();
    drawFigure(figure); // Dibuja la figura actualizada
}

updateCanvas();
