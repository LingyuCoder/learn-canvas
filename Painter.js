(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Painter', function() {
    'use strict';

    function Painter() {}

    Util.extend(Painter.prototype, {
        paint: function() {
            throw Error('Updating Error: Painter has no paint method!');
        }
    });
    return Painter;
});