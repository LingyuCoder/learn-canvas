define(['Util', 'Circle', 'BallPainter', 'BallBehavior'], function(Util, Circle, Painter, Behavior) {
    'use strict';

    var defaultOptions = {
        color: '#ffffff',
        accelerations: []
    };

    function Ball(name, options) {
        if (!this instanceof Ball) return new Ball(options);
        Circle.call(this, name, options, Painter, Behavior);

        Util.extend(this, defaultOptions, options);
        this.velocity = options.velocity || new Vector2(0, 0);
        this.lastUpdateTime = Date.now();
    }

    Util.inherits(Ball, Circle);

    return Ball;
});