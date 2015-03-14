require(['Stage', 'Circle', 'CirclePainter'], function(Stage, Circle, CirclePainter) {
    'use strict';
    var $ = document.querySelector.bind(document);
    var $result = $('#result');
    var $x = $('#iptX');
    var $y = $('#iptY');

    var stage = new Stage('#canvas');

    var WIDTH = stage.canvas.width = window.innerWidth;
    var HEIGHT = stage.canvas.height = window.innerHeight;
    $x.setAttribute('max', WIDTH);
    $y.setAttribute('max', HEIGHT);

    var c1 = new Circle('circle1', {
        center: {
            x: WIDTH / 2,
            y: HEIGHT / 2
        },
        radius: 200
    }, CirclePainter);

    var c2 = new Circle('circle2', {
        center: {
            x: 0,
            y: 0
        },
        radius: 100
    }, CirclePainter);

    stage.rootScene.add(c1).add(c2);

    function redraw() {
        c2.center.x = Number($x.value);
        c2.center.y = Number($y.value);
        stage.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        stage.paint();
        $result.textContent = c1.collidesWith(c2);
    }

    $x.addEventListener('change', redraw);
    $y.addEventListener('change', redraw);

    redraw();

});