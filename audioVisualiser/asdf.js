(function () { 'use strict';
  window.addEventListener('load', function () {
    var C = util.tag('canvas', null, document.body);
    var $ = C.getContext('2d'), W, H;

    (window.onresize = function () {
      W = C.width  = C.clientWidth;
      H = C.height = C.clientHeight;
    })();

    var audio = util.tag('audio', {
      controls : true,
      autoplay : true,
      loop     : true,
      src      : location.hash ? location.hash.slice(1) :
        'https://dl.dropboxusercontent.com/u/3116587/audio/01%20-%20Introduction.ogg'
    }, document.body);

    var analyser = new Analyser(null, 2048, 0.5).audio(audio);

    var colors = [[
      [0/1, [0.2, 0.5, 1.0, 1.0]],
      [1/1, [1.0, 0.2, 1.0, 1.0]]
    ], [
      [0/4, [0.0, 0.0, 0.0, 1.0]],
      [1/4, [0.0, 0.0, 1.0, 1.0]],
      [2/4, [1.0, 0.0, 0.0, 1.0]],
      [3/4, [1.0, 1.0, 0.0, 1.0]],
      [4/4, [1.0, 1.0, 1.0, 1.0]]
    ]];

    util.loop(function (f, t, dt) {
      analyser.update();

      var amp = analyser._audio.duration
        ? Math.min(1, Math.pow(1.25 * analyser.amplitude(15e3), 2))
        : 0.5 - 0.25 * Math.cos(t / 1000);

      var s = 1.01 + 0.09 * amp;
      $.setTransform(s, 0, 0, s, W/2, H/2);
      $.drawImage(C, -W/2, -H/2);
      $.fillStyle = util.color.rgba(0, 0, 0, 0.05);
      $.fillRect(-W/2, -H/2, W, H);

      $.setTransform(1, 0, 0, 1, W/2, H/2);
      $.beginPath();
      for(var a, r, i = 0, j = analyser.wave.length; i < j; i++) {
        a = i/j * 2 * Math.PI;
        r = amp * 256 * (0.5 + analyser.wave[i]/255);
        $.lineTo(r * Math.sin(a), r * Math.cos(a));
      }

      var c = util.gradient(colors[0], amp); c[3] = amp;
      $.fillStyle   = util.color.rgba(c);
      $.strokeStyle = util.color.rgba(c[0] * 1.25, c[1] * 1.25, c[2] * 1.25, c[3]);
      $.lineWidth   = 4 * amp;
      $.fill(); $.stroke();
    });

    window.addEventListener('dragover', function (e) {
      e.preventDefault(); e.stopPropagation();
    });

    window.addEventListener('drop', function (e) {
      e.preventDefault(); e.stopPropagation();
      var file = e.dataTransfer.files[0];
      if(file) analyser._audio.src = URL.createObjectURL(file);
    });
  }, false);
}).call(this);