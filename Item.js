(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Item', function() {
    'use strict';

    var items = {};
    var defaultOptions = {
        visible: true,
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };

    function Item(name, options, painter, behaviors) {
        if (!this instanceof Item) return new Item(name, options, painter, behaviors);
        if (items[name]) throw new Error('Create Item Error: Name must be unique!');

        this.name = name;
        this.painter = painter;
        this.behaviors = behaviors || [];
        this.scene = null;
        this.frameCount = 0;

        Util.extend(this, defaultOptions, options);

        items[name] = this;
    }

    Util.extend(Item.prototype, {
        paint: function(ctx) {
            if (this.painter !== undefined && this.visible) {
                this.painter.paint(this, ctx);
            }
            return this;
        },
        update: function(ctx) {
            var behaviors = this.behaviors;
            for (var i = 0; i < behaviors.length; i++) {
                behaviors[i].execute(this, ctx, ++this.frameCount);
            }
            return this;
        }
    });

    Util.extend(Item, {
        get: function(name) {
            return items[name];
        }
    });

    return Item;
});