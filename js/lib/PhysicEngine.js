define(
	['Map', 'Player'],
	function(Map, Player) {
		"use strict";

		function PhysicEngine(game)
		{
			this.game   = game;
			this.map    = null;
			this.player = new Player("Inso","mdp", "adrien.fournie@gmail.com");
		}

		PhysicEngine.prototype.build = function()
		{
			this.map = new Map(this.game.graphicEngine.textureHolder.getTexture('ground'));
			this.map.generate(this.game.graphicEngine.textureHolder.getTexture('grass'));
		};

		return PhysicEngine;
	}
);
