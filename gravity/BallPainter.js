define(['Util'], function(Util) {
    'use strict';


    function BallPainter() {
        if (!this instanceof BallPainter) return new BallPainter();
    }

    Util.extend(BallPainter.prototype, {
        paint: function(item, ctx) {
            var center = item.center;
            ctx.beginPath();
            ctx.arc(center.x, center.y, item.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = item.color;
            ctx.fill();
        }
    });

    return new BallPainter();
});