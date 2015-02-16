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
        var sprite = new SpriteItem('sprite', {
            width: 64,
            height: 64,
            left: 100,
            top: 100,
            animations: {
                'down': {
                    frames: [0, 1, 2, 3],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'left': {
                    frames: [4, 5, 6, 7],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'right': {
                    frames: [8, 9, 10, 11],
                    image: images[0],
                    frameDuration: 15,
                    width: 48,
                    height: 64
                },
                'up': {
                    frames: [12, 13, 14, 15],
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
        }, [new PlayerBehavior()]);

        Util.loop(function(f, t, dt) {
            try {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                sprite.update(ctx, +new Date).paint(ctx);
            } catch (e) {
                console.log(e.message);
                console.log(e.stack);
                debugger
            }
        });
    });

}, false);