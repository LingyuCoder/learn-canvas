define(['Util', 'Item', 'BallPainter', 'BallBehavior'], function(Util, Item, Painter, Behavior) {
    'use strict';

    var defaultOptions = {
        radius: 20,
        color: '#ffffff',
        accelerations: []
    };

    function Ball(name, options) {
        if (!this instanceof Ball) return new Ball(options);
        Item.call(this, name, options, Painter, Behavior);
        Util.extend(this, defaultOptions, options);
        this.velocity = options.velocity || new Vector2(0, 0);
        this.position = options.position || new Point(0, 0);
        this.lastUpdateTime = Date.now();
    }

    Util.inherits(Ball, Item);

    return Ball;
});