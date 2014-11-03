define(
	['Cell', 'Rectangle'],
	function(Cell, Rectangle) {
		"use strict";

		function Map(texture)
		{
			this.size = 10;
			this.cells = [];
			this.tileSize = 85;
			this.paddingX = 0;
			this.paddingY = 0;
			this.width = 0;
			this.height = 0;
			this.texture = texture;
		}

		Map.prototype.figureTileSize = function(canvas) {
			if(canvas.width >= canvas.height)
			{
				this.tileSize = ((canvas.width - 2 * this.paddingX) / this.size);
			}
			else
			{
				this.tileSize = ((canvas.height - 2 * this.paddingX) / this.size);
			}
			this.width = canvas.width;
			this.height = canvas.height;
		};

		Map.prototype.slide = function(paddingX, paddingY) {
			this.paddingX = paddingX;
			this.paddingY = paddingY;
		};

		Map.prototype.zoom = function(tileSize, paddingX, paddingY) {
			for (var i in this.cells) 
			{
				// this.cells[i].tile.rectangle.origin.x -= this.paddingX;
				this.cells[i].tile.rectangle.origin.x /= this.tileSize;
				this.cells[i].tile.rectangle.origin.x *= tileSize;
				// this.cells[i].tile.rectangle.origin.x += this.paddingX ;

				// this.cells[i].tile.rectangle.origin.y -= this.paddingY;
				this.cells[i].tile.rectangle.origin.y /= this.tileSize;
				this.cells[i].tile.rectangle.origin.y *= tileSize;
				// this.cells[i].tile.rectangle.origin.y += paddingY;

				this.cells[i].tile.rectangle.width /= this.tileSize;
				this.cells[i].tile.rectangle.width *= tileSize;

				this.cells[i].tile.rectangle.height /= this.tileSize;
				this.cells[i].tile.rectangle.height *= tileSize;

				this.cells[i].tile.rectangle.process();
				// this.cells[i].tile.process(this.cells[i].tile.rectangle.width, this.cells[i].tile.rectangle.height);
			};

			this.tileSize = tileSize;
			// this.width = this.tileSize * this.size/2;
			// this.height = this.tileSize * this.size/2;
			// this.paddingX = paddingX;
			// this.paddingY = paddingY;
		};
		
		Map.prototype.generate = function(texture)
		{
			this.cells = [];
			var tmp = true;
			var pasY = 1;

			for (var y = 0; y < this.size/2; y += 1/2)
			{
				for (var x = -y; x <= y; x ++)
				{

					this.cells.push(
								new Cell(
									texture,
									new Rectangle(
										 (this.size/2 + x) * this.tileSize, 
										 y * pasY * this.tileSize, 
										this.tileSize, 
										this.tileSize
									)
								)
							);
				};
			};

			for (var y = this.size/2; y <= this.size; y += 1/2)
			{
				for (var x = -this.size+y; x <= -y + this.size; x ++)
				{

					this.cells.push(
								new Cell(
									texture,
									new Rectangle(
										 (this.size/2 + x) * this.tileSize, 
										 y * pasY * this.tileSize, 
										this.tileSize, 
										this.tileSize
									)
								)
							);
				};
			};
		};

		Map.prototype.clear = function(canvas)
		{
			canvas.context.clearRect(this.paddingX- this.tileSize * this.size, this.paddingY -  this.tileSize * this.size, this.tileSize * this.size * 4, this.tileSize * this.size * 4 );
		};

		Map.prototype.getUnderlying = function(point)
		{
			point.x = point.x - this.paddingX;
			point.y = point.y - this.paddingY;
			var underlying = {"notUnderlyingCell": []};
			for (var i in this.cells) 
			{
				if(this.cells[i].tile.rectangle.inside(point))
				{
					underlying.underlyingCell = this.cells[i];
				}
				else
				{
					underlying.notUnderlyingCell.push(this.cells[i]);
				}
			};
			return underlying;
		};

		Map.prototype.draw = function(context)
		{
			if(this.width > this.height)
			{
				context.drawImage(this.texture.image, 0, 0, this.width, this.texture.image.height * this.width / this.texture.image.width);
			}
			else
			{
				context.drawImage(this.texture.image, 0, 0, this.texture.image.width * this.height / this.texture.image.height, this.height );
			}
		
			for (var i in this.cells) 
			{
				this.cells[i].draw(context);
				this.cells[i].drawBuilding(context);
			};
		};

		return Map;
	}
);
