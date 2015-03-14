define(['Util', 'Point', 'Vector2'], function(Util, Point, Vector2) {
    'use strict';

    function isOverlap(project1, project2) {
        return project1.max > project2.min && project2.max > project1.min;
    }

    function separationOnAxes(axes, shape1, shape2) {
        for (var i = axes.length; i--;)
            if (!isOverlap(shape1.project(axes[i]), shape2.project(axes[i])))
                return true;
        return false;
    }

    function getShapeCloestPointToCircle(shape, circle) {
        var points = shape.points;
        var center = circle.center;
        var cloestPoint = null;
        var minDis = Number.MAX_VALUE;
        var i, dis;
        for (i = points.length; i--;)
            if ((dis = points[i].distance(center)) < minDis) {
                cloestPoint = points[i];
                minDis = dis;
            }
        return cloestPoint;
    }

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
            var axes = shape.getAxes();
            var axis = new Vector2(circle.center)
                .sub(new Vector2(getShapeCloestPointToCircle(shape, circle)))
                .normalize();
            axes.push(axis);
            return !separationOnAxes(axes, circle);
        },
        shapeAndShape: function(shape1, shape2) {
            return !separationOnAxes(shape1.getAxes().concat(shape2.getAxes()), shape1, shape2);
        },
        shapeAndPoint: function(shape, point) {

        },
        shapeAndSegment: function(shape, segment) {

        }
    };
});