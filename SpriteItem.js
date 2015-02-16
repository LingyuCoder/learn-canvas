(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'SpriteItem', function() {
    'use strict';

    function SpriteItem(name, options, behaviors) {
        if (!this instanceof SpriteItem) return SpriteItem(name, options, behaviors);

        Item.call(this, name, options, new SpritePainter(options), [new SpriteBehavior(options)].concat(behaviors || []));

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