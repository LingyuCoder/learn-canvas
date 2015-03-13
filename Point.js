define(['Util'], function(Util) {
    'use strict';

    function square(x) {
        return x * x;
    }

    function Point(x, y) {
        if (!this instanceof Point) return new Point(x, y);
        this.x = x;
        this.y = y;
    }

    Util.extend(Point.prototype, {
        distance: function(point) {
            return Math.sqrt(square(this.y - point.y) - square(this.x - point.x));
        }
    });

    return Point;
});