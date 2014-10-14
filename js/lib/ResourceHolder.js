define(
	['Resource', 'Rectangle'],
	function(Resource, Rectangle) {
		"use strict";

		function ResourceHolder()
		{
			this.resources = [];
		}

		ResourceHolder.prototype.addResource = function(game, name, value, currency, src)
		{
			this.resources.push(
				new Resource(
					name, 
					value, 
					currency, 
					src, 
					new Rectangle(
						game.canvasHolder.getCanvas('game_map').width/4 * (this.resources.length + 1),
						10, 
						40, 
						40
						)
					)
				);
		};

		ResourceHolder.prototype.draw = function(context, eventHandler)
		{
			for (var r in this.resources) {
				this.resources[r].draw(context, eventHandler);
			};
		};

		ResourceHolder.prototype.getResource = function(name)
		{
			for (var r in this.resources) {
				if(this.resources[r].name == name)
				{
					return this.resources[r];
				}
			};
		};

		return ResourceHolder;
	}
);
