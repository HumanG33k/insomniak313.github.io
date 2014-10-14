define(
	[],
	function() {
		"use strict";

		function Tile(src, rectangle)
		{
			this.image = new Image();
			this.image.src = src;
			this.rectangle = rectangle;
		}

		Tile.prototype.draw = function(context, eventHandler)
		{
			context.drawImage(this.image, this.rectangle.origin.x, this.rectangle.origin.y,  this.rectangle.width, this.rectangle.height);
		};

		return Tile;
	}
);
