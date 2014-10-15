define(
	['Map', 'Player'],
	function(Map, Player) {
		"use strict";

		function PhysicEngine(game)
		{
			this.game   = game;
			this.map    = new Map();
			this.player = new Player("Inso","mdp", "adrien.fournie@gmail.com");
		}

		PhysicEngine.prototype.build = function()
		{
			this.map.generate(this.game.graphicEngine.textureHolder.getTexture('grass'));
		};

		return PhysicEngine;
	}
);
