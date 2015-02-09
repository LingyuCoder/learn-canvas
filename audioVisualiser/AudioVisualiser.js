window.addEventListener('load', function() {
    'use strict';

    var $ = document.querySelector.bind(document);
    var canvas = $('#canvas');
    var audio = $('#audio');
    var ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    var options = {
        colors: [
            [
                [0 / 1, [0.2, 0.5, 1.0, 1.0]],
                [1 / 1, [1.0, 0.2, 1.0, 1.0]]
            ],
            [
                [0 / 4, [0.0, 0.0, 0.0, 1.0]],
                [1 / 4, [0.0, 0.0, 1.0, 1.0]],
                [2 / 4, [1.0, 0.0, 0.0, 1.0]],
                [3 / 4, [1.0, 1.0, 0.0, 1.0]],
                [4 / 4, [1.0, 1.0, 1.0, 1.0]]
            ]
        ]
    };

    var painters = {
        'line': new LinePainter(options),
        'bar': new BarPainter(options),
        'spread': new AudioPainter(options),
        'snow': new SnowPainter()
    };

    var particle = new Item('particle', {
        visible: true,
        width: canvas.width,
        height: canvas.height,
        top: 0,
        left: 0
    }, painters['line'], [new AudioBehavior(audio)]);

    Util.loop(function(f, t, dt) {
        particle.update(ctx, +new Date).paint(ctx);
    });

    window.addEventListener('resize', function() {
        particle.height = canvas.height = window.innerHeight;
        particle.width = canvas.width = window.innerWidth;
    }, false);

    ctx.save();
    $('#showType').onchange = function() {
        ctx.restore();
        particle.painter = painters[this.value];
        ctx.save();
    };

}, false);