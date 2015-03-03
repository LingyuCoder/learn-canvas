define(['Util', 'Item'], function(Util, Item) {
    'use strict';

    var defaultOptions = {
        currentFrameIndex: 0,
        currentAnime: '',
        animations: {},
        frames: [],
        loop: false,
        pause: true
    };

    var SpritePainter = {
        paint: function(sprite, ctx) {
            var frames = sprite.frames;
            var anime = sprite.animations[sprite.currentAnime];
            var frame = frames[anime.frames[sprite.currentFrameIndex]];
            ctx.drawImage(frame[0], frame[1], frame[2], frame[3], frame[4], sprite.left, sprite.top, anime.width, anime.height);
        }
    };

    var SpriteBehavior = {
        execute: function(sprite, ctx, frame) {
            var animation = sprite.animations[sprite.currentAnime];
            var duration = animation.duration;
            if ((frame + 1) % duration === 0) {
                if (!sprite.pause) {
                    sprite.currentFrameIndex = (sprite.currentFrameIndex + 1) % sprite.animations[sprite.currentAnime].frames.length;
                    sprite.pause = sprite.currentFrameIndex === 0 && !sprite.loop;
                }
            }
        }
    };

    function SpriteItem(name, options, behaviors) {
        if (!this instanceof SpriteItem) return SpriteItem(name, options, behaviors);
        Item.call(this, name, options, SpritePainter, [SpriteBehavior].concat(behaviors || []));
        Util.extend(this, defaultOptions, options);
    }

    Util.inherits(SpriteItem, Item);

    return SpriteItem;
});
