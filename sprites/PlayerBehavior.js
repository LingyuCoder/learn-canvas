(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'PlayerBehavior', function() {
    'use strict';

    var keyCode2Action = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'atk'
    };
    var pressingKey = null;

    var keydownCb = function(event) {
        pressingKey = event.key || event.keyCode || event.which;
    };

    var keyupCb = function(event) {
        pressingKey = null;
    };

    window.onkeydown = keydownCb;
    window.onkeyup = keyupCb;

    function PlayerBehavior() {
        if (!this instanceof PlayerBehavior) return new PlayerBehavior();
        this.lastAnime = null;
    }

    Util.extend(PlayerBehavior.prototype, {
        execute: function(item, ctx, frame) {
            var action = keyCode2Action[pressingKey];
            var isAtking = /atk/.test(item.currentAnime);
            if (isAtking && !item.isRunning) {
                item.currentAnime = this.lastAnime;
                item.isRunning = !!pressingKey;
            } else if (!isAtking && action === 'atk') {
                this.lastAnime = item.currentAnime;
                item.currentAnime += 'atk';
                item.isLoop = false;
                item.isRunning = true;
                item.currentFrame = 0;
                item.width = item.height = 64;
                return;
            } else if (!isAtking) {
                this.move(item, action);
                item.isRunning = !!pressingKey;
            }
        },
        move: function(item, action) {
            switch (action) {
                case 'left':
                    item.currentAnime = action;
                    item.left -= 2;
                    break;
                case 'right':
                    item.currentAnime = action;
                    item.left += 2;
                    break;
                case 'up':
                    item.currentAnime = action;
                    item.top -= 2;
                    break;
                case 'down':
                    item.currentAnime = action;
                    item.top += 2;
                    break;
                default:
                    item.currentFrame = 0;
                    break;
            }

        }
    });

    return PlayerBehavior;
});