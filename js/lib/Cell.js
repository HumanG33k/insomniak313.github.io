define(
	['Tile', 'Building', 'Rectangle'],
	function(Tile, Building, Rectangle) {
		"use strict";

		function Cell(src, rectangle)
		{
			this.tile      = new Tile(src, rectangle);
			this.hover     = false;
			this.active    = false;
			this.building  = null;
		}

		Cell.prototype.setBuilding = function(building) {
			this.building = building;
		};

		Cell.prototype.draw = function(context, eventHandler)
		{
			// if(this.active)
			// {
			// 	this.tile.image.src = 'img/image_grass_iso_active.png';
			// }
			// else if(this.hover)
			// {
			// 	this.tile.image.src = 'img/image_grass_iso_hover.png';
			// }
			// else
			// {
			// 	this.tile.image.src = 'img/image_grass_iso.png';
			// }
			this.tile.draw(context, eventHandler);
		};

		Cell.prototype.drawBuilding = function(context, eventHandler)
		{
			if(this.building !== null)
			{
				this.building.getTile().draw(context, eventHandler);
			}
		};

		return Cell;
	}
);
