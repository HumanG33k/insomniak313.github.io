define(
	['Tile'],
	function(Tile) {
		"use strict";

		function Building(name, cost, currency, src, rectangle)
		{
			this.name     = name;
			this.cost     = cost;
			this.currency = currency;
			this.tile     = new Tile(src, rectangle);
			this.active   = false;
		}

		Building.prototype.getTile = function() {
			return this.tile;
		};

		Building.prototype.draw = function(context, eventHandler)
		{
			this.tile.draw(context, eventHandler);
			context.font = '18pt Calibri';
			context.fillStyle = 'black';
			context.clearRect(this.tile.rectangle.origin.x + this.tile.rectangle.width, this.tile.rectangle.origin.y, 200, this.tile.rectangle.height);
			context.fillText(this.cost + ' ' + this.currency, this.tile.rectangle.origin.x + this.tile.rectangle.width + 5, this.tile.rectangle.origin.y + (this.tile.rectangle.height / 2) + 5);
		};

		return Building;
	}
);
