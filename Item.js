define(['Util', 'Transform'], function(Util, Transform) {
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
        this.transform = new Transform();
        this.origin = {
            x: 0,
            y: 0
        };

        Util.extend(this, defaultOptions, options);
    }

    Util.extend(Item.prototype, {
        paint: function(ctx) {
            if (this.painter !== undefined && this.visible) {
                ctx.save();
                ctx.translate(this.origin.x, this.origin.y);
                ctx.transform.apply(ctx, this.transform.toArray());
                ctx.translate(-this.origin.x, -this.origin.y);
                this.painter.paint(this, ctx);
                ctx.restore();
            }
            return this;
        },
        update: function(ctx) {
            var behaviors = this.behaviors;
            for (var i = 0; i < behaviors.length; i++) {
                behaviors[i].execute(this, ctx, ++this.frameCount);
            }
            return this;
        },
        transform: function(a, b, c, d, e, f) {
            this.transform.transform(a, b, c, d, e, f);
            return this;
        },
        rotate: function(angle) {
            this.transform.rotate(angle);
            return this;
        },
        translate: function(x, y) {
            this.transform.translate(x, y);
            return this;
        },
        scale: function(x, y) {
            this.transform.scale(x, y);
            return this;
        },
        skew: function(x, y) {
            this.transform.skew(x, y);
            return this;
        },
        flipX: function() {
            this.transform.flipX();
            return this;
        },
        flipY: function() {
            this.transform.flipY();
            return this;
        },
        reset: function() {
            this.transform.reset();
            return this;
        }
    });

    return Item;
});