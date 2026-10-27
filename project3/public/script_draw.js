const canvas = document.getElementById('canvas');
const uploadBtn = document.getElementById('uploadBtn');
const ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: false,
    colorSpace: 'srgb',
    willReadFrequently: true,
});


let prevMouseX, prevMouseY, snapshot;
let isDrawing = false;

const setCanvasBackground = () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('load', () => {   
    setCanvasBackground();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
});

const drawStroke = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY;
    ctx.beginPath();
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

uploadBtn.addEventListener('click', async () => {
    canvas.toBlob(async (blob) => {
        const formData = new FormData(); //ohhhhhhh wow im following along this tutorial and this makes so much sense
        formData.append('canvasImage', blob, 'image.png');

        await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        
    }, 'image/png');
});


canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawStroke);
canvas.addEventListener('mouseup', () => isDrawing = false);
