(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'SpriteBehavior', function() {
    'use strict';

    function SpriteBehavior(options) {
        if (!this instanceof SpriteBehavior) return SpriteBehavior(options);
        this.count = 0;
    }

    Util.extend(SpriteBehavior.prototype, {
        execute: function(item, ctx, frame, time) {
            var animation = item.animations[item.currentAnime];
            var frameDuration = animation.frameDuration;
            if ((this.count + 1) % frameDuration === 0) {
                if (item.isRunning) {
                    item.currentFrame = (item.currentFrame + 1) % item.animations[item.currentAnime].frames.length;
                    item.isRunning = !(item.currentFrame === 0 && !item.isLoop);
                }
                this.count = 0;
            }
            this.count++;
        }
    });

    return SpriteBehavior;
});