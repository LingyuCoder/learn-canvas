define(['Util'], function(Util) {
    'use strict';

    var isObject = Util.isType('object');

    function Point(x, y) {
        if (!this instanceof Point) return new Point(x, y);
        if (isObject(x)) {
            this.x = x.x;
            this.y = x.y;
            return;
        }
        this.x = x;
        this.y = y;
    }

    Util.extend(Point.prototype, function() {
        return {
            distance: function(point) {
                return Math.sqrt(Math.pow(this.y - point.y, 2) + Math.pow(this.x - point.x, 2));
            }
        }
    }());

    return Point;
});