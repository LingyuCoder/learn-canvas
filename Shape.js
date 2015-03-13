define(['Util', 'Item'], function(Util, Item) {
    'use strict';

    var defaultOptions = {
        points: []
    };


    function Shape(name, options, painter, behaviors) {
        if (!this instanceof Shape) return new Shape(name, options, painter, behaviors);

        Item.call(this, name, options, painter, behaviors);

        Util.extend(this, defaultOptions, options);
    }

    Util.inherits(Shape, Item);

    return Shape;
});