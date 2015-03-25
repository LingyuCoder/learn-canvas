define(['Util', 'Circle', 'BallPainter', 'BallBehavior'], function(Util, Circle, Painter, Behavior) {
    'use strict';

    var defaultOptions = {
        color: '#ffffff',
        accelerations: []
    };

    function Ball(name, options) {
        if (!this instanceof Ball) return new Ball(options);
        Util.extend(this, defaultOptions, options);
        Circle.call(this, name, options, Painter, Behavior);
        this.velocity = options.velocity || new Vector2(0, 0);
        this.lastUpdateTime = Date.now();
        this.lastPos = this.center.copy();
        this.staticFrame = 0;
    }

    Util.inherits(Ball, Circle);

    return Ball;
});