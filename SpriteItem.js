(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'SpriteItem', function() {
    'use strict';

    var SpritePainter = {
        paint: function(sprite, ctx) {
            var animation = sprite.animations[sprite.currentAnime];
            var image = animation.image;
            var fWidth = animation.width || sprite.width;
            var fHeight = animation.height || sprite.height;
            var col = image.width / fWidth;
            var index = animation.frames[sprite.currentFrame];
            ctx.drawImage(image, (index % col) * fWidth, Math.floor(index / col) * fHeight, fWidth, fHeight, sprite.left, sprite.top, fWidth, fHeight);
        }
    };

    var SpriteBehavior = {
        execute: function(sprite, ctx, frame) {
            var animation = sprite.animations[sprite.currentAnime];
            var frameDuration = animation.frameDuration;
            if ((frame + 1) % frameDuration === 0) {
                if (sprite.isRunning) {
                    sprite.currentFrame = (sprite.currentFrame + 1) % sprite.animations[sprite.currentAnime].frames.length;
                    sprite.isRunning = !(sprite.currentFrame === 0 && !sprite.isLoop);
                }
            }
        }
    };

    function SpriteItem(name, options, behaviors) {
        if (!this instanceof SpriteItem) return SpriteItem(name, options, behaviors);

        Item.call(this, name, options, SpritePainter, [SpriteBehavior].concat(behaviors || []));

        this.currentFrame = options.startFrame || 0;
        this.currentAnime = options.startAnime || 0;
        this.isRunning = options.isRunning || false;
        this.animations = options.animations || {};
        this.frameDuration = options.frameDuration || 1;
        this.isLoop = options.isLoop || true;
    }

    Util.inherits(SpriteItem, Item);

    return SpriteItem;
});