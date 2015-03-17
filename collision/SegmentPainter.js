define(['Util'], function(Util) {
    return {
        paint: function(item, ctx) {
            var points = item.points;
            if (points.length === 0) return;

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.stroke();
            ctx.closePath();
        }
    };
});