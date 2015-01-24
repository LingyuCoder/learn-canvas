var ImagePicker = (function(global) {

    var DASH_LEN = 10;
    var NOOP = function() {};

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

    function mousedown(that) {
        return function(event) {
            var canvas = that.canvas;
            var ctx = that.context;
            canvas.onmousemove = mousemove(that);
            canvas.onmouseup = mouseup(that);
            that.dragging = true;
            that.startPoint = CanvasHelper.windowToCanvas(ctx, event.clientX, event.clientY);
            that.endPoint = null;
        };
    }

    function mousemove(that) {
        return function(event) {
            var canvas = that.canvas;
            var ctx = that.context;
            ctx.drawImage(that.image, 0, 0, canvas.width, canvas.height);
            CanvasHelper.drawDashRect(ctx, that.startPoint, CanvasHelper.windowToCanvas(ctx, event.clientX, event.clientY));
        }
    }

    function mouseup(that) {
        return function(event) {
            var canvas = that.canvas;
            var ctx = that.context;
            canvas.onmousemove = null;
            canvas.onmouseup = null;
            that.dragging = false;
            that.endPoint = CanvasHelper.windowToCanvas(ctx, event.clientX, event.clientY);

            var points = CanvasHelper.findVertices(that.startPoint, that.endPoint);
            var width = points['rt'].x - points['lt'].x - 2;
            var height = points['lb'].y - points['lt'].y - 2;
            var imageData = ctx.getImageData(points['lt'].x + 1, points['lt'].y + 1, width, height);
            if (width > 0 && height > 0) {
                that.onselect({
                    points: points,
                    data: CanvasHelper.imageDataToDataUrl(imageData),
                    width: imageData.width,
                    height: imageData.height
                });
            }
        };
    }

    ImagePicker.prototype.init = function(url) {
        var that = this;
        var image = that.image = new Image();
        var canvas = that.canvas;
        var ctx = that.context;
        image.crossOrigin = 'anonymous';
        image.src = url;
        image.onload = function() {
            ctx.drawImage(that.image, 0, 0, canvas.width, canvas.height);
            canvas.onmousedown = mousedown(that);
        };
    };

    return ImagePicker;

}(this));