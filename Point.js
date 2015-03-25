define(['Util', 'Collision'], function(Util, Collision) {
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
            copy: function() {
                return new Point(this);
            },
            distance: function(point) {
                return Math.sqrt(Math.pow(this.y - point.y, 2) + Math.pow(this.x - point.x, 2));
            },
            inCircle: function(circle) {
                return Collision.circleAndPoint(circle, this);
            },
            inShape: function(shape) {
                return Collision.shapeAndPoint(shape, this);
            },
            equal: function(point) {
                return this.x === point.x && this.y === point.y;
            }
        }
    }());

    return Point;
});