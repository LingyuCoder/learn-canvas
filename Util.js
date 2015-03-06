define(function() {
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

    function randColor() {
        return '#' + irand(0, 255).toString(16) + irand(0, 255).toString(16) + irand(0, 255).toString(16);
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
        var next = interval == null ? requestNextAnimationFrame.bind(null, loop) : setTimeout.bind(null, loop, interval);
        return loop();
    }

    function currying() {
        var f = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            args.push.apply(args, arguments);
            return f.apply(this, args);
        }
    }

    return {
        hasOwn: hasOwn,
        isType: isType,
        rand: {
            integer: irand,
            float: frand,
            sequence: sequence,
            color: randColor
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
        },
        currying: currying
    };
});