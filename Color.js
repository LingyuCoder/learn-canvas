(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Color', function() {
    'use strict';

    var isType = Util.isType;
    var isArray = isType('array');
    var isObject = isType('object');

    function array2color(array) {
        var color = {};
        color.r = array[0];
        color.g = array[1];
        color.b = array[2];
        color.a = array[3] || 1;
        return color;
    }

    return {
        rgba: function(rgba) {
            var color = {};
            if (!isObject(rgba)) {
                if (!isArray(rgba)) rgba = arguments;
                color = array2color(rgba);
            } else color = rgba;
            return 'rgba(' + (color.r * 255 + 0.5 | 0) + ',' + (color.g * 255 + 0.5 | 0) + ',' + (color.b * 255 + 0.5 | 0) + ',' + (color.a != null ? color.a : 1).toFixed(3) + ')';
        },
        hsla: function(hsla) {
            var color = {};
            if (!isObject(hsla)) {
                if (!isArray(hsla)) hsla = arguments;
                color = array2color(rgba);
            } else color = hsla;
            return 'hsla(' + (color.h * 360 + 0.5 | 0) + ',' + (color.s * 100 + 0.5 | 0) + '%,' + (color.l * 100 + 0.5 | 0) + '%,' + (color.a != null ? color.a : 1).toFixed(3) + ')';
        },
        rgb2hex: function(rgb) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        hex2rgb: function(hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
        hsl2rgb: function(hsl) {
            var r, g, b;
            if (hsl.s == 0) {
                rgb.r = rgb.g = rgb.b = hsl.l;
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }

                var q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
                var p = 2 * hsl.l - q;
                r = hue2rgb(p, q, hsl.h + 1 / 3);
                g = hue2rgb(p, q, hsl.h);
                b = hue2rgb(p, q, hsl.h - 1 / 3);
            }
            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        },
        rgb2hsl: function(rgb) {
            var r = rgb.r;
            var g = rgb.g;
            var b = rgb.b;
            var max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return {
                h: h,
                s: s,
                l: l
            };
        }
    };
});