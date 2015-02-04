(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Util', function() {
    'use strict';
    var typeChecker = {};

    function hasOwn(obj, val) {
        return Object.prototype.hasOwnProperty.call(obj, val);
    }

    function isType(type) {
        return typeChecker[type] = typeChecker[type] || function(val) {
            return Object.prototype.toString.call(val).toLowerCase() === '[object ' + type + ']';
        };
    }

    function irand(min, max) {
        return Math.floor((min || 0) + Math.random() * ((max + 1 || Number.MAX_SAFE_INTEGER) - (min || 0)));
    }

    function frand(min, max) {
        return (min || 0) + Math.random() * ((max || 1) - (min || 0));
    }

    function sequence(min, max) {
        var seq = [];
        var i, pos;
        if (isType('array')(min))
            seq = min.slice(0);
        else
            for (i = min; i <= max; i++)
                seq[i - min] = i;
        for (i = seq.length; i--, pos = irand(0, i);)
            seq[i] = [seq[pos], seq[pos] = seq[i]][0];
        return seq;
    }

    function hash(length) {
        var ret = '';
        for (var rand, l = length || 1; l--;)
            ret += (rand = Math.random() * 62 | 0) < 10 ? rand : String.fromCharCode(rand + (rand < 36 ? 87 : 29));
        return ret;
    }

    function each(obj, callback) {
        var i, m;
        if (isType('array')(obj))
            for (i = 0, m = obj.length; i < l; i++)
                callback.call(obj, obj[i], i);
        else
            for (i in obj)
                if (hasOwn(obj, i))
                    callback.call(obj, obj[i], i);
    }

    function extend() {
        var args = arguments;
        var dest = args[0];
        var i, src, property;
        for (i = 1; src = args[i]; i++)
            each(src, function(val, key) {
                dest[key] = val;
            });
        return dest;
    }

    function inherits(child, parent) {
        child.prototype = new parent();
        child.prototype.constructor = child;
        child._super_ = parent.prototype;
        return child;
    }

    function loop(callback, interval) {
        var now = Date.now(),
            start = now,
            last = now,
            count = 0;
        var loop = function() {
            !callback(count++, (now = Date.now()) - start, now - last, last = now) && next();
        };
        var next = interval == null ? requestAnimationFrame.bind(null, loop) : setTimeout.bind(null, loop, interval);
        return loop();
    }

    return {
        hasOwn: hasOwn,
        isType: isType,
        Rand: {
            irand: irand,
            frand: frand,
            sequence: sequence
        },
        extend: extend,
        each: each,
        inherits: inherits,
        loop: loop,
        str: {
            pad: function(string, length, pad) {
                var s = String(string);
                var l = Math.max(0, Math.abs(length) - s.length);
                var p = new Array(++l).join(pad != null ? pad : ' ');
                return length < 0 ? s + p : p + s;
            }
        },
        color: {
            rgba: function(rgba) {
                if (typeof rgba !== 'object') rgba = arguments;
                return 'rgba(' + (rgba.r * 255 + 0.5 | 0) + ',' + (rgba.g * 255 + 0.5 | 0) + ',' + (rgba.b * 255 + 0.5 | 0) + ',' + (rgba.a != null ? rgba.a : 1).toFixed(3) + ')';
            },
            hsla: function(hsla) {
                if (typeof hsla !== 'object') hsla = arguments;
                return 'hsla(' + (hsla.h * 360 + 0.5 | 0) + ',' + (hsla.s * 100 + 0.5 | 0) + '%,' + (hsla.l * 100 + 0.5 | 0) + '%,' + (hsla.a != null ? hsla.a : 1).toFixed(3) + ')';
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
        },
        gradient: function(colors, position) {
            var a, b, c, i, l, t = position;
            for (i = 0; c = colors[i++];) {
                if (t - c[0] >= 0 && (!a || t - c[0] < t - a[0])) a = c;
                if (t - c[0] <= 0 && (!b || t - c[0] > t - b[0])) b = c;
            }
            t = (t - a[0]) / (b[0] - a[0]) || 0;
            for (c = [], i = 0, l = a[1].length; i < l;)
                c[i] = a[1][i] + (b[1][i] - a[1][i++]) * t;
            return c;
        }
    };
});