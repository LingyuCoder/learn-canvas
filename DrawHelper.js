var CanvasHelper = (function() {
    'use strict';

    function windowToCanvas(ctx, x, y) {
        var canvas = ctx.canvas;
        var box = canvas.getBoundingClientRect();
        return {
            x: (x - box.left) * (canvas.width / box.width),
            y: (y - box.top) * (canvas.height / box.height)
        };
    }

    function imageDataToDataUrl(imageData) {
        var canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        var ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

    function drawGrid(ctx, color, stepX, stepY) {
        var x, y;
        var canvas = ctx.canvas;
        var width = canvas.width;
        var height = canvas.height;

        function drawLine(loc, type) {
            ctx.beginPath();
            if (type === 'horizontal') {
                ctx.moveTo(loc, 0);
                ctx.lineTo(loc, height);
            } else {
                ctx.moveTo(0, loc);
                ctx.lineTo(width, loc);
            }
            ctx.stroke();
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = .5;
        for (x = stepX + .5; x < width; x += stepX) drawLine(x, 'horizontal');
        for (y = stepY + .5; y < height; y += stepY) drawLine(y, 'vertical');
    }

    function drawDashLine(ctx, startPoint, endPoint, dashLength) {
        dashLength = dashLength === void(0) ? 5 : dashLength;

        var deltaX = endPoint.x - startPoint.x;
        var deltaY = endPoint.y - startPoint.y;
        var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

        ctx.beginPath();
        for (var i = 0; i < numDashes; i++) {
            ctx[i % 2 === 0 ? 'moveTo' : 'lineTo'](startPoint.x + (deltaX / numDashes) * i, startPoint.y + (deltaY / numDashes) * i);
        }
        ctx.stroke();
    }

    function findVertices(topLeftPoint, bottomRightPoint) {
        var minX, minY, maxX, maxY;
        if (topLeftPoint.x > bottomRightPoint.x) {
            minX = bottomRightPoint.x;
            maxX = topLeftPoint.x;
        } else {
            minX = topLeftPoint.x;
            maxX = bottomRightPoint.x;
        }

        if (topLeftPoint.y > bottomRightPoint.y) {
            minY = bottomRightPoint.y;
            maxY = topLeftPoint.y;
        } else {
            minY = topLeftPoint.y;
            maxY = bottomRightPoint.y;
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

    function drawDashRect(ctx, topLeftPoint, bottomRightPoint, dashLength) {
        var points = findVertices(topLeftPoint, bottomRightPoint);
        drawDashLine(ctx, points['lt'], points['rt'], dashLength);
        drawDashLine(ctx, points['lb'], points['rb'], dashLength);
        drawDashLine(ctx, points['lt'], points['lb'], dashLength);
        drawDashLine(ctx, points['rt'], points['rb'], dashLength);
    }

    return {
        windowToCanvas: windowToCanvas,
        findVertices: findVertices,
        drawGrid: drawGrid,
        drawDashLine: drawDashLine,
        drawDashRect: drawDashRect,
        imageDataToDataUrl: imageDataToDataUrl
    };
})();