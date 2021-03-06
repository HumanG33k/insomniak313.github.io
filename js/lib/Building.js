define(
	['Tile'],
	function(Tile) {
		"use strict";

		function Building(name, cost, currency, texture, rectangle)
		{
			this.name     = name;
			this.cost     = cost;
			this.currency = currency;
			this.tile     = new Tile(texture, rectangle);
			this.active   = false;
		}

		Building.prototype.getTile = function() {
			return this.tile;
		};

		Building.prototype.draw = function(context)
		{
			this.tile.draw(context);
			context.font = '18pt Calibri';
			context.fillStyle = 'black';
			context.clearRect(this.tile.rectangle.origin.x + this.tile.rectangle.width, this.tile.rectangle.origin.y, 200, this.tile.rectangle.height);
			context.fillText(this.cost + ' ' + this.currency, this.tile.rectangle.origin.x + this.tile.rectangle.width + 5, this.tile.rectangle.origin.y + (this.tile.rectangle.height / 2) + 5);
			if(this.active)
			{
				context.rect(this.tile.rectangle.origin.x + this.tile.rectangle.width + 5 , this.tile.rectangle.origin.y + 5, 100, this.tile.rectangle.height - 10);
				context.stroke();
			}
		};

		return Building;
	}
);
