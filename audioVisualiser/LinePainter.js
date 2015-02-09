(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'LinePainter', function() {
    'use strict';

    function LinePainter(options) {
        if (!this instanceof(LinePainter)) return new LinePainter(options);
        this.options = options;
    }

    Util.extend(LinePainter.prototype, {
        paint: function(item, ctx) {
            var canvas = ctx.canvas;
            var state = item.state;
            var width = item.width;
            var height = item.height;

            var amp = state.amp;
            var wave = state.wave;
            var colors = this.options.colors;

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, height);
            ctx.beginPath();
            for (var i = 0, j = wave.length; i < j; i++) {
                ctx.lineTo(i * width / j, wave[i] / 128 * height / 2);
            }

            var gradient = Util.gradient(colors[0], amp);
            gradient[3] = amp;

            ctx.strokeStyle = Color.rgba(gradient[0] * 1.25, gradient[1] * 1.25, gradient[2] * 1.25, 1);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    });
    return LinePainter;
});