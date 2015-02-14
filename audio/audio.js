(function(global) {
    var loader = new Loader();
    var $ = document.querySelector.bind(document);

    var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    loader.loadSound('back.ogg').then(function(sound) {
        sound.play();
    });

    loader.loadSounds(['whoosh.ogg', 'pop.ogg']).then(function(sounds) {
        for (var i = sounds.length; i--;) {
            sounds[i].play();
        }
    });

    loader.loadImage('1.jpg').then(function(img) {
        ctx.drawImage(img, 0, 0);
    });

    loader.delay(5000)
        .then(Util.currying(loader.loadImages.bind(loader), ['1.jpg', '2.jpg', '3.jpg']))
        .then(function(imgs) {
            for (var i = imgs.length; i--;) {
                ctx.drawImage(imgs[i], 440 * i + 440, 0);
            }
        });



}(this));