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
			this.drawGUI();
		};

		GraphicEngine.prototype.drawMap = function()
		{
			this.game.physicEngine.map.draw(this.game.canvasHolder.getCanvas('game_map').context, this.eventHandler);
		};

		GraphicEngine.prototype.drawPlayer = function()
		{
			this.game.physicEngine.player.draw(this.game.canvasHolder.getCanvas('game_gui').context, this.eventHandler);
		};

		GraphicEngine.prototype.drawGUI = function()
		{
			this.game.gameEngine.draw(this.game.canvasHolder.getCanvas('game_gui').context, this.eventHandler);
		};

		return GraphicEngine;
	}
);
