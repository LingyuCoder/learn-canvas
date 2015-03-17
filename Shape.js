define(['require', 'Util', 'Item', 'Point', 'Vector2', 'Collision'], function(require, Util, Item, Point, Vector2, Collision) {
    'use strict';

    var defaultOptions = {
        points: []
    };

    function Shape(name, options, painter, behaviors) {
        if (!this instanceof Shape) return new Shape(name, options, painter, behaviors);

        Item.call(this, name, options, painter, behaviors);

        Util.extend(this, defaultOptions, options);

        var points = this.points;
        this.points = [];
        for (var i = 0, m = points.length; i < m; i++)
            this.points.push(new Point(points[i]));
    }

    Util.inherits(Shape, Item);

    Util.extend(Shape.prototype, {
        contains: function(point) {
            return Collision.shapeAndPoint(this, point);
        },
        collidesWith: function(item) {
            if (item instanceof Shape)
                return Collision.shapeAndShape(this, item);
            else if (item instanceof require('Circle'))
                return Collision.circleAndShape(item, this);
        },
        getAxes: function() {
            var axes = [];
            var points = this.points;
            var i, m = points.length;
            for (i = points.length; i--;)
                axes.push(new Vector2(points[i]).edge(new Vector2(points[(i + 1) % m])).normal());
            return axes;
        },
        project: function(axis) {
            var scalars = [];
            var points = this.points;
            for (var i = points.length; i--;)
                scalars.push(new Vector2(points[i]).dot(axis));
            return {
                min: Math.min.apply(Math, scalars),
                max: Math.max.apply(Math, scalars)
            };
        }
    });

    return Shape;
});