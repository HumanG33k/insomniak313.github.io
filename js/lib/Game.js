define(
	['PhysicEngine', 'GraphicEngine', 'GameEngine', 'CanvasHolder', 'Canvas', 'EventHandler'],
	function (PhysicEngine, GraphicEngine, GameEngine, CanvasHolder, Canvas, EventHandler) {
		"use strict";

		// test pour commit
		function Game()
		{
			this.canvasHolder  = new CanvasHolder();
			this.canvasHolder.addCanvas(new Canvas("game_map"));
			this.canvasHolder.addCanvas(new Canvas("game_gui"));

			this.physicEngine  = new PhysicEngine(this);
			this.graphicEngine = new GraphicEngine(this);
			this.gameEngine    = new GameEngine(this);
			this.eventHandler  = new EventHandler(this);
			this.tick = 0;
		}

		Game.prototype.launchEventListeners = function ()
		{
			this.eventHandler.handleAll(this.game);
		};

		Game.prototype.refresh = function()
		{
			if(this.tick%60==0)
			{
				this.gameEngine.resourceHolder.getResource('Temps').value++;
			}
			this.tick++;
			this.graphicEngine.draw();
		};

		Game.prototype.init = function()
		{
			this.launchEventListeners();
			this.physicEngine.build();
			this.gameEngine.addRessourceHolder();

			var t = this;
			// 1000 / 60
			setInterval(function(){t.refresh();}, 16); // 60 FPS
		};

		return Game;
	}
);
