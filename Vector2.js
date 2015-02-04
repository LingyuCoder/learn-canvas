var Vector2 = (function() {
    function Vector2(x, y) {
        if (!this instanceof Vector2) return new Vector2(x, y);
        if (x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
            return;
        }
        this.x = x || 0;
        this.y = y || 0;
    }

    var proto = Vector2.prototype;

    proto.add = function(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    proto.magnitude = function() {
        return Math.sqrt(this.squaredMagnitude());
    }

    proto.scale = function(scale) {
        this.x *= scale;
        this.y *= scale;
    }

    proto.sub = function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    proto.negate = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    proto.squaredMagnitude = function() {
        return this.x * this.x + this.y * this.y;
    }

    proto.normalize = function() {
        var magnitude = this.magnitude();
        if (magnitude) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    }

    proto.rotate = function(angle) {
        var x = this.x;
        var y = this.y;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }

    proto.dot = function(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    proto.toString = function() {
        return '(' + this.x.toFixed(3) + ',' + this.y.toFixed(3) + ')';
    }

    return Vector2;
}(this));