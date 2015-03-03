require(['Stage', 'Loader', 'SpriteItem', 'PlayerBehavior'], function(Stage, Loader, SpriteItem, PlayerBehavior) {
    'use strict';

    var loader = new Loader();
    var $ = document.querySelector.bind(document);

    var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');

    var stage = new Stage('#canvas');

    loader.loadImages(['mv.png', 'atk.png']).then(function(images) {
        var start = 0;
        var options = {
            frames: [
                //image, x, y, width, height
                //move down
                [images[0], 0, 0, 48, 64],
                [images[0], 48, 0, 48, 64],
                [images[0], 96, 0, 48, 64],
                [images[0], 144, 0, 48, 64],
                //move left
                [images[0], 0, 64, 48, 64],
                [images[0], 48, 64, 48, 64],
                [images[0], 96, 64, 48, 64],
                [images[0], 144, 64, 48, 64],
                //move right
                [images[0], 0, 128, 48, 64],
                [images[0], 48, 128, 48, 64],
                [images[0], 96, 128, 48, 64],
                [images[0], 144, 128, 48, 64],
                //move up
                [images[0], 0, 192, 48, 64],
                [images[0], 48, 192, 48, 64],
                [images[0], 96, 192, 48, 64],
                [images[0], 144, 192, 48, 64],
                //atk down
                [images[1], 0, 0, 64, 64],
                [images[1], 64, 0, 64, 64],
                [images[1], 128, 0, 64, 64],
                [images[1], 192, 0, 64, 64],
                //atk left
                [images[1], 0, 64, 64, 64],
                [images[1], 64, 64, 64, 64],
                [images[1], 128, 64, 64, 64],
                [images[1], 192, 64, 64, 64],
                //atk right
                [images[1], 0, 128, 64, 64],
                [images[1], 64, 128, 64, 64],
                [images[1], 128, 128, 64, 64],
                [images[1], 192, 128, 64, 64],
                //atk up
                [images[1], 0, 192, 64, 64],
                [images[1], 64, 192, 64, 64],
                [images[1], 128, 192, 64, 64],
                [images[1], 192, 192, 64, 64],
            ],
            animations: {
                'down': {
                    frames: [1, 3],
                    width: 96,
                    height: 128,
                    duration: 15
                },
                'left': {
                    frames: [5, 7],
                    width: 96,
                    height: 128,
                    duration: 15
                },
                'right': {
                    frames: [9, 11],
                    width: 96,
                    height: 128,
                    duration: 15
                },
                'up': {
                    frames: [13, 15],
                    width: 96,
                    height: 128,
                    duration: 15
                },
                'downatk': {
                    frames: [16, 17, 18, 19],
                    width: 128,
                    height: 128,
                    duration: 15
                },
                'leftatk': {
                    frames: [20, 21, 22, 23],
                    width: 128,
                    height: 128,
                    duration: 15
                },
                'rightatk': {
                    frames: [24, 25, 26, 27],
                    width: 128,
                    height: 128,
                    duration: 15
                },
                'upatk': {
                    frames: [28, 29, 30, 31],
                    width: 128,
                    height: 128,
                    duration: 15
                }
            },
            left: 100,
            top: 100,
            pause: true,
            currentFrameIndex: 0,
            currentAnime: 'down'
        };
        var sprite = new SpriteItem(
            'sprite',
            options, [new PlayerBehavior()]);

        stage.rootScene.add(sprite);
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;

        stage.onkeydown(function(event) {
            sprite.pressingKey = event.key || event.keyCode || event.which;
        }).onkeyup(function(event) {
            sprite.pressingKey = null;
        }).tick(function() {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.update().paint();
        });
    }).catch(function(e) {
        console.error(e.message);
        console.error(e.stack);
    });
});