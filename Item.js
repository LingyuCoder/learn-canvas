define(['Util'], function(Util) {
    'use strict';

    var isArray = Util.isType('array');
    var isFunction = Util.isType('function');

    var defaultOptions = {
        visible: true,
        top: 0,
        left: 0
    };

    function Item(name, options, painter, behaviors) {
        if (!this instanceof Item) return new Item(name, options, painter, behaviors);

        this.name = name;
        this.painter = painter;
        if (isArray(behaviors))
            this.behaviors = behaviors;
        else if (behaviors && isFunction(behaviors.execute))
            this.behaviors = [behaviors];
        else
            this.behaviors = [];
        this.scene = null;
        this.frameCount = 0;

        Util.extend(this, defaultOptions, options);
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

    return Item;
});