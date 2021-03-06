define(
	['Building', 'Rectangle'],
	function(Building, Rectangle) {
		"use strict";

		function BuildingHolder()
		{
			this.buildings = [];
		}

		BuildingHolder.prototype.init = function(game, texture1, texture2) {
			this.addBuilding(game, 'Batiment', 10, '$', texture1);
			this.addBuilding(game, 'Batiment', 20, '$', texture2);
		};

		BuildingHolder.prototype.addBuilding = function(game, name, cost, currency, src)
		{
			this.buildings.push(new Building(name, cost, currency, src, new Rectangle(game.canvasHolder.getCanvas('ressource_layer').width - 200, 40 + 60 * this.buildings.length, 50, 50)));
		};

		BuildingHolder.prototype.desactivateBuildings = function() {
			for (var i in this.buildings) 
			{
				this.buildings[i].active = false;
			};
		};
		
		BuildingHolder.prototype.draw = function(context)
		{
			for (var r in this.buildings) {
				this.buildings[r].draw(context);
			};
		};

		BuildingHolder.prototype.getUnderlying = function(point)
		{
			var underlying = {"notUnderlyingBuilding": []};
			for (var i in this.buildings) 
			{
				if(this.buildings[i].tile.rectangle.inside(point))
				{
					underlying.underlyingBuilding = this.buildings[i];
				}
				else
				{
					underlying.notUnderlyingBuilding.push(this.buildings[i]);
				}
			};
			return underlying;
		};

		return BuildingHolder;
	}
);
