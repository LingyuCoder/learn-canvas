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

        this.origin = this.getGravity();
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
        },
        getGravity: function() {
            var area = 0;
            var p = this.points;
            var center = new Point(0, 0);
            for (var i = 0, m = p.length, nxt; i < m; i++) {
                nxt = (i + 1) % m;
                area += (p[i].x * p[nxt].y - p[nxt].x * p[i].y) / 2;
                center.x += (p[i].x * p[nxt].y - p[nxt].x * p[i].y) * (p[i].x + p[nxt].x);
                center.y += (p[i].x * p[nxt].y - p[nxt].x * p[i].y) * (p[i].y + p[nxt].y);
            }
            center.x /= 6 * area;
            center.y /= 6 * area;
            return center;
        }
    });

    return Shape;
});