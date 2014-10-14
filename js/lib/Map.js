define(
	['Cell', 'Rectangle'],
	function(Cell, Rectangle) {
		"use strict";

		function Map()
		{
			this.size = 6;
			this.cells = [];
			this.tileSize = 60;
			this.paddingX = 100;
			this.paddingY = 100;
		}

		Map.prototype.figureTileSize = function(canvas) {
			if(canvas.width >= canvas.height)
			{
				this.tileSize = (canvas.width - 2 * this.paddingX) / this.size;
			}
			else
			{
				this.tileSize = (canvas.height - 2 * this.paddingX) / this.size;
			}
		};

		Map.prototype.regenerate = function(tileSize, paddingX, paddingY) {
			for (var i in this.cells) 
			{
				// console.log(this.cells[i].tile.rectangle.origin.x);
				// console.log(this.paddingX);

				this.cells[i].tile.rectangle.origin.x -= this.paddingX;
				this.cells[i].tile.rectangle.origin.x /= this.tileSize;
				this.cells[i].tile.rectangle.origin.x *= tileSize;
				this.cells[i].tile.rectangle.origin.x += paddingX;

				// console.log(paddingX);
				// console.log(this.cells[i].tile.rectangle.origin.x);

				this.cells[i].tile.rectangle.origin.y -= this.paddingY;
				this.cells[i].tile.rectangle.origin.y /= this.tileSize;
				this.cells[i].tile.rectangle.origin.y *= tileSize;
				this.cells[i].tile.rectangle.origin.y += paddingY;

				this.cells[i].tile.rectangle.width /= this.tileSize;
				this.cells[i].tile.rectangle.width *= tileSize;

				this.cells[i].tile.rectangle.height /= this.tileSize;
				this.cells[i].tile.rectangle.height *= tileSize;


			};

			this.tileSize = tileSize;
			this.paddingX = paddingX;
			this.paddingY = paddingY;
		};
		
		Map.prototype.generate = function()
		{
			this.cells = [];
			var tmp = true;
			var pasY = 0.58;

			for (var y = 0; y <= this.size * 1/2; y += 1/2)
			{
				for (var x = 0; x <= y; x ++)
				{
					if(tmp)
					{
						if(y !== 0 && x!== 0)
						{
							this.cells.push(
								new Cell(
									'img/image_grass_iso.png',
									new Rectangle(
										this.paddingX + ((2-x)) * this.tileSize, 
										this.paddingY + y * pasY * this.tileSize, 
										this.tileSize, 
										this.tileSize
									)
								)
							);
						}

						this.cells.push(
							new Cell(
								'img/image_grass_iso.png',
								new Rectangle(
									this.paddingX + ((x-1) + this.size/2) * this.tileSize, 
									this.paddingY + y * pasY * this.tileSize, 
									this.tileSize, 
									this.tileSize
								)
							)
						);
					}
					else
					{
						this.cells.push(
							new Cell(
								'img/image_grass_iso.png',
								new Rectangle(
									this.paddingX + ((-x+3/2)) * this.tileSize, 
									this.paddingY + y * pasY * this.tileSize, 
									this.tileSize, 
									this.tileSize
								)
							)
						);

						this.cells.push(
							new Cell(
								'img/image_grass_iso.png',
								new Rectangle(
									this.paddingX + ((x-1/2)+ this.size/2) * this.tileSize, 
									this.paddingY + y * pasY* this.tileSize, 
									this.tileSize, 
									this.tileSize
								)
							)
						);
					}	
				};
				tmp = !tmp;
			};

			tmp = true;

			for (var y = 0 ; y <= this.size * 1/2 ; y += 1/2)
			{
				for (var x = 0; x <= this.size / 2 - y; x ++)
				{
					if(tmp)
					{
						if(x !== 0)
						{
							this.cells.push(
								new Cell(
									'img/image_grass_iso.png',
									new Rectangle(
										this.paddingX + ((2-x)) * this.tileSize, 
										this.paddingY + (y * pasY  + (this.size* pasY)/2) * this.tileSize, 
										this.tileSize, 
										this.tileSize
									)
								)
							);
						}

						this.cells.push(
							new Cell(
								'img/image_grass_iso.png',
								new Rectangle(
									this.paddingX + ((x-1) + this.size/2) * this.tileSize, 
									this.paddingY + (y * pasY + (this.size* pasY)/2) * this.tileSize, 
									this.tileSize, 
									this.tileSize
								)
							)
						);


					}
					else
					{
						this.cells.push(
							new Cell(
								'img/image_grass_iso.png',
								new Rectangle(
									this.paddingX + ((-x+3/2)) * this.tileSize, 
									this.paddingY + (y* pasY+(this.size* pasY)/2) * this.tileSize, 
									this.tileSize, 
									this.tileSize
								)
							)
						);

						this.cells.push(
							new Cell(
								'img/image_grass_iso.png',
								new Rectangle(
									this.paddingX + ((x-1/2)+ this.size/2) * this.tileSize, 
									this.paddingY + (y* pasY+(this.size* pasY)/2) * this.tileSize, 
									this.tileSize, 
									this.tileSize
								)
							)
						);
					}
					
				};
				tmp = !tmp;
			};
		};

		Map.prototype.clear = function(canvas)
		{
			canvas.context.clearRect(this.paddingX- this.tileSize * this.size/2, this.paddingY -  this.tileSize * this.size/2, this.tileSize * this.size * 2, this.tileSize * this.size * 2 );
		};

		Map.prototype.getUnderlying = function(point)
		{
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

		Map.prototype.draw = function(context, eventHandler)
		{
			for (var i in this.cells) 
			{
				this.cells[i].draw(context, eventHandler);
				this.cells[i].drawBuilding(context, eventHandler);
			};
		};

		return Map;
	}
);
