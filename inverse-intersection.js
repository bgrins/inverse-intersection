
var inverseIntersection = (function() {

	function intersection(r1, r2) {
		var x0 = Math.max(r1.left, r2.left);
		var x1 = Math.min(r1.left + r1.width, r2.left + r2.width);

		if (x0 <= x1) {
			var y0 = Math.max(r1.top, r2.top);
			var y1 = Math.min(r1.top + r1.height, r2.top + r2.height);

			if (y0 <= y1) {
				return {
					left: x0,
					top: y0,
					width: x1 - x0,
					height: y1 - y0
				};
			}
		}
		
		return false;
	}
	
	function filterWithArea(rectangles) {
		var output = [];
		
		for (var i = 0; i < rectangles.length; i++) {
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
		var rectangles = filterWithArea([
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
		
		return rectangles;
	}
	
	return function (parentBounds, allBounds) {
		
		if (!allBounds.length) {
			return [];
		}
		
		var outputBounds = [parentBounds];
		
		for (var i = 0; i < allBounds.length; i++) {
			var newOutputs = [];
			for (var j = 0; j < outputBounds.length; j++) {
				var inters = splitRectangleOnIntersection(outputBounds[j], allBounds[i]);
				newOutputs = newOutputs.concat(inters);
			}
			outputBounds = newOutputs;
		}
		
		return outputBounds;
	};
	
})();