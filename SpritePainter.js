(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'SpritePainter', function() {
    'use strict';

    function SpritePainter(options) {
        if (!this instanceof SpritePainter) return SpritePainter(options);
    }

    Util.extend(SpritePainter.prototype, {
        paint: function(item, ctx, frame, time) {
            var animation = item.animations[item.currentAnime];
            var image = animation.image;
            var fWidth = animation.width || item.width;
            var fHeight = animation.height || item.height;
            var col = image.width / fWidth;
            var index = animation.frames[item.currentFrame];
            ctx.drawImage(image, (index % col) * fWidth, Math.floor(index / col) * fHeight, fWidth, fHeight, item.left, item.top, fWidth, fHeight);
        }
    });

    return SpritePainter;
});