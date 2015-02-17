window.addEventListener('load', function() {
    'use strict';

    var loader = new Loader();
    var $ = document.querySelector.bind(document);

    var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

        Util.loop(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            blueHouse.paint(ctx);
        });
    }).catch(function(e) {
        console.error(e.message);
        console.error(e.stack);
    });

}, false);