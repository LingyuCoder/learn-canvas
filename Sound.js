define(['Util'], function(Util) {
    'use strict';

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    function Sound(url) {
        if (!this instanceof(Sound)) return new Sound(url);
        this.url = url;
        this.buffer = null;
    }

    Util.extend(Sound.prototype, {
        play: function(time) {
            time = time || 0;
            var source = context.createBufferSource();
            source.buffer = this.buffer;
            source.connect(context.destination);
            source.start(time);
        },
        load: function() {
            return Promise.resolve(this.url).then(this._ajax.bind(this)).then(this._parse.bind(this));
        },
        _ajax: function(url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function() {
                    resolve(xhr.response);
                };
                xhr.onerror = reject;
                xhr.send();
            });
        },
        _parse: function(audioData) {
            var that = this;
            return new Promise(function(resolve, reject) {
                context.decodeAudioData(audioData, function(buffer) {
                    that.buffer = buffer;
                    resolve();
                }, reject);
            });
        }
    });

    return Sound;
});
