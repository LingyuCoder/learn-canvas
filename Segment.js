define(['require', 'Util', 'Item', 'Point', 'Vector2', 'Collision'], function(require, Util, Item, Point, Vector2, Collision) {
    'use strict';

    var defaultOptions = {
        points: []
    };

    function Segment(name, options, painter, behaviors) {
        if (!this instanceof Segment) return new Segment(name, options, painter, behaviors);

        Item.call(this, name, options, painter, behaviors);

        Util.extend(this, defaultOptions, options);

        this.points = [new Point(this.points[0]), new Point(this.points[1])];
    }

    Util.inherits(Segment, Item);

    Util.extend(Segment.prototype, {
        collidesWith: function(item) {
            if (item instanceof Segment)
                return Collision.segmentAndSegment(this, item);
            else if (item instanceof require('Circle'))
                return Collision.circleAndSegment(item, this);
        },
        getAxes: function() {
            return [new Vector2(this.points[0]).edge(new Vector2(points[1])).normal()];
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

    return Segment;
});