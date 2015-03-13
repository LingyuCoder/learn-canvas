define(['Util', 'Item', 'Point'], function(Util, Item, Point) {
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

        this.center = new Point(this.center.x, this.center.y);
    }

    Util.inherits(Circle, Item);

    Util.extend(Circle.prototype, {
        collidesWith: function(item) {
            if (item instanceof Circle)
                return this._collidesWithCircle(item);
            else if (item instanceof Shape)
                return this._collidesWithShape(item);
            else if (item instanceof Point)
                return this._coolidesWithPoint(item);
            else if (item instanceof Segment)
                return this._coolidesWithSegment(item);
        },
        _collidesWithCircle: function(circle) {
            
        },
        _collidesWithShape: function(shape) {

        },
        _coolidesWithPoint: function(point) {

        },
        _coolidesWithSegment: function(item) {

        }
    });

    return Circle;
});