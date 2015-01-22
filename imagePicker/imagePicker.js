var ImagePicker = (function(global) {

    var DASH_LEN = 10;
    var NOOP = function() {};

    function windowToCanvas(canvas, x, y) {
        var box = canvas.getBoundingClientRect();
        return {
            x: (x - box.left) * (canvas.width / box.width),
            y: (y - box.top) * (canvas.height / box.height)
        };
    }

    function drawDashLine(ctx, startPoint, endPoint) {
        var x = startPoint.x;
        var y = startPoint.y;
        var ex, ey;
        var type = startPoint.x === endPoint.x ? 'horizontal' : 'vertical';
        var offset = {
            x: type === 'horizontal' ? 0 : DASH_LEN,
            y: type === 'vertical' ? 0 : DASH_LEN
        };

        while (true) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ex = x + offset.x;
            ey = y + offset.y;
            ex = ex > endPoint.x ? endPoint.x : ex;
            ey = ey > endPoint.y ? endPoint.y : ey;
            ctx.lineTo(ex, ey);
            ctx.stroke();
            x = ex + offset.x;
            y = ey + offset.y;
            if (x > endPoint.x || y > endPoint.y) {
                break;
            }
            ctx.closePath();
        }

    }

    function ImagePicker(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.startPoint = null;
        this.endPoint = null;
        this.dragging = false;
        this.scale = 1;
        this.image = null;
        this.onselect = NOOP;
    }

    function findVertices(startPoint, endPoint) {
        var minX, minY, maxX, maxY;
        if (startPoint.x > endPoint.x) {
            minX = endPoint.x;
            maxX = startPoint.x;
        } else {
            minX = startPoint.x;
            maxX = endPoint.x;
        }

        if (startPoint.y > endPoint.y) {
            minY = endPoint.y;
            maxY = startPoint.y;
        } else {
            minY = startPoint.y;
            maxY = endPoint.y;
        }

        return {
            'lt': {
                x: minX,
                y: minY
            },
            'rt': {
                x: maxX,
                y: minY
            },
            'lb': {
                x: minX,
                y: maxY
            },
            'rb': {
                x: maxX,
                y: maxY
            }
        };
    }

    function drawDashLines(ctx, points) {
        drawDashLine(ctx, points['lt'], points['rt']);
        drawDashLine(ctx, points['lb'], points['rb']);
        drawDashLine(ctx, points['lt'], points['lb']);
        drawDashLine(ctx, points['rt'], points['rb']);
    }

    function imageDataToDataUrl(imageData) {
        var canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        var ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    function mousedown(that) {
        return function(event) {
            var canvas = that.canvas;
            canvas.onmousemove = mousemove(that);
            canvas.onmouseup = mouseup(that);
            that.dragging = true;
            that.startPoint = windowToCanvas(canvas, event.clientX, event.clientY);
            that.endPoint = null;
        };
    }

    function mousemove(that) {
        return function(event) {
            var canvas = that.canvas;
            var ctx = that.context;
            var points = findVertices(that.startPoint, windowToCanvas(canvas, event.clientX, event.clientY));
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(that.image, 0, 0, canvas.width, canvas.height);
            drawDashLines(that.context, points);
        }
    }

    function mouseup(that) {
        return function(event) {
            var canvas = that.canvas;
            var ctx = that.context;
            canvas.onmousemove = null;
            canvas.onmouseup = null;
            that.dragging = false;
            that.endPoint = windowToCanvas(canvas, event.clientX, event.clientY);

            var points = findVertices(that.startPoint, that.endPoint);
            var width = points['rt'].x - points['lt'].x - 2;
            var height = points['lb'].y - points['lt'].y - 2;
            var imageData = ctx.getImageData(points['lt'].x + 1, points['lt'].y + 1, width, height);
            if (width > 0 && height > 0) {
                that.onselect({
                    points: points,
                    data: imageDataToDataUrl(imageData),
                    width: imageData.width,
                    height: imageData.height
                });
            }
        };
    }

    ImagePicker.prototype.init = function(url) {
        var that = this;
        var image = new Image();
        var canvas = that.canvas;
        var ctx = that.context;
        image.crossOrigin = 'anonymous';
        image.src = url;
        image.onload = function() {
            that.image = image;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(that.image, 0, 0, canvas.width, canvas.height);
            canvas.onmousedown = mousedown(that);
        };
    };

    return ImagePicker;

}(this));