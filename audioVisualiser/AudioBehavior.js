define(['Util', 'AudioAnalyser'], function(Util, AudioAnalyser) {
    'use strict';

    function AudioBehavior(audio) {
        if (!this instanceof(AudioBehavior)) return new AudioBehavior(audio);
        this.audio = audio;
        this.analyser = new AudioAnalyser(null, 1024, 0.1).audio(audio);
    }

    Util.extend(AudioBehavior.prototype, {
        execute: function(item, ctx, frame) {
            var analyser = this.analyser;
            var state = item.state = item.state || {};

            analyser.update();

            state.amp = analyser._audio.duration ? Math.min(1, Math.pow(1.25 * analyser.amplitude(15e3), 2)) : 0.5 - 0.25 * Math.cos(frame * 60 / 1000);
            state.wave = analyser.wave;
            state.freq = analyser.freq;
        }
    });
    return AudioBehavior;
});
