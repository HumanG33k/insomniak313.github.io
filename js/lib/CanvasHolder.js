define(
	[],
	function() {
		"use strict";

		function CanvasHolder()
		{
			this.canvas = [];
		}

		CanvasHolder.prototype.addCanvas = function(canvas)
		{
			this.canvas.push(canvas);
		};

		CanvasHolder.prototype.getCanvas = function(canvasId)
		{
			for (var c in this.canvas) {
				if(this.canvas[c].canvasId == canvasId)
				{
					return this.canvas[c];
				}
			};
		};

		return CanvasHolder;
	}
);
