define(
	['Tile', 'Building', 'Rectangle'],
	function(Tile, Building, Rectangle) {
		"use strict";

		function Cell(texture, rectangle)
		{
			this.tile      = new Tile(texture, rectangle);
			this.hover     = false;
			this.active    = false;
			this.building  = null;
		}

		Cell.prototype.setBuilding = function(building) {
			this.building = building;
		};

		Cell.prototype.draw = function(context)
		{
			this.tile.drawStroke(context);
		};

		Cell.prototype.drawBuilding = function(context)
		{
			if(this.building !== null)
			{
				this.building.getTile().draw(context);
			}
		};

		return Cell;
	}
);
