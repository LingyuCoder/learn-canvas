window.addEventListener('load', function() {
    'use strict';

    var loader = new Loader();
    var $ = document.querySelector.bind(document);

    var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    loader.loadImages(['mv.png', 'atk.png']).then(function(images) {
        var start = 0;
        var options = {
            width: 64,
            height: 64,
            left: 100,
            top: 100,
            animations: {
                'down': {
                    frames: [1, 3],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'left': {
                    frames: [5, 7],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'right': {
                    frames: [9, 11],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'up': {
                    frames: [13, 15],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'downatk': {
                    frames: [0, 1, 2, 3],
                    image: images[1],
                    frameDuration: 10,
                    width: 64,
                    height: 64
                },
                'leftatk': {
                    frames: [4, 5, 6, 7],
                    image: images[1],
                    frameDuration: 10,
                    width: 64,
                    height: 64
                },
                'rightatk': {
                    frames: [8, 9, 10, 11],
                    image: images[1],
                    frameDuration: 10,
                    width: 64,
                    height: 64
                },
                'upatk': {
                    frames: [12, 13, 14, 15],
                    image: images[1],
                    frameDuration: 10,
                    width: 64,
                    height: 64
                }
            },
            isRunning: true,
            startFrame: 0,
            startAnime: 'down',
            image: images[0]
        };
        var sprite = new SpriteItem(
            'sprite',
            options, [new PlayerBehavior()]);

        Util.loop(function(f, t, dt) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sprite.update(ctx).paint(ctx);
        });
    }).catch(function(e) {
        console.error(e.message);
        console.error(e.stack);
    });

}, false);