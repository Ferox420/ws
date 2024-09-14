const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const sectors = 16;
let isSpinning = false;
let rotation = 0;
const sectorAngle = 360 / sectors;

function drawWheel() {
    for (let i = 0; i < sectors; i++) {
        const angle = i * sectorAngle * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, angle, angle + sectorAngle * Math.PI / 180);
        ctx.fillStyle = i % 2 === 0 ? '#FFDD59' : '#FFC300';
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(angle + sectorAngle / 2 * Math.PI / 180);
        ctx.fillStyle = "#000";
        ctx.font = "bold 12px Arial";
        ctx.fillText(i + 1, 90, 0);
        ctx.restore();
    }
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    const spinTime = Math.random() * 2000 + 2000;
    const spinAngle = Math.random() * 2000 + 2000;
    const startRotation = rotation;
    const endRotation = startRotation + spinAngle;

    const start = performance.now();

    function animateWheel(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / spinTime, 1);
        rotation = startRotation + progress * spinAngle;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-150, -150);
        drawWheel();
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animateWheel);
        } else {
            isSpinning = false;
            const resultSector = Math.floor(((rotation % 360) / sectorAngle) % sectors);
            alert("Сектор: " + (sectors - resultSector));
        }
    }

    requestAnimationFrame(animateWheel);
}

drawWheel();

document.getElementById('spinButton').addEventListener('click', spinWheel);
