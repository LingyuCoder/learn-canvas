define(['require', 'Point', 'Vector2', 'Util'], function(require, Point, Vector2, Util) {
    'use strict';

    var ACCURACY = 1e-8;

    function isOverlap(project1, project2) {
        return project1.max > project2.min && project2.max > project1.min;
    }

    function getOverlap(project1, project2) {
        if (!isOverlap(project1, project2)) return 0;
        return project1.max > project2.max ?
            project2.max - project1.min : project1.max - project2.min;
    }

    function collisionOnAxes(axes, shape1, shape2) {
        for (var i = axes.length; i--;)
            if (!isOverlap(shape1.project(axes[i]), shape2.project(axes[i])))
                return false;
        return true;
    }

    function minimumTranslationVector(axes, shape1, shape2) {
        var minOverlap = Number.MAX_VALUE;
        var minAxis = null;
        for (var i = axes.length, overlap; i--;) {
            if ((overlap = getOverlap(shape1.project(axes[i]), shape2.project(axes[i]))) === 0)
                return {
                    axis: null,
                    overlap: 0
                };
            else if (overlap < minOverlap) {
                minAxis = axes[i];
                minOverlap = overlap;
            }
        }
        return {
            axis: minAxis.normalize(),
            overlap: minOverlap
        };
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

    function multiply(x1, y1, x2, y2) {
        return x1 * y2 - y1 * x2;
    }

    return {
        circleAndCircle: function(circle1, circle2) {
            var c1 = circle1.center;
            var c2 = circle2.center;
            var dis = c1.distance(c2);
            var overlap;
            if ((overlap = dis - circle1.radius - circle2.radius) < 0)
                return {
                    axis: new Vector2(c1.x - c2.x, c1.y - c2.y).normalize(),
                    overlap: -overlap
                };
            else return {
                axis: null,
                overlap: 0
            };
        },
        circleAndPoint: function(circle, point) {
            return circle.center.distance(point) < circle.radius;
        },
        circleAndSegment: function(circle, segment) {
            var center = circle.center;
            var p1 = segment.points[0];
            var p2 = segment.points[1];
            var v1 = new Vector2(center.x - p1.x, center.y - p1.y);
            var v2 = new Vector2(p2.x - p1.x, p2.y - p1.y);
            var u = v1.project(v2);
            var v3 = v2.normalize().scale(u);
            var closest = null;
            var Point = require('Point');
            if (u <= 0) closest = p1;
            else if (u >= v2.magnitude()) closest = p2;
            else closest = new Point(p1.x + v3.x, p1.y + v3.y);
            var overlap = circle.radius - closest.distance(center);
            if (overlap <= 0)
                return {
                    axis: null,
                    overlap: 0
                };
            else
                return {
                    axis: v1.sub(v3),
                    overlap: overlap
                };
        },
        circleAndShape: function(circle, shape) {
            var axes = shape.getAxes();
            var axis = new Vector2(circle.center)
                .sub(new Vector2(getShapeCloestPointToCircle(shape, circle)))
                .normalize();
            axes.push(axis);
            return minimumTranslationVector(axes, shape, circle);
        },
        shapeAndShape: function(shape1, shape2) {
            return minimumTranslationVector(shape1.getAxes().concat(shape2.getAxes()), shape1, shape2);
        },
        shapeAndPoint: function(shape, point) {
            var points = shape.points;
            var angle = 0;
            for (var len = points.length, i = len; i--;)
                angle += Math.acos(new Vector2({
                    x: points[i].x - point.x,
                    y: points[i].y - point.y
                }).angle(new Vector2({
                    x: points[(i + 1) % len].x - point.x,
                    y: points[(i + 1) % len].y - point.y
                })));
            return Math.abs(angle - 2 * Math.PI) <= ACCURACY;
        },
        shapeAndSegment: function(shape, segment) {

        },
        segmentAndSegment: function(s1, s2) {
            var p1 = s1.points[0];
            var p2 = s1.points[1];
            var p3 = s2.points[0];
            var p4 = s2.points[1];

            if (!(Math.max(p1.x, p2.x) >= Math.min(p3.x, p4.x) &&
                    Math.max(p3.x, p4.x) >= Math.min(p1.x, p2.x) &&
                    Math.max(p1.y, p2.y) >= Math.min(p3.y, p4.y) &&
                    Math.max(p3.y, p4.y) >= Math.min(p1.y, p2.y)))
                return false;
            if (multiply(p1.x - p3.x, p1.y - p3.y, p4.x - p3.x, p4.y - p3.y) *
                multiply(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y) < 0)
                return false;
            if (multiply(p3.x - p1.x, p3.y - p1.y, p2.x - p1.x, p2.y - p1.y) *
                multiply(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y) < 0)
                return false;
            return true;
        }
    };
});