define(
	['TextureHolder'],
	function(TextureHolder) {
		"use strict";

		function GraphicEngine(game)
		{
			this.game   = game;
			this.textureHolder = new TextureHolder();
			this.textureHolder.init();
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
			this.game.physicEngine.map.draw(this.game.canvasHolder.getCanvas('preprocessing_layer').context);
		};

		GraphicEngine.prototype.drawPlayer = function()
		{
			this.game.physicEngine.player.draw(this.game.canvasHolder.getCanvas('ressource_layer').context);
		};

		GraphicEngine.prototype.drawBuildingHolder = function()
		{
			this.game.gameEngine.drawBuildingHolder(this.game.canvasHolder.getCanvas('building_layer').context);
		};

		GraphicEngine.prototype.drawResourceHolder = function()
		{
			this.game.gameEngine.drawResourceHolder(this.game.canvasHolder.getCanvas('ressource_layer').context);
		};

		return GraphicEngine;
	}
);
