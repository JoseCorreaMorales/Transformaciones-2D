const canvas = document.getElementById('planoCartesiano');
const context = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const scale = 40; // Escala para convertir coordenadas en píxeles

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


function updateCanvas() {
    drawAxes();
    drawNumbers();
}

updateCanvas();