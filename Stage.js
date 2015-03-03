define(['Util', 'Scene'], function(Util, Scene) {
    'use strict';

    var $ = document.querySelector.bind(document);
    var isString = Util.isType('string');
    var noop = function() {};

    function Stage(canvas) {
        if (!this instanceof Stage) return new Stage(canvas);

        if (isString(canvas)) canvas = $(canvas);

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rootScene = new Scene('root', {
            width: canvas.width,
            height: canvas.height,
        });
    }

    Util.extend(Stage.prototype, {
        tick: function(callback, interval) {
            var that = this;
            var now = Date.now();
            var start = now;
            var last = now;
            var count = 0;
            var loop = function() {
                !callback.call(that, count++, (now = Date.now()) - start, now - last, last = now) && next();
            };
            var next = interval == null ? requestNextAnimationFrame.bind(null, loop) : setTimeout.bind(null, loop, interval);
            return loop();
        },
        update: function() {
            this.rootScene.update(this.ctx);
            return this;
        },
        paint: function() {
            this.rootScene.paint(this.ctx);
            return this;
        },
        onkeydown: function(callback) {
            this._on('keydown', callback);
            return this;
        },
        onkeyup: function(callback) {
            this._on('keyup', callback);
            return this;
        },
        onkeypress: function(callback) {
            this._on('keypress', callback);
            return this;
        },
        offkeydown: function(callback) {
            this._off('keydown');
            return this;
        },
        offkeyup: function(callback) {
            this._off('keyup');
            return this;
        },
        offkeypress: function(callback) {
            this._off('keypress');
            return this;
        },
        _on: function(eventType, callback) {
            var that = this;
            window.addEventListener(eventType, that['_' + eventType] = function(event) {
                callback.call(that, event);
            }, false);
        },
        _off: function(eventType) {
            window.removeEventListener(eventType, this['_' + eventType]);
        }
    });

    return Stage;
});