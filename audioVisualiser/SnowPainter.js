define(['Util'], function(Util) {
    'use strict';

    function SnowPainter(options) {
        if (!this instanceof(SnowPainter)) return new SnowPainter(options);
        this.options = options;
        this.flakes = [];
        this.prevVal = [];
    }

    Util.extend(SnowPainter.prototype, {
        paint: function(item, ctx) {
            var state = item.state;
            var freq = state.freq;
            var width = item.width;
            var height = item.height;
            var prevVal = this.prevVal;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#65edff';

            var x = 0;
            for (var i = 0; i < 200; i++) {
                var value = freq[i];
                if (Math.abs(value - prevVal[i]) > 50) {
                    this.newFlake(x, 120 - value / 4);
                }
                prevVal[i] = value;
                ctx.fillRect(x, 140 - value / 2, 3, value / 4);
                x += width / 200;
            }
            this.snow(item, ctx);
        },
        snow: function(item, ctx) {
            var imgData = ctx.getImageData(0, 0, item.width, item.height);
            var data = imgData.data;
            var flakes = this.flakes;
            var fData;
            for (var i = 0; i < flakes.length; i++) {
                var flake = flakes[i];

                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;

                ctx.fillStyle = '#c6f8ff';
                flake.y += flake.velY;
                flake.x += flake.velX;

                if (flake.y >= item.height || flake.y <= 0 || flake.x >= item.width || flake.x <= 0) {
                    flakes.splice(i, 1);
                }

                if (flake.x < item.width && flake.x > 0 && flake.y > 0 && flake.y < item.height) {
                    for (var w = 0; w < flake.size; w++) {
                        for (var h = 0; h < flake.size; h++) {
                            if (flake.x + w < item.width && flake.x + w > 0 && flake.y + h > 0 && flake.y + h < item.height) {
                                fData = (~~(flake.x + w) + (~~(flake.y + h) * item.width)) * 4;
                                data[fData] = 198;
                                data[fData + 1] = 248;
                                data[fData + 2] = 255;
                                data[fData + 3] = 255;
                            }
                        }
                    }
                }
            }
            ctx.putImageData(imgData, 0, 0);
        },
        newFlake: function(x, y) {
            var size = (Math.random() * 1) + 0.5,
                speed = (Math.random() * 1) + 0.5;

            this.flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30,
                step: 0
            });
        }
    });
    return SnowPainter;
});
