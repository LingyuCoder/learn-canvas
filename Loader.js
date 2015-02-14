(function(root, name, factory) {
    if (typeof module !== 'undefined' && module.exports) module.exports = factory();
    else if (typeof define === 'function' && define.amd) define(factory);
    else root[name] = root[name] || factory();
})(this, 'Loader', function() {
    'use strict';

    var isArray = Util.isType('array');
    var isString = Util.isType('string');

    function Loader() {
        if (!this instanceof(Loader)) return new Loader();
        this.cache = {};
    }

    Util.extend(Loader.prototype, {
        loadImage: function(url) {
            return this._loadResource(url, 'image', function(resolve, reject) {
                var img = new Image();
                img.src = url;
                img.onload = function() {
                    resolve(img);
                };
                img.onerror = reject;
            });
        },
        loadSound: function(url) {
            return this._loadResource(url, 'sound', function(resolve, reject) {
                var sound = new Sound(url);
                sound.load().then(function() {
                    resolve(sound);
                }).catch(reject);
            });
        },
        loadImages: function(urls) {
            return this._loadResources(urls, 'image');
        },
        loadSounds: function(urls) {
            return this._loadResources(urls, 'sound');
        },
        _loadResource: function(url, type, handler) {
            if (!isString(url)) {
                return Promise.reject(new Error('Loader error: url must be a string.'));
            }
            var cache = this.cache[type] = this.cache[type] || {};
            return cache[url] ?
                Promise.resolve(cache[url]) : new Promise(handler).then(function(resource) {
                    cache[url] = resource;
                    return resource;
                });
        },
        _loadResources: function(urls, type) {
            if (!isArray(urls)) {
                if (isString(urls)) {
                    urls = [urls];
                } else {
                    return Promise.reject('Loader error: urls must be an array of strings.');
                }
            }
            var promises = [];
            var method = 'load' + type[0].toUpperCase() + type.slice(1);
            for (var i = 0, m = urls.length; i < m; i++) {
                promises.push(this[method](urls[i]));
            }
            return Promise.all(promises);
        },
        delay: function(time) {
            return new Promise(function(resolve, reject) {
                setTimeout(resolve, time);
            });
        }
    });

    return Loader;
});