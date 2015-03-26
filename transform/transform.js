require(
    [
        'Stage',
        'Shape',
        'Circle',
        'ShapePainter',
        'CirclePainter',
    ],
    function(
        Stage,
        Shape,
        Circle,
        ShapePainter,
        CirclePainter
    ) {
        'use strict';
        var stage = new Stage('#canvas');
        var canvas = stage.canvas;

        var WIDTH = canvas.width = window.innerWidth;
        var HEIGHT = canvas.height = window.innerHeight;

        var shape = new Shape('Shape', {
            points: [{
                x: 300,
                y: 300
            }, {
                x: 500,
                y: 300
            }, {
                x: 500,
                y: 500
            }, {
                x: 300,
                y: 500
            }]
        }, ShapePainter);

        shape.color = 'blue';

        stage.rootScene.add(shape);

        var s = 0;

        stage.tick(function() {
            s++;
            shape.reset().translate(20, 20).rotate(s);
            stage.clean().paint();
            if (s === 360) {
                stage.pause();
            }
        });
    });