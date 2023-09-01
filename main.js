const canvas = document.getElementById('planoCartesiano');
const context = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const scale = 40; // Escala para convertir coordenadas en píxeles

const drawButton = document.querySelector('.draw-btn');
let figure = [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }];

drawButton.addEventListener('click', function () {
    const x1 = Number(document.getElementById('x1').value);
    const y1 = Number(document.getElementById('y1').value);
    const x2 = Number(document.getElementById('x2').value);
    const y2 = Number(document.getElementById('y2').value);
    const x3 = Number(document.getElementById('x3').value);
    const y3 = Number(document.getElementById('y3').value);
     
})

// Función para dibujar ejes
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

function drawFigure(points) {
    context.fillStyle = "#364b43";
    context.beginPath();
    context.moveTo(centerX + (points[0].x * scale), centerY - (points[0].y * scale));

    for (let i = 1; i < points.length; i++) {
        context.lineTo(centerX + (points[i].x * scale), centerY - (points[i].y * scale));
    }

    context.closePath();
    context.fill();
}



function updateCanvas() {
    drawAxes();
    drawNumbers();
    drawFigure(figure);
}


updateCanvas();
