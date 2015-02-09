(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Behavior', function() {
    'use strict';

    function Behavior() {}

    Util.extend(Behavior.prototype, {
        execute: function() {
            throw Error('Updating Error: Behavior has no execute method!');
        }
    });
    return Behavior;
});