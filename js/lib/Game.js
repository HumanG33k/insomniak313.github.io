define(
	['PhysicEngine', 'GraphicEngine', 'GameEngine', 'CanvasHolder', 'Canvas', 'EventHandler'],
	function (PhysicEngine, GraphicEngine, GameEngine, CanvasHolder, Canvas, EventHandler) {
		"use strict";

		// test pour commit
		function Game()
		{
			this.canvasHolder  = new CanvasHolder();
			this.canvasHolder.addCanvas(new Canvas("map_layer"));
			this.canvasHolder.addCanvas(new Canvas("ressource_layer"));
			this.canvasHolder.addCanvas(new Canvas("building_layer"));
			this.canvasHolder.addCanvas(new Canvas("preprocessing_layer"));

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
			this.physicEngine.build();
			this.launchEventListeners();
			this.gameEngine.addRessourceHolder();
			this.gameEngine.addBuildingHolder();
			
			var t = this;
			// 1000 / 60
			setInterval(function(){t.refresh();}, 16); // 60 FPS
		};

		return Game;
	}
);
