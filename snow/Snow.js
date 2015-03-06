define(['Vector2', 'Util'], function(Vector2, Util) {
    'use strict';

    function microtime() {
        return new Date().getTime() * 0.001;
    }

    function Particle(origin, velocity, size, amplitude, rspeed, alpha, image) {
        this.origin = origin;
        this.position = new Vector2(origin.x, origin.y);
        this.velocity = velocity || new Vector2(0, 0);
        this.size = size;
        this.rspeed = rspeed;
        this.amplitude = amplitude;
        this.alpha = alpha;
        this.image = image;

        this.dx = Math.random() * 100;
        this.rotation = Math.random() * 360;
    }

    Util.extend(Particle.prototype, {
        update: function(delta_time) {
            this.dx += this.velocity.x * delta_time;
            this.position.y += this.velocity.y * delta_time;
            this.position.x = this.origin.x + (this.amplitude * Math.sin(this.dx));
            this.rotation += this.rspeed * delta_time;
        }
    });

    function Snow(canvas_id, options) {
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.pImageObjects = [];
        this.start_time = this.frame_time = 0;

        this.resize(window.innerWidth, window.innerHeight);

        this.pAmount = options.amount || 500;
        this.pSize = options.size || [8, 26];
        this.pRotation = options.rotation || [-5, 5];
        this.pSwing = options.swing || [0.1, 1];
        this.pSpeed = options.speed || [40, 100];
        this.pAmplitude = options.amplitude || [20, 50];
        this.pAlpha = options.alpha || [0.25, 1];
        this.pImageNames = options.images || [];

        for (var i = 0; i < this.pImageNames.length; i++) {
            var image = new Image();
            image.src = this.pImageNames[i];
            this.pImageObjects.push(image);
        }

        this._init_particles();
    }

    Util.extend(Snow.prototype, {
        start: function() {
            this.running = true;
            this.start_time = this.frame_time = microtime();
            this._loop();
        },

        end: function() {
            this.running = false;
        },

        resize: function(width, height) {
            this.canvas.width = width;
            this.canvas.height = height;
        },

        _loop: function() {
            if (this.running) {
                this._clear();
                this._update();
                this._draw();
                this._tick();
            }
        },

        _init_particles: function() {
            this.particles.length = 0;

            for (var i = 0; i < this.pAmount; i++) {
                var origin = new Vector2(Util.rand.float(0, this.canvas.width), Util.rand.float(-this.canvas.height, 0));
                var velocity = new Vector2(Util.rand.float(this.pSwing[0], this.pSwing[1]), Util.rand.float(this.pSpeed[0], this.pSpeed[1]));
                var size = Util.rand.float(this.pSize[0], this.pSize[1]);
                var amplitude = Util.rand.float(this.pAmplitude[0], this.pAmplitude[1]);
                var rspeed = Util.rand.float(this.pRotation[0], this.pRotation[1]) * ((Math.random() < 0.5) ? -1 : 1);
                var alpha = Util.rand.float(this.pAlpha[0], this.pAlpha[1]);
                var image = (this.pImageObjects.length > 0) ? Util.rand.integer(0, this.pImageObjects.length - 1) : -1;

                this.particles.push(new Particle(origin, velocity, size, amplitude, rspeed, alpha, image));
            }
        },

        _update: function() {
            var now_time = microtime();
            var delta_time = now_time - this.frame_time;

            for (var i = 0; i < this.particles.length; i++) {
                var particle = this.particles[i];
                particle.update(delta_time);

                if (particle.position.y - particle.size > this.canvas.height) {
                    particle.position.y = -particle.size * 2;
                    particle.position.x = particle.origin.x = Math.random() * this.canvas.width;
                }
            }

            this.frame_time = now_time;
        },

        _draw: function() {
            this.ctx.fillStyle = 'rgb(255,255,255)';

            for (var i = 0; i < this.particles.length; i++) {
                var particle = this.particles[i];
                var center = -(particle.size / 2);

                this.ctx.save();
                this.ctx.translate(particle.position.x, particle.position.y);
                this.ctx.rotate(particle.rotation);
                this.ctx.globalAlpha = this.particles[i].alpha;

                if (particle.image == -1)
                    this.ctx.fillRect(center, center, particle.size, particle.size);
                else
                    this.ctx.drawImage(this.pImageObjects[particle.image], center, center, particle.size, particle.size);

                this.ctx.restore();
            }
        },

        _clear: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },

        _tick: function() {
            window.requestAnimationFrame(this._loop.bind(this));
        }
    });

    return Snow;
});