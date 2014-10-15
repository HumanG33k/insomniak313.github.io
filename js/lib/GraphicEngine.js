define(
	[],
	function() {
		"use strict";

		function GraphicEngine(game)
		{
			this.game   = game;
		}

		GraphicEngine.prototype.draw = function() {
			this.drawMap();
			this.drawPlayer();
			this.drawBuildingHolder();
			this.drawResourceHolder();
		};

		GraphicEngine.prototype.drawMap = function()
		{
			this.game.canvasHolder.getCanvas('map_layer').context.drawImage(
				this.game.canvasHolder.getCanvas('preprocessing_layer').domCanvas,
				this.game.physicEngine.map.paddingX, 
				this.game.physicEngine.map.paddingY
				);
		};

		GraphicEngine.prototype.drawMapPreprocessing = function()
		{
			this.game.physicEngine.map.draw(this.game.canvasHolder.getCanvas('preprocessing_layer').context, this.eventHandler);
		};

		GraphicEngine.prototype.drawPlayer = function()
		{
			this.game.physicEngine.player.draw(this.game.canvasHolder.getCanvas('ressource_layer').context, this.eventHandler);
		};

		GraphicEngine.prototype.drawBuildingHolder = function()
		{
			this.game.physicEngine.player.drawBuildingHolder(this.game.canvasHolder.getCanvas('building_layer').context, this.eventHandler);
		};

		GraphicEngine.prototype.drawResourceHolder = function()
		{
			this.game.gameEngine.draw(this.game.canvasHolder.getCanvas('ressource_layer').context, this.eventHandler);
		};

		return GraphicEngine;
	}
);
