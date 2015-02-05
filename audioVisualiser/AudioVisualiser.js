window.addEventListener('load', function() {
    var colors = [
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
    ];
    var $ = document.querySelector.bind(document);
    var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');
    var audio = $('#audio');
    var analyser = new AudioAnalyser(null, 2048, 0.5).audio(audio);
    var WIDTH = canvas.width = canvas.clientWidth;
    var HEIGHT = canvas.height = canvas.clientHeight;

    Util.loop(function(f, t, dt) {
        analyser.update();

        var amp = analyser._audio.duration ? Math.min(1, Math.pow(1.25 * analyser.amplitude(15e3), 2)) : 0.5 - 0.25 * Math.cos(t / 1000);

        var s = 1.01 + 0.09 * amp;
        ctx.setTransform(s, 0, 0, s, WIDTH / 2, HEIGHT / 2);
        ctx.drawImage(canvas, -WIDTH / 2, -HEIGHT / 2);
        ctx.fillStyle = Color.rgba(0, 0, 0, 0.05);
        ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

        ctx.setTransform(1, 0, 0, 1, WIDTH / 2, HEIGHT / 2);
        ctx.beginPath();
        for (var a, r, i = 0, j = analyser.wave.length; i < j; i++) {
            a = i / j * 2 * Math.PI;
            r = amp * 1024 * (0.5 + analyser.wave[i] / 255);
            ctx.lineTo(r * Math.sin(a), r * Math.cos(a));
        }


        var gradient = Util.gradient(colors[0], amp);
        gradient[3] = amp;

        ctx.fillStyle = Color.rgba(gradient);
        ctx.strokeStyle = Color.rgba(gradient[0] * 1.25, gradient[1] * 1.25, gradient[2] * 1.25, gradient[3]);
        ctx.lineWidth = 4 * amp;
        ctx.fill();
        ctx.stroke();
    });
}, false);