define(['Util', 'Item'], function(Util, Item) {
    'use strict';

    var TileMapPainter = {
        paint: function(item, ctx) {
            ctx.drawImage(item.canvas, item.left, item.top);
        }
    };

    function createCanvas() {
        var image = this.image;
        var map = this.map;
        var tw = this.tWidth;
        var th = this.tHeight;
        var cw = this.cWidth;
        var ch = this.cHeight;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        var mCol = Math.floor(image.width / tw);
        canvas.width = this.width;
        canvas.height = this.height;

        for (var row = map.length; row--;)
            for (var col = map[row].length, index; col--;) {
                index = map[row][col];
                ctx.drawImage(image, (index % mCol) * tw, Math.floor(index / mCol) * th, tw, th, col * cw, row * ch, cw, ch);
            }
        return canvas;
    }

    function TileMap(name, options, behaviors) {
        if (!this instanceof TileMap) return TileMap(name, options, behaviors);

        options = Util.extend({}, options, {
            width: options.cellWidth * options.map[0].length,
            height: options.cellHeight * options.map.length
        });

        Item.call(this, name, options, TileMapPainter, behaviors);

        this.name = name;
        this.image = options.image;
        this.map = options.map;
        this.tWidth = options.tileWidth;
        this.tHeight = options.tileHeight;
        this.cWidth = options.cellWidth;
        this.cHeight = options.cellHeight;
        this.canvas = createCanvas.call(this);
    }

    Util.inherits(TileMap, Item);

    return TileMap;
});