define(
	['Tile'],
	function(Tile) {
		"use strict";

		function Resource(name, value, currency, texture, rectangle)
		{
			this.name     = name;
			this.value    = value;
			this.currency = currency;
			this.tile     = new Tile(texture, rectangle);
		}

		Resource.prototype.draw = function(context)
		{
			this.tile.draw(context);
			
			context.font = '18pt Calibri';
			context.fillStyle = 'black';
			context.clearRect(this.tile.rectangle.origin.x + this.tile.rectangle.width, this.tile.rectangle.origin.y, 200, 40);
			context.fillText(this.value + ' ' + this.currency, this.tile.rectangle.origin.x + this.tile.rectangle.width + 5, this.tile.rectangle.origin.y + (this.tile.rectangle.height/2) + 5);
		};

		return Resource;
	}
);
