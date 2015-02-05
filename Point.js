(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Point', function() {
    'use strict';

    function Point(x, y) {
        if (!this instanceof Point) return new Point(x, y);
        if (x instanceof Point) {
            this.x = x.x;
            this.y = x.y;
            return;
        }
        this.x = x || 0;
        this.y = y || 0;
    }

    return Point;
});