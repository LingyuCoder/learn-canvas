define(['Util'], function(Util) {
    'use strict';

    function Analyser(context, fft, smoothing, processors) {
        if (!this instanceof(Analyser)) return new Analyser(context, fft, smoothing);
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = context || new AudioContext();
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = fft || 2048;
        this.analyser.smoothingTimeConstant = smoothing || 0;
        this.processors = processors || [];
        this.analyser.connect(this.context.destination);
        this.wave = new Uint8Array(this.analyser.frequencyBinCount * 2);
        this.freq = new Uint8Array(this.analyser.frequencyBinCount);
    }

    Util.extend(Analyser.prototype, {
        audio: function(audio) {
            if (this.source) this.source.disconnect();
            this._audio = audio || new Audio();
            this.source = this.context.createMediaElementSource(this._audio);
            this.source.connect(this.analyser);
            return this;
        },
        stream: function(stream) {
            if (this.source) this.source.disconnect();
            this._stream = stream;
            this.source = this.context.createMediaStreamSource(this._stream);
            this.source.connect(this.analyser);
            return this;
        },
        update: function() {
            this.analyser.getByteFrequencyData(this.freq);
            this.analyser.getByteTimeDomainData(this.wave);
            return this;
        },
        amplitude: function(hz) {
            var l = hz / this.context.sampleRate * this.freq.length | 0;
            for (var sum = 0, i = 0; i < l;) sum += this.freq[i++];
            return sum / l / 255;
        }
    });
    return Analyser;
});
