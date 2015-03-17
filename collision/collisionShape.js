require(['Stage', 'Shape', 'ShapePainter'], function(Stage, Shape, ShapePainter) {
    'use strict';
    var $ = document.querySelector.bind(document);
    var stage = new Stage('#canvas');
    var $result = $('#result');
    var $x = $('#iptX');
    var $y = $('#iptY');

    var WIDTH = stage.canvas.width = window.innerWidth;
    var HEIGHT = stage.canvas.height = window.innerHeight;
    $x.setAttribute('max', WIDTH);
    $y.setAttribute('max', HEIGHT);

    var initPoints = [{
        x: 50,
        y: 50
    }, {
        x: 150,
        y: 200
    }, {
        x: 0,
        y: 300
    }];

    var s1 = new Shape('Shape1', {
        points: [{
            x: 50,
            y: 50
        }, {
            x: 150,
            y: 200
        }, {
            x: 0,
            y: 300
        }]
    }, ShapePainter);

    var s2 = new Shape('Shape2', {
        points: [{
            x: 500,
            y: 500
        }, {
            x: 600,
            y: 400
        }, {
            x: 750,
            y: 540
        }, {
            x: 700,
            y: 700
        }, {
            x: 550,
            y: 650
        }]
    }, ShapePainter);

    s1.color = 'blue';

    s2.color = 'green';

    stage.rootScene.add(s1).add(s2);

    function redraw() {
        var x = Number($x.value);
        var y = Number($y.value);
        for (var i = initPoints.length; i--;) {
            s1.points[i].x = initPoints[i].x + x;
            s1.points[i].y = initPoints[i].y + y;
        }
        stage.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        stage.paint();
        $result.textContent = !!s1.collidesWith(s2);
    }

    $x.addEventListener('change', redraw);
    $y.addEventListener('change', redraw);

    redraw();
});