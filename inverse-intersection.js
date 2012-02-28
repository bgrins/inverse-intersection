
var inverseIntersection = (function() {

    var max = Math.max;
    var min = Math.min;
    
    function intersection(r1, r2) {
    
        var x0 = max(r1.left, r2.left);
        var x1 = min(r1.left + r1.width, r2.left + r2.width);
        var y0 = max(r1.top, r2.top);
        var y1 = min(r1.top + r1.height, r2.top + r2.height);

        if (x0 <= x1 && y0 <= y1) {
            return {
                left: x0,
                top: y0,
                width: x1 - x0,
                height: y1 - y0
            };
        }
        
        return false;
    }
    
    function filterWithArea(rectangles) {

        for (var output = [], i = 0; i < rectangles.length; i++) {
            if (rectangles[i].width > 0 && rectangles[i].height > 0) {
                output.push(rectangles[i]);
            }
        }
        
        return output;
    }
    
    function splitRectangleOnIntersection(r, mask) {
        
        var inter = intersection(mask, r);
        
        if (!inter) {
            return [r];
        }
        
        // If there is an intersection, return 4 rectangles surrounding this box
        return filterWithArea([
            { 
                left: r.left, 
                top: r.top, 
                width: r.width, 
                height: inter.top - r.top
            },
            { 
                left: r.left, 
                top: inter.top + inter.height, 
                width: r.width, 
                height: (r.top + r.height) - (inter.top + inter.height)
            },
            {
                left: r.left,
                top: inter.top,
                width: inter.left - r.left,
                height: inter.height
            },
            {
                left: inter.left + inter.width,
                top: inter.top,
                width: (r.left + r.width) - (inter.left + inter.width), height: inter.height
            }
        ]);
    }
    
    return function (parentRectangle, childRectangles) {
        
        if (!childRectangles.length) {
            return [];
        }
        
        var outputRectangles = [parentRectangle];
        
        for (var i = 0; i < childRectangles.length; i++) {
            for (var j = 0, newRectangles = []; j < outputRectangles.length; j++) {
                newRectangles = newRectangles.concat(
                    splitRectangleOnIntersection(outputRectangles[j], childRectangles[i])
                );
            }
            
            outputRectangles = newRectangles;
        }
        
        return outputRectangles;
    };
    
})();