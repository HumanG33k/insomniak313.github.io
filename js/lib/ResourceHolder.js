define(
	['Resource', 'Rectangle'],
	function(Resource, Rectangle) {
		"use strict";

		function ResourceHolder()
		{
			this.resources = [];
		}

		ResourceHolder.prototype.addResource = function(game, name, value, currency, texture)
		{
			this.resources.push(
				new Resource(
					name, 
					value, 
					currency, 
					texture, 
					new Rectangle(
						game.canvasHolder.getCanvas('map_layer').width/4 * (this.resources.length + 1),
						10, 
						40, 
						40
						)
					)
				);
		};

		ResourceHolder.prototype.draw = function(context)
		{
			for (var r in this.resources) {
				this.resources[r].draw(context);
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
