require(['Loader', 'TileMap', 'Stage'], function(Loader, TileMap, Stage) {
    'use strict';

    var loader = new Loader();
    var stage = new Stage('#canvas');

    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    loader.loadImage('tiles.png').then(function(image) {
        var blueHouse = new TileMap('BlueHouse', {
            image: image,
            map: [
                [26, 27, 28, 29, 30, 31],
                [51, 52, 53, 54, 55, 56],
                [76, 77, 78, 79, 80, 81],
                [101, 102, 103, 104, 105, 106],
                [126, 127, 128, 129, 130, 131],
                [151, 152, 153, 154, 155, 156]
            ],
            tileWidth: 16,
            tileHeight: 16,
            cellWidth: 40,
            cellHeight: 40
        });

        stage.tick(function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            blueHouse.paint(this.ctx);
        });
    }).catch(function(e) {
        console.error(e.message);
        console.error(e.stack);
    });
});