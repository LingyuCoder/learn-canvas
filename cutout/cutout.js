var ctx = document.getElementById('canvas').getContext('2d');

function drawTwoArcs() {
    ctx.beginPath();
    ctx.arc(300, 190, 150, 0, Math.PI * 2, false);
    ctx.arc(300, 190, 100, 0, Math.PI * 2, true);

    ctx.fill();
    ctx.shadowColor = undefined;
    ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowOffsetX = ctx.shadowOffsetY = 12;
    ctx.shadowBlur = 15;
    drawTwoArcs();
    
    ctx.restore();
}

ctx.strokeStyle = ctx.fillStyle = "rgba(100, 140, 230, 0.5)";

draw();