define(
	['Building', 'Rectangle', 'ResourceHolder', 'BuildingHolder'],
	function (Building,Rectangle, ResourceHolder, BuildingHolder) {
		"use strict";

		function GameEngine(game)
		{
			this.game  = game;
		}

		GameEngine.prototype.addRessourceHolder = function()
		{
			this.resourceHolder = new ResourceHolder();
			this.resourceHolder.addResource(this.game, 'Or', 1000, '$', this.game.graphicEngine.textureHolder.getTexture('Or'));
			this.resourceHolder.addResource(this.game, 'Habitants', 0, '', this.game.graphicEngine.textureHolder.getTexture('Habitants'));
			this.resourceHolder.addResource(this.game, 'Temps', 0, '', this.game.graphicEngine.textureHolder.getTexture('Temps'));
		};

		GameEngine.prototype.addBuildingHolder = function()
		{
			this.buildingHolder = new BuildingHolder();
			this.buildingHolder.init(this.game, this.game.graphicEngine.textureHolder.getTexture('building'), this.game.graphicEngine.textureHolder.getTexture('building_2'));
		};

		// Attention c'est pas la meme chose
		
		GameEngine.prototype.addBuilding = function(cell) 
		{
			for(var i in this.buildingHolder.buildings)
			{
				if(this.buildingHolder.buildings[i].active)
				{
					this.resourceHolder.getResource('Or').value -= this.buildingHolder.buildings[i].cost;
					this.resourceHolder.getResource('Habitants').value += this.buildingHolder.buildings[i].cost;

					cell.setBuilding(
						new Building(
							this.buildingHolder.buildings[i].name,
					 		this.buildingHolder.buildings[i].cost, 
							this.buildingHolder.buildings[i].currency,
							this.buildingHolder.buildings[i].tile.texture,
				  			new Rectangle(
				  				this.buildingHolder.buildings[i].tile.rectangle.x,
								this.buildingHolder.buildings[i].tile.rectangle.y, 
								this.buildingHolder.buildings[i].tile.rectangle.width, 
								this.buildingHolder.buildings[i].tile.rectangle.height
								)
				  			)
						);

					cell.building.tile.rectangle = cell.tile.rectangle;
				}
			};
		};

		GameEngine.prototype.drawResourceHolder = function(context)
		{
			this.resourceHolder.draw(context);
		};

		GameEngine.prototype.drawBuildingHolder = function(context)
		{
			this.buildingHolder.draw(context);
		};


		return GameEngine;
	}
);
