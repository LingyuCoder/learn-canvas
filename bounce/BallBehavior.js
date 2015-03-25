define(['Util', 'Vector2'], function(Util, Vector) {
    'use strict';

    function equal(a, b) {
        return Math.abs(a - b) < 1;
    }

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
            v = item.velocity = item.velocity.add(a).scale(.99);

            item.center.x += v.x * deltaTime;
            item.center.y += v.y * deltaTime;

            item.lastUpdateTime = now;

            if (equal(item.lastPos.y, item.center.y) && equal(item.lastPos.x, item.center.x)) {
                item.staticFrame++;
                if (item.staticFrame === 10) {
                    item.velocity.x = 0;
                    item.velocity.y = 0;
                    item.accelerations = [];
                    item.isStatic = true;
                }
            } else
                item.staticFrame = 0;

            item.lastPos = item.center.copy();
        }
    };
});