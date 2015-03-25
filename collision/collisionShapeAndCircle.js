require(
    [
        'Stage',
        'Shape',
        'Circle',
        'Point',
        'Segment',
        'ShapePainter',
        'CirclePainter',
        'SegmentPainter'
    ],
    function(
        Stage,
        Shape,
        Circle,
        Point,
        Segment,
        ShapePainter,
        CirclePainter,
        SegmentPainter
    ) {
        'use strict';
        var $ = document.querySelector.bind(document);
        var stage = new Stage('#canvas');
        var $result = $('#result');
        var $x = $('#iptX');
        var $y = $('#iptY');
        var canvas = stage.canvas;

        var WIDTH = canvas.width = window.innerWidth;
        var HEIGHT = canvas.height = window.innerHeight;
        $x.setAttribute('max', WIDTH);
        $y.setAttribute('max', HEIGHT);
        $x.value = WIDTH / 2;
        $y.value = HEIGHT / 2;

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

        var circle = new Circle('Circle', {
            center: {
                x: WIDTH / 2,
                y: HEIGHT / 2
            },
            radius: 200
        }, CirclePainter);

        var shape = new Shape('Shape', {
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

        shape.color = 'blue';

        var s1 = new Segment('s1', {
            points: [{
                x: 0,
                y: 0
            }, {
                x: 500,
                y: 500
            }]
        }, SegmentPainter);

        var s2 = new Segment('s2', {
            points: [{
                x: 0,
                y: 300
            }, {
                x: 299,
                y: 300
            }]
        }, SegmentPainter);

        stage.rootScene.add(shape).add(circle).add(s1).add(s2);

        function redraw() {
            circle.center.x = Number($x.value);
            circle.center.y = Number($y.value);
            stage.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            stage.paint();
            console.log(shape.collidesWith(circle));
            $result.textContent = '圆与多边形：' + !!(shape.collidesWith(circle).overlap) + '\n' + '圆与线段：' + !!circle.collidesWith(s1);

        }

        $x.addEventListener('change', redraw);
        $y.addEventListener('change', redraw);

        canvas.addEventListener('click', function(event) {
            var box = canvas.getBoundingClientRect();
            var point = new Point({
                x: (event.clientX - box.left) * (canvas.width / box.width),
                y: (event.clientY - box.top) * (canvas.height / box.height)
            });
            console.log(point.inShape(shape));
            console.log(shape.contains(point));
        });

        redraw();
    });