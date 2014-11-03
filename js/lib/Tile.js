define(
	[],
	function() {
		"use strict";

		function Tile(texture, rectangle)
		{
			this.texture = texture;
			this.rectangle = rectangle;
		}

		Tile.prototype.draw = function(context)
		{
			context.drawImage(this.texture.image, this.rectangle.origin.x, this.rectangle.origin.y,  this.rectangle.width, this.rectangle.height);
		};

		Tile.prototype.drawStroke = function(context)
		{
			context.beginPath();
			context.strokeStyle ='#000000';
			context.moveTo(this.rectangle.origin.x, this.rectangle.origin.y + this.rectangle.height/2);
			context.lineTo(this.rectangle.origin.x + this.rectangle.width/2, this.rectangle.origin.y);
			context.lineTo(this.rectangle.origin.x + this.rectangle.width, this.rectangle.origin.y+ this.rectangle.height/2);
			context.lineTo(this.rectangle.origin.x + this.rectangle.width/2, this.rectangle.origin.y+ this.rectangle.height);
			context.lineTo(this.rectangle.origin.x, this.rectangle.origin.y + this.rectangle.height/2);
			context.stroke();

			// context.beginPath();
			// context.strokeStyle ='#ff0000';
			// context.rect(this.rectangle.origin.x, this.rectangle.origin.y, this.rectangle.width, this.rectangle.height);
			// context.stroke();
			// context.drawImage(this.texture.image, this.rectangle.origin.x, this.rectangle.origin.y,  this.rectangle.width, this.rectangle.height);
		};

		return Tile;
	}
);
