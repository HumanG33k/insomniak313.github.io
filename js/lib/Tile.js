define(
	[],
	function() {
		"use strict";

		function Tile(src, rectangle, svg)
		{
			this.image = new Image();
			this.image.src = src;
			this.svg = svg;
			if(this.svg)
			{
				this.image.width = rectangle.width;
				this.image.height = rectangle.height;
			}
			this.rectangle = rectangle;
		}

		Tile.prototype.process = function(width, height) {
			console.log(this.image);
			this.image.width = width;
			this.image.height = height;
			console.log(this.image);
		};

		Tile.prototype.draw = function(context, eventHandler)
		{
			if(this.svg)
			{
				context.drawImage(this.image, this.rectangle.origin.x, this.rectangle.origin.y);
			}
			else
			{
				context.drawImage(this.image, this.rectangle.origin.x, this.rectangle.origin.y,  this.rectangle.width, this.rectangle.height);
			}
		};

		return Tile;
	}
);
