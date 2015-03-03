define(['Util'], function(Util) {
    'use strict';

    var keyCode2Action = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'atk'
    };

    function PlayerBehavior() {
        if (!this instanceof PlayerBehavior) return new PlayerBehavior();
        this.lastAnime = null;
    }

    Util.extend(PlayerBehavior.prototype, {
        execute: function(item, ctx, frame) {
            var pressingKey = item.pressingKey;
            var action = keyCode2Action[pressingKey];
            var isAtking = /atk/.test(item.currentAnime);
            if (isAtking && item.pause) {
                item.currentAnime = this.lastAnime;
                item.pause = !pressingKey;
            } else if (!isAtking && action === 'atk') {
                this.lastAnime = item.currentAnime;
                item.currentAnime += 'atk';
                item.loop = false;
                item.pause = false;
                item.currentFrame = 0;
                item.width = item.height = 64;
                return;
            } else if (!isAtking) {
                this.move(item, action);
                item.pause = !pressingKey;
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
