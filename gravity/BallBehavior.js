define(['Util', 'Vector2'], function(Util, Vector) {
    'use strict';
    var isArray = Util.isType('array');

    function BallBehavior() {
        if (!this instanceof BallBehavior) return new BallBehavior();
    }

    Util.extend(BallBehavior.prototype, {
        execute: function(item, ctx, frame) {
            var as = item.accelerations;
            var v = item.velocity;
            var a = new Vector(0, 0);

            for (var i = as.length; i--;)
                a.add(as[i]);

            var now = Date.now();
            var deltaTime = now - item.lastUpdateTime;

            a.scale(deltaTime / 1000);
            v.add(a);

            item.position.x += v.x * deltaTime;
            item.position.y += v.y * deltaTime;

            item.lastUpdateTime = now;
        }
    });

    return new BallBehavior();
});