(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'BarPainter', function() {
    'use strict';

    function BarPainter(options) {
        if (!this instanceof(BarPainter)) return new BarPainter(options);
        this.options = options;
    }

    Util.extend(BarPainter.prototype, {
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

            var gradient = Util.gradient(colors[0], amp);
            gradient[3] = amp;

            ctx.fillStyle = Color.rgba(gradient);
            ctx.strokeStyle = Color.rgba(gradient[0] * 1.25, gradient[1] * 1.25, gradient[2] * 1.25, gradient[3]);

            for (var h, i = 0, j = wave.length; i < j; i++) {
                h = wave[i] / 128 * height / 2 - height / 2;
                ctx.fillRect(i * width / j, height / 2 - h, width / j, h);
            }
        }
    });
    return BarPainter;
});