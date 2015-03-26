define(['Util'], function(Util) {
    'use strict';

    var isArray = Util.isType('array');
    var PI = Math.PI;

    function deg2rad(d) {
        return d / 180 * Math.PI;
    }

    function Transform(a, b, c, d, e, f) {
        if (!this instanceof Transform) return new Transform(a, b, c, d, e, f);

        this.matrix = [
            [a || 1, c || 0, e || 0],
            [b || 0, d || 1, f || 0],
            [0, 0, 1]
        ];
    }

    Util.extend(Transform.prototype, {
        toArray: function() {
            var m = this.matrix;
            return [m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]];
        },
        transform: function(a, b, c, d, e, f) {
            if (arguments.length === 0) return this.matrix;
            if (isArray(a)) {
                b = a[1];
                c = a[2];
                d = a[3];
                e = a[4];
                f = a[5];
                a = a[0];
            }
            return this.multiple(new Transform(a, b, c, d, e, f));
        },
        multiple: function(transform) {
            var m1 = this.matrix;
            var m2 = transform.matrix;
            this.matrix = [
                [m2[0][0] * m1[0][0] + m2[0][1] * m1[1][0],
                    m2[0][0] * m1[0][1] + m2[0][1] * m1[1][1],
                    m2[0][0] * m1[0][2] + m2[0][1] * m1[1][2] + m2[0][2]
                ],
                [m2[1][0] * m1[0][0] + m2[1][1] * m1[1][0],
                    m2[1][0] * m1[0][1] + m2[1][1] * m1[1][1],
                    m2[1][0] * m1[0][2] + m2[1][1] * m1[1][2] + m2[1][2]
                ],
                [0, 0, 1]
            ];
            return this;
        },
        rotate: function(angle) {
            var angle = deg2rad(angle);
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            return this.transform(cos, sin, -sin, cos, 0, 0);
        },
        translate: function(x, y) {
            return this.transform(1, 0, 0, 1, x, y);
        },
        scale: function(x, y) {
            return this.transform(x, 0, 0, y, 0, 0);
        },
        skew: function(x, y) {
            x = deg2rad(x);
            y = deg2rad(y);
            return this.transform(1, Math.tan(x), Math.tan(y), 1, 0, 0);
        },
        flipX: function() {
            return this.scale(-1, 1);
        },
        flipY: function() {
            return this.scale(1, -1);
        },
        reset: function() {
            this.matrix = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
            return this;
        }
    });

    Util.extend(Transform, {
        DEFAULT: new Transform(1, 0, 0, 1, 0, 0)
    });

    return Transform;
});