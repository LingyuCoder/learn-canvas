define(['Util'], function(Util) {
    'use strict';

    function Vector(x, y) {
        if (!this instanceof Vector) return new Vector(x, y);
        if (x instanceof Vector) {
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

        squaredMagnitude: function() {
            return this.x * this.x + this.y * this.y;
        },

        normalize: function() {
            var magnitude = this.magnitude();
            if (magnitude) {
                this.x /= magnitude;
                this.y /= magnitude;
            }
            return this;
        },

        rotate: function(angle) {
            var x = this.x;
            var y = this.y;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        },

        dot: function(vector) {
            return this.x * vector.x + this.y * vector.y;
        },

        toString: function() {
            return '(' + this.x.toFixed(3) + ',' + this.y.toFixed(3) + ')';
        }
    });

    return Vector;
});