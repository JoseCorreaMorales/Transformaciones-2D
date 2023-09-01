const canvas = document.getElementById('planoCartesiano');
const context = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const scale = 40; // Escala para convertir coordenadas en píxeles

const drawButton = document.querySelector('.draw-btn');
const points = []; // Arreglo para almacenar los puntos

canvas.addEventListener('click', function (event) {
    // Obtener las coordenadas del evento y convertirlas a coordenadas cartesianas
    const x = (event.clientX - canvas.getBoundingClientRect().left - centerX) / scale;
    const y = -(event.clientY - canvas.getBoundingClientRect().top - centerY) / scale;

    // Agregar el punto al arreglo
    points.push({ x, y });

    // Dibujar la figura con los puntos actualizados
    drawFigure(points);
    console.log(points);
});

// Resto de tu código (funciones drawAxes, drawNumbers, updateCanvas, etc.)

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
    context.fillStyle = '000';
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // Números en el eje X
    for (let x = -10; x <= 10; x++) {
        if (x !== 0) {
            const xPos = centerX + (x * scale);
            context.fillText(x.toString(), xPos, centerY + 5);
        }
    }

    // Números en el eje Y
    for (let y = -10; y <= 10; y++) {
        if (y !== 0) {
            const yPos = centerY - (y * scale);
            context.fillText(y.toString(), centerX - 15, yPos);
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
    context.moveTo(centerX + (points[0].x * scale), centerY - (points[0].y * scale));

    for (let i = 1; i < points.length; i++) {
        context.lineTo(centerX + (points[i].x * scale), centerY - (points[i].y * scale));
    }

    context.closePath();
    context.fill();
}


 

// Resto de tu código (updateCanvas, etc.)
function updateCanvas() {
    drawAxes();
    drawNumbers();
    //drawFigure(figure);
}


updateCanvas();