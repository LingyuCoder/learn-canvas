define(['Util'], function(Util) {
    'use strict';

    function Point(x, y) {
        if (!this instanceof Point) return new Point(x, y);
        if (x instanceof Point) {
            this.x = x.x;
            this.y = x.y;
            return;
        }
        this.x = x || 0;
        this.y = y || 0;
    }

    return Point;
});