define(['Util', 'Item'], function(Util, Item) {
    'use strict';

    var isArray = Util.isType('array');

    var ScenePainter = {
        paint: function(scene, ctx) {
            var i, m;
            var items = scene.items;
            for (i = 0, m = items.length; i < m; i++)
                items[i].paint(ctx);
        }
    };

    var SceneBehavior = {
        execute: function(scene, ctx, frame) {
            var i, m;
            var items = scene.items;
            for (i = 0, m = items.length; i < m; i++)
                items[i].update(ctx);
        }
    };

    function Scene(name, options, behaviors) {
        if (!this instanceof Scene) return SpriteItem(name, options, behaviors);

        Item.call(this, name, options, ScenePainter, [SceneBehavior].concat(behaviors || []));

        this.items = [];
    }

    Util.inherits(Scene, Item);

    Util.extend(Scene.prototype, {
        add: function(child) {
            var i, m;
            if (isArray(child))
                for (i = 0, m = child.length; i < m; i++)
                    this.add.call(this, child[i]);
            else if (child instanceof Item && !this.has(child)) {
                child.scene = this;
                this.items.push(child);
            }
            return this;
        },
        remove: function(child) {
            var items = this.items;
            if (this.has(child)) {
                items.splice(index, 1);
                child.scene = null;
            }
            return this;
        },
        index: function(child) {
            var items = this.items;
            var index = items.indexOf(child);
            return index;
        },
        has: function(child) {
            return this.index(child) !== -1;
        }
    });

    return Scene;
});