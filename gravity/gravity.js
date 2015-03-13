require(['Util', 'Stage', 'Ball', 'Vector2'], function(Util, Stage, Ball, Vector2) {
    var stage = new Stage('#canvas');
    var canvas = stage.canvas;

    var WIDTH = canvas.width = window.innerWidth;
    var HEIGHT = canvas.height = window.innerHeight;

    var balls = [];

    var id = 0;

    var randColor = Util.rand.color;
    var randFloat = Util.rand.float;

    function createBall() {
        var ball = new Ball((++id).toString(), {
            color: randColor(),
            center: {
                x: WIDTH / 2,
                y: HEIGHT
            },
            accelerations: [new Vector2(0, 9.81)],
            radius: randFloat(10, 30),
            velocity: new Vector2(randFloat(-1, 1), randFloat(-2, -4.2))
        });

        balls.push(ball);
        stage.rootScene.add(ball);
    }

    stage.tick(function() {
        var remain = [];
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        stage.update().paint();
        for (var i = balls.length; i--;) {
            if (balls[i].center.y > HEIGHT * 2 || balls[i].center.x > WIDTH * 2) {
                stage.rootScene.remove(balls[i]);
            } else {
                remain.push(balls[i]);
            }
        }
        balls = remain;
        createBall();
    });
});