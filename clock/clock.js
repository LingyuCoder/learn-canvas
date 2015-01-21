/* !node.js*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var RADIUS = 300;
var NUMBER_SPACE = -50;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var FONT_HEIGHT = 30;
var CENTER_RADIUS = 10;
var TICK_LEN = 10;
var LONG_TICK_LEN = 20;
var HAND_LEN = {
    sec: 200,
    min: 180,
    hou: 150
};

function drawCircle() {
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, RADIUS, 0, Math.PI * 2, true);
    ctx.stroke();
}

function drawNumerals() {
    var numerals = [];
    var num = 1;
    var numeralWidth = 0;
    for (; num <= 12; num++) {
        numerals.push(num);
    }
    numerals.forEach(function(numeral) {
        var angle = Math.PI / 6 * (numeral - 3);
        numeralWidth = ctx.measureText(numeral).width;
        ctx.fillText(
            numeral,
            WIDTH / 2 + Math.cos(angle) * (RADIUS + NUMBER_SPACE) - numeralWidth / 2,
            HEIGHT / 2 + Math.sin(angle) * (RADIUS + NUMBER_SPACE) + FONT_HEIGHT / 3);
    });
}

function drawCenter() {
    ctx.beginPath();
    ctx.arc(WIDTH / 2, HEIGHT / 2, CENTER_RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawTick(loc) {
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2;
    var tickLength = loc % 5 === 0 ? LONG_TICK_LEN : TICK_LEN;
    ctx.moveTo(WIDTH / 2 + Math.cos(angle) * RADIUS, HEIGHT / 2 + Math.sin(angle) * RADIUS);
    ctx.lineTo(WIDTH / 2 + Math.cos(angle) * (RADIUS - tickLength), HEIGHT / 2 + Math.sin(angle) * (RADIUS - tickLength));
    ctx.stroke();
}

function drawTicks() {
    for (var i = 60; i--;) {
        drawTick(i);
    }
}

function drawHand(loc, type) {
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2;
    var handRadius = HAND_LEN[type];

    ctx.moveTo(WIDTH / 2, HEIGHT / 2);
    ctx.lineTo(WIDTH / 2 + Math.cos(angle) * handRadius, HEIGHT / 2 + Math.sin(angle) * handRadius);
    ctx.stroke();
}

function drawHands() {
    var date = new Date();
    var hour = date.getHours();

    hour = hour > 12 ? hour - 12 : hour;

    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, 'hou');
    drawHand(date.getMinutes() + date.getSeconds() / 60, 'min');
    drawHand(date.getSeconds(), 'sec');
}

function drawClock() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawCircle();
    drawNumerals();
    drawCenter();
    drawHands();
    drawTicks();
}

ctx.font = FONT_HEIGHT + 'px Arial'
loop = setInterval(drawClock, 1000);