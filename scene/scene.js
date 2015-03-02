window.addEventListener('load', function() {
    'use strict';

    var $ = document.querySelector.bind(document);
    var canvas = $('#canvas');
    var ctx = canvas.getContext("2d");

    ctx.font = '30px Arial';

    var scene = new Scene('clock', {
        width: canvas.width,
        height: canvas.height,
    });

    var circle = new Item('circle', {
        radius: 300
    }, {
        paint: function(item, ctx) {
            ctx.beginPath();
            ctx.arc(item.scene.width / 2, item.scene.height / 2, item.radius, 0, Math.PI * 2, true);
            ctx.stroke();
        }
    });

    var numerals = new Item('numerals', {
        radius: 300,
        numberSpace: -50,
        fontHeight: 30
    }, {
        paint: function(item, ctx) {
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
                    item.scene.width / 2 + Math.cos(angle) * (item.radius + item.numberSpace) - numeralWidth / 2,
                    item.scene.height / 2 + Math.sin(angle) * (item.radius + item.numberSpace) + item.fontHeight / 3);
            });
        }
    });

    var center = new Item('center', {
        radius: 10
    }, {
        paint: function(item, ctx) {
            ctx.beginPath();
            ctx.arc(item.scene.width / 2, item.scene.height / 2, item.radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    });

    var ticks = new Item('ticks', {
        radius: 300,
        longTickLen: 20,
        tickLen: 10
    }, {
        paint: function(item, ctx) {
            var scene = item.scene;
            for (var i = 60; i--;) {
                var angle = (Math.PI * 2) * (i / 60) - Math.PI / 2;
                var tickLength = i % 5 === 0 ? item.longTickLen : item.tickLen;
                ctx.moveTo(scene.width / 2 + Math.cos(angle) * item.radius, scene.height / 2 + Math.sin(angle) * item.radius);
                ctx.lineTo(scene.width / 2 + Math.cos(angle) * (item.radius - tickLength), scene.height / 2 + Math.sin(angle) * (item.radius - tickLength));
                ctx.stroke();
            }
        }
    });

    var hands = new Item('hands', {
        handLen: {
            sec: 200,
            min: 180,
            hou: 150
        },
        time: new Date()
    }, {
        paint: function(item, ctx) {
            var scene = item.scene;
            var date = item.time;
            var hour = date.getHours();

            hour = hour > 12 ? hour - 12 : hour;

            function drawHand(loc, type) {
                var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2;
                var handRadius = item.handLen[type];

                ctx.moveTo(scene.width / 2, scene.height / 2);
                ctx.lineTo(scene.width / 2 + Math.cos(angle) * handRadius, scene.height / 2 + Math.sin(angle) * handRadius);
                ctx.stroke();
            }

            drawHand(hour * 5 + (date.getMinutes() / 60) * 5, 'hou');
            drawHand(date.getMinutes() + date.getSeconds() / 60, 'min');
            drawHand(date.getSeconds(), 'sec');
        }
    }, [{
        execute: function(item, ctx) {
            item.time = new Date();
        }
    }]);

    scene.add([circle, numerals, ticks, center, hands]);

    Util.loop(function(f, t, dt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scene.update(ctx).paint(ctx);
    });

}, false);