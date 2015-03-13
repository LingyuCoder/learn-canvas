define(['Util', 'Point'], function(Util, Point) {
    'use strict';

    return {
        circleAndCircle: function(circle1, circle2) {
            return circle1.center.distance(circle2.center) <= circle1.radius + circle2.radius;
        },
        circleAndPoint: function(circle, point) {
            return circle.center.distance(point) <= circle.radius;
        },
        circleAndSegment: function(circle, segment) {

        },
        circleAndShape: function(circle, shape) {

        },
        shapeAndShape: function(shape1, shape2) {

        },
        shapeAndPoint: function(shape, point) {

        },
        shapeAndSegment: function(shape, segment) {

        }
    };
});