define(['Util'], function(Util) {
    return {
        paint: function(item, ctx) {
            var center = item.center;
            ctx.beginPath();
            ctx.arc(center.x, center.y, item.radius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();
        }
    };
});