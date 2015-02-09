(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'AudioBehavior', function() {
    'use strict';

    function AudioBehavior(audio) {
        if (!this instanceof(AudioBehavior)) return new AudioBehavior(audio);
        this.audio = audio;
        this.analyser = new AudioAnalyser(null, 1024, 0.1).audio(audio);
    }

    Util.extend(AudioBehavior.prototype, {
        execute: function(item, ctx, time) {
            var analyser = this.analyser;
            var state = item.state = item.state || {};

            analyser.update();

            state.amp = analyser._audio.duration ? Math.min(1, Math.pow(1.25 * analyser.amplitude(15e3), 2)) : 0.5 - 0.25 * Math.cos(time / 1000);
            state.wave = analyser.wave;
            state.freq = analyser.freq;
        }
    });
    return AudioBehavior;
});