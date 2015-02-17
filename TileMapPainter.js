(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'TileMapPainter', function() {
    'use strict';

    function TileMapPainter() {
        if (!this instanceof TileMapPainter) return TileMapPainter();
    }

    Util.extend(TileMapPainter.prototype, {
        paint: function(item, ctx, frame, time) {
            ctx.drawImage(item.canvas, item.left, item.top);
        }
    });

    return TileMapPainter;
});