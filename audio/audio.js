(function(global) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    function currying() {
        var f = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            args.push.apply(args, arguments);
            return f.apply(this, args);
        }
    }

    function domReady() {
        return new Promise(function(fulfill, reject) {
            if (document.readyState === 'complete') {
                fulfill();
            } else {
                document.addEventListener('DOMContentLoaded', fulfill);
            }
        })
    }

    function loadSound(src) {
        return new Promise(function(fulfill, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function() {
                fulfill(xhr.response);
            };
            xhr.onerror = reject;
            xhr.send();
        });
    }

    function decodeSound(audioData) {
        return new Promise(function(fulfill, reject) {
            context.decodeAudioData(audioData, function(buffer) {
                fulfill(buffer);
            }, reject);
        });
    }

    function play(buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    }


    Promise.resolve()
        .then(domReady)
        .then(currying(loadSound, 'pop.ogg'))
        .then(decodeSound)
        .then(play)
        .catch(function(error) {
            console.error(error);
        });
}(this));