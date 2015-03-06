define(['Util'], function(Util) {
    'use strict';


    function BallPainter() {
        if (!this instanceof BallPainter) return new BallPainter();
    }

    Util.extend(BallPainter.prototype, {
        paint: function(item, ctx) {
            var pos = item.position;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, item.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = item.color;
            ctx.fill();
        }
    });

    return new BallPainter();
});