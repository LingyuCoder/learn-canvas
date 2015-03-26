define(['Util'], function(Util) {
    return {
        paint: function(item, ctx) {
            var points = item.points;
            if (points.length === 0) return;

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.fillStyle = item.color;
            ctx.fill();
            ctx.closePath();
        }
    };
});