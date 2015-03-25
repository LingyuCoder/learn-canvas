define(['Util'], function(Util) {
    'use strict';

    var isObject = Util.isType('object');

    function Vector(x, y) {
        if (!this instanceof Vector) return new Vector(x, y);
        if (isObject(x)) {
            this.x = x.x;
            this.y = x.y;
            return;
        }
        this.x = x;
        this.y = y;
    }

    Util.extend(Vector.prototype, {
        copy: function() {
            return new Vector(this.x, this.y);
        },

        add: function(vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        },

        magnitude: function() {
            return Math.sqrt(this.squaredMagnitude());
        },

        scale: function(scale) {
            return new Vector(this.x * scale, this.y * scale);
        },

        sub: function(vector) {
            return new Vector(this.x - vector.x, this.y - vector.y);
        },

        negate: function() {
            return new Vector(-this.x, -this.y);
        },

        angle: function(v) {
            return this.dot(v) / (this.magnitude() * v.magnitude());
        },

        project: function(v) {
            return this.dot(v) / v.magnitude();
        },

        squaredMagnitude: function() {
            return this.x * this.x + this.y * this.y;
        },

        normalize: function() {
            var x, y;
            var magnitude = this.magnitude();
            if (magnitude) {
                x = this.x / magnitude;
                y = this.y / magnitude;
            }
            return new Vector(x, y);
        },

        normal: function() {
            return this.perpendicular().normalize();
        },

        rotate: function(angle) {
            var x = this.x;
            var y = this.y;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            return new Vector(x * cos - y * sin, x * sin + y * cos);
        },

        dot: function(vector) {
            return this.x * vector.x + this.y * vector.y;
        },

        edge: function(vector) {
            return this.sub(vector);
        },

        reflect: function(normal) {
            var n = normal.normalize();
            return this.sub(n.scale(2 * this.dot(n)));
        },

        perpendicular: function() {
            return new Vector(this.y, -this.x);
        },

        toString: function() {
            return '(' + this.x.toFixed(3) + ',' + this.y.toFixed(3) + ')';
        }
    });

    return Vector;
});