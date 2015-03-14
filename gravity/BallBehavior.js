define(['Util', 'Vector2'], function(Util, Vector) {
    'use strict';

    return {
        execute: function(item, ctx, frame) {
            var as = item.accelerations;
            var v;
            var a = new Vector(0, 0);

            for (var i = as.length; i--;)
                a = a.add(as[i]);

            var now = Date.now();
            var deltaTime = now - item.lastUpdateTime;

            a = a.scale(deltaTime / 1000);
            v = item.velocity = item.velocity.add(a);

            item.center.x += v.x * deltaTime;
            item.center.y += v.y * deltaTime;

            item.lastUpdateTime = now;
        }
    };
});