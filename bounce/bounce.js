require(['Util', 'Stage', 'Ball', 'Vector2', 'Shape', 'Circle', 'WallPainter'], function(Util, Stage, Ball, Vector2, Shape, Circle, WallPainter) {
    var stage = new Stage('#canvas');
    var canvas = stage.canvas;

    var WIDTH = canvas.width = window.innerWidth;
    var HEIGHT = canvas.height = window.innerHeight;

    var balls = [];

    var id = 0;

    var randColor = Util.rand.color;
    var randFloat = Util.rand.float;

    var gravity = new Vector2(0, 4.9);

    function createBall() {
        var radius = randFloat(20, 30);
        var ball = new Ball((++id).toString(), {
            color: randColor(),
            center: {
                x: 50,
                y: HEIGHT / 2
            },
            accelerations: [gravity],
            radius: radius,
            mass: 4 / 3 * Math.PI * Math.pow(radius, 3),
            velocity: new Vector2(randFloat(2, 2), randFloat(-2, 0))
        });

        balls.push(ball);
        stage.rootScene.add(ball);
    }

    var walls = [
        new Shape('rightWall', {
            points: [{
                x: WIDTH - 20,
                y: 0
            }, {
                x: WIDTH - 20,
                y: HEIGHT
            }, {
                x: WIDTH + 200,
                y: HEIGHT
            }, {
                x: WIDTH + 200,
                y: 0
            }]
        }, WallPainter),

        new Shape('floor', {
            points: [{
                x: WIDTH,
                y: HEIGHT - 20
            }, {
                x: 0,
                y: HEIGHT - 20
            }, {
                x: 0,
                y: HEIGHT + 200
            }, {
                x: WIDTH,
                y: HEIGHT + 200
            }]
        }, WallPainter),

        new Shape('leftWall', {
            points: [{
                x: 20,
                y: HEIGHT
            }, {
                x: 20,
                y: 0
            }, {
                x: -200,
                y: 0
            }, {
                x: -200,
                y: HEIGHT
            }]
        }, WallPainter),

        new Shape('rightTriangle', {
            points: [{
                x: WIDTH + 200,
                y: 200
            }, {
                x: 200,
                y: HEIGHT + 200
            }, {
                x: WIDTH + 200,
                y: HEIGHT + 200
            }]
        }, WallPainter),

        new Circle('circle', {
            radius: 100,
            center: {
                x: WIDTH / 2,
                y: HEIGHT / 2
            }
        }, {
            paint: function(item, ctx) {

                ctx.beginPath();
                ctx.arc(item.center.x, item.center.y, item.radius, 0, Math.PI * 2, true);
                ctx.fillStyle = '#646464';
                ctx.fill();
                ctx.closePath();
            }
        })
    ];

    stage.rootScene.add(walls);

    stage.tick(function() {
        stage.clean().update().paint();
        Util.each(balls, function(ball) {
            if (ball.isStatic) return;
            Util.each(walls, function(wall) {
                var collision = ball.collidesWith(wall);
                if (collision.overlap) {
                    var n = collision.axis;
                    ball.center.y += collision.overlap * n.y;
                    ball.center.x += collision.overlap * n.x;
                    ball.velocity = ball.velocity.reflect(n);
                }
            });
        });
    }).click(function() {
        createBall();
    });
});