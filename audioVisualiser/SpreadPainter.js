(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'SpreadPainter', function() {
    'use strict';

    function SpreadPainter(options) {
        if (!this instanceof(SpreadPainter)) return new SpreadPainter(options);
        this.options = options;
    }

    Util.extend(SpreadPainter.prototype, {
        paint: function(item, ctx) {
            var canvas = ctx.canvas;
            var state = item.state;
            var width = item.width;
            var height = item.height;

            var amp = state.amp;
            var wave = state.wave;
            var colors = this.options.colors;

            var scale = 1.01 + 0.09 * state.amp;
            ctx.setTransform(scale, 0, 0, scale, width / 2, height / 2);
            ctx.drawImage(canvas, -width / 2, -height / 2);
            ctx.fillStyle = Color.rgba(0, 0, 0, 0.05);
            ctx.fillRect(-width / 2, -height / 2, width, height);

            ctx.setTransform(1, 0, 0, 1, width / 2, height / 2);
            ctx.beginPath();
            for (var a, r, i = 0, j = wave.length; i < j; i++) {
                a = i / j * 2 * Math.PI;
                r = amp * 128 * (0.5 + wave[i] / 255);
                ctx.lineTo(r * Math.sin(a), r * Math.cos(a));
            }

            var gradient = Util.gradient(colors[0], amp);
            gradient[3] = amp;

            ctx.fillStyle = Color.rgba(gradient);
            ctx.strokeStyle = Color.rgba(gradient[0] * 1.25, gradient[1] * 1.25, gradient[2] * 1.25, gradient[3]);
            ctx.lineWidth = 4 * amp;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    });
    return SpreadPainter;
});