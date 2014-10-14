define(
	['Point'],
	function(Point) {
		"use strict";

		function Rectangle(x, y, width, height)
		{
			this.origin = new Point(x, y);
			this.width  = width;
			this.height = height;

			this.process();
		}

		Rectangle.prototype.process = function() {
			this.top    = this.origin.y;
			this.right  = this.origin.x + this.width;
			this.bottom = this.origin.y + this.height;
			this.left   = this.origin.x;
			this.middle = new Point(this.origin.x + this.width/2, this.origin.y + this.height/2);
		};

		Rectangle.prototype.intersect = function(rectangle) 
		{
			return !(this.left > rectangle.right || this.right < rectangle.left || this.top > rectangle.bottom || this.bottom < rectangle.top);
		};

		Rectangle.prototype.inside = function(point)
		{
			return (this.left <= point.x && point.x <= this.right && this.bottom >= point.y && point.y >= this.top);
		};

		Rectangle.prototype.insideLosange = function(point) {

			if(point.x >= this.middle.x && point.y >= this.middle.y)
			{
				return (point.x + point.y <= 1 - this.middle.x - this.middle.y);
			}
			// else if(point.x <= this.middle.x && point.y >= this.middle.y)
			// {
			// 	return (point.y - point.x <= 1 - this.middle.x - this.middle.y);
			// }
			// else if(point.x <= this.middle.x && point.y <= this.middle.y)
			// {
			// 	return (point.y + point.x <= -1 - this.middle.x - this.middle.y);
			// }
			// else if(point.x >= this.middle.x && point.y <= this.middle.y)
			// {
			// 	return (point.y - point.x <= -1 - this.middle.x - this.middle.y);
			// }
		};

		return Rectangle;
	}
);
