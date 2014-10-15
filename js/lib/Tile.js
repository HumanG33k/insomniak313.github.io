define(
	[],
	function() {
		"use strict";

		function Tile(texture, rectangle)
		{
			this.texture = texture;
			this.rectangle = rectangle;
		}

		Tile.prototype.draw = function(context)
		{
			context.drawImage(this.texture.image, this.rectangle.origin.x, this.rectangle.origin.y,  this.rectangle.width, this.rectangle.height);
		};

		return Tile;
	}
);
