define(['require', 'Util', 'Item', 'Point', 'Vector2', 'Collision'], function(require, Util, Item, Point, Vector2, Collision) {
    'use strict';

    var defaultOptions = {
        radius: 0,
        center: {
            x: 0,
            y: 0
        }
    };


    function Circle(name, options, painter, behaviors) {
        if (!this instanceof Circle) return new Circle(name, options, painter, behaviors);

        Item.call(this, name, options, painter, behaviors);

        Util.extend(this, defaultOptions, options);

        this.center = new Point(this.center);
        this.origin = this.center;
    }

    Util.inherits(Circle, Item);

    Util.extend(Circle.prototype, {
        contains: function(point) {
            return Collision.circleAndPoint(this, point);
        },
        collidesWith: function(item) {
            if (item instanceof Circle)
                return Collision.circleAndCircle(this, item);
            else if (item instanceof Point)
                return Collision.circleAndPoint(this, item);
            else if (item instanceof require('Shape'))
                return Collision.circleAndShape(this, item);
            else if (item instanceof require('Segment'))
                return Collision.circleAndSegment(this, item);
        },
        project: function(axis) {
            var dot = new Vector2(this.center).dot(axis);
            var scalars = [dot, dot + this.radius, dot - this.radius];

            return {
                min: Math.min.apply(Math, scalars),
                max: Math.max.apply(Math, scalars)
            };
        },
        getAxes: function() {
            return undefined;
        }
    });

    return Circle;
});