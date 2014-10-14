define(
	['Building', 'Rectangle', 'ResourceHolder'],
	function (Building,Rectangle, ResourceHolder) {
		"use strict";

		function GameEngine(game)
		{
			this.game  = game;
		}

		GameEngine.prototype.addRessourceHolder = function() {
			this.resourceHolder = new ResourceHolder();
			this.resourceHolder.addResource(this.game, 'Or', 1000, '$', 'img/money.png');
			this.resourceHolder.addResource(this.game, 'Habitants', 0, '', 'img/manicon.png');
			this.resourceHolder.addResource(this.game, 'Temps', 0, '', 'img/time.png');
		};

		GameEngine.prototype.addBuilding = function(cell) {
			for(var i in this.game.physicEngine.player.buildingHolder.buildings)
			{
				if(this.game.physicEngine.player.buildingHolder.buildings[i].active)
				{
					this.resourceHolder.getResource('Or').value -= this.game.physicEngine.player.buildingHolder.buildings[i].cost;
					this.resourceHolder.getResource('Habitants').value += this.game.physicEngine.player.buildingHolder.buildings[i].cost;

					cell.setBuilding(
						new Building(
							this.game.physicEngine.player.buildingHolder.buildings[i].name,
					 		this.game.physicEngine.player.buildingHolder.buildings[i].cost, 
							this.game.physicEngine.player.buildingHolder.buildings[i].currency,
							this.game.physicEngine.player.buildingHolder.buildings[i].tile.image.src,
				  			new Rectangle(
				  				this.game.physicEngine.player.buildingHolder.buildings[i].tile.rectangle.x,
								this.game.physicEngine.player.buildingHolder.buildings[i].tile.rectangle.y, 
								this.game.physicEngine.player.buildingHolder.buildings[i].tile.rectangle.width, 
								this.game.physicEngine.player.buildingHolder.buildings[i].tile.rectangle.height
								)
				  			)
						);

					cell.building.tile.rectangle = cell.tile.rectangle;
				}
			};
		};

		GameEngine.prototype.draw = function(context, eventHandler) {
			this.resourceHolder.draw(context, eventHandler);
		};


		return GameEngine;
	}
);
