// inverse-intersection.js
// https://github.com/bgrins/inverse-intersection
// MIT License - Brian Grinstead

var inverseIntersection = (function() {

    var max = Math.max;
    var min = Math.min;

    // Computes the intersection of both rectangle parameters.
    // If there is no intersection, returns false.
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

    // A filter function for rectangles.
    // Take the input array and return only rectangles that have an area.
    function filterWithArea(rectangles) {

        for (var output = [], i = 0; i < rectangles.length; i++) {
            if (rectangles[i].width > 0 && rectangles[i].height > 0) {
                output.push(rectangles[i]);
            }
        }

        return output;
    }

    // If there is an intersection between the child and parent rectangle,
    // return all surrounding rectangles that contain an area.
    // If there is no intersection, return an array containing only the child.
    function splitRectangleOnIntersection(r, mask) {

        var inter = intersection(mask, r);

        if (!inter) {
            return [r];
        }

        // There will be up to 4 rectangles surrounding this box.
        // Only include ones with an area, since empty ones won't create any future intersections.
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

    // Takes a parent rectangle and an array of child rectangles and returns an array
    // of non-overlapping rectangles that cover the inverse of the original set.
    // A rectangle is defined as an object that contains 'width', 'height', 'left', and 'right' properties.
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
