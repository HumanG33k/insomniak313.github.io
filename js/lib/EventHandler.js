define(
	['Point'],
	function(Point) {
		"use strict";

		function EventHandler(game)
		{
			this.game      = game;
			this.mousePosX = 0;
			this.mousePosY = 0;
			this.mouseDown = false;
		}

		EventHandler.prototype.handleAll = function() {
			this.handleResize(this.game);
			// this.handleCellClick(this.game);
			// this.handleCellMouseOver(this.game);
			this.handleBuildingClick(this.game);
			this.handleKeyUp(this.game);
			this.handleKeyDown(this.game);
			this.handleMouseMove(this.game);
			this.handleMouseWheel(this.game);
		};

		EventHandler.prototype.handleResize = function(game) {
			window.addEventListener('resize', respondCanvas, false);
			function respondCanvas(){ 
				game.canvasHolder.getCanvas('game_map').domCanvas.setAttribute('width', game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetWidth );
				game.canvasHolder.getCanvas('game_map').domCanvas.setAttribute('height', game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetHeight );
				game.canvasHolder.getCanvas('game_map').width = game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetWidth;
				game.canvasHolder.getCanvas('game_map').height = game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetHeight;

				game.canvasHolder.getCanvas('game_gui').domCanvas.setAttribute('width', game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetWidth );
				game.canvasHolder.getCanvas('game_gui').domCanvas.setAttribute('height', game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetHeight );
				game.canvasHolder.getCanvas('game_gui').width = game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetWidth;
				game.canvasHolder.getCanvas('game_gui').height = game.canvasHolder.getCanvas('game_map').domCanvas.parentNode.offsetHeight;

				game.physicEngine.map.figureTileSize(game.canvasHolder.getCanvas('game_map'));
				game.physicEngine.map.clear(game.canvasHolder.getCanvas('game_map'));
				game.physicEngine.map.regenerate(game.physicEngine.map.tileSize, game.physicEngine.map.paddingX, game.physicEngine.map.paddingY);
			}
			respondCanvas();
		};

		EventHandler.prototype.handleMouseWheel = function(game) {
			window.addEventListener(
				'DOMMouseScroll', 
				function wheel(event){
					var delta = 0;
					if (!event)
					{
						/* For IE. */
						event = window.event;
					} 
					    
					if (event.wheelDelta) 
					{ 
						/* IE/Opera. */
					    delta = event.wheelDelta/120;
					}
					else if (event.detail)
					{
						/* In Mozilla, sign of delta is different than in IE. Also, delta is multiple of 3. */
						delta = -event.detail/3;
					}
					/** If delta is nonzero, handle it.
					* Basically, delta is now positive if wheel was scrolled up,
					* and negative, if wheel was scrolled down.
					*/
					if (delta)
					{
						if (delta < 0)
						{
							game.physicEngine.map.clear(game.canvasHolder.getCanvas('game_map'));
							game.physicEngine.map.regenerate(game.physicEngine.map.tileSize / 1.1, game.physicEngine.map.paddingX, game.physicEngine.map.paddingY);
						}
						else
						{
							game.physicEngine.map.clear(game.canvasHolder.getCanvas('game_map')); 
							game.physicEngine.map.regenerate(game.physicEngine.map.tileSize * 1.1, game.physicEngine.map.paddingX, game.physicEngine.map.paddingY);
						}
					}

					event.preventDefault();
					event.returnValue = false;
				}, 
				false);
		};

 		EventHandler.prototype.handleKeyDown = function(game) {
			window.addEventListener('mousedown', function(event) {
				this.mousePosX = game.canvasHolder.getCanvas('game_map').getMousePos(event).x - game.physicEngine.map.paddingX;
				this.mousePosY = game.canvasHolder.getCanvas('game_map').getMousePos(event).y - game.physicEngine.map.paddingY;
				this.mouseDown = true;
			}, false);
		};		

		EventHandler.prototype.handleKeyUp = function(game) {
			window.addEventListener('mouseup', function(event) {
				this.mouseDown = false;
			}, false);
		};

		EventHandler.prototype.handleMouseMove = function(game) {
			window.addEventListener('mousemove', function(event)
			{
				if(this.mouseDown)
				{
					game.physicEngine.map.clear(game.canvasHolder.getCanvas('game_map'));
					// game.physicEngine.map.paddingX = game.canvasHolder.getCanvas('game_map').getMousePos(event).x - this.mousePosX;
					// game.physicEngine.map.paddingY = game.canvasHolder.getCanvas('game_map').getMousePos(event).y - this.mousePosY;
					// game.physicEngine.map.generate();
					game.physicEngine.map.regenerate(game.physicEngine.map.tileSize, game.canvasHolder.getCanvas('game_map').getMousePos(event).x - this.mousePosX, game.canvasHolder.getCanvas('game_map').getMousePos(event).y - this.mousePosY);
					game.refresh();
				}
			}, false);
		};

		EventHandler.prototype.handleCellClick = function(game) {
			window.addEventListener('click', function(event) {
				var mousePos = game.canvasHolder.getCanvas('game_map').getMousePos(event);
				var underlyingC = game.physicEngine.map.getUnderlying(mousePos);

				if(typeof underlyingC.underlyingCell !== "undefined")
				{
					underlyingC.underlyingCell.active = true;
					if(underlyingC.underlyingCell.building == null)
					{
						game.gameEngine.addBuilding(underlyingC.underlyingCell);
					}
				}

				for (var i in underlyingC.notUnderlyingCell) {
					underlyingC.notUnderlyingCell[i].active = false;
				};

			}, false);
		};

		EventHandler.prototype.handleBuildingClick = function(game) {
			window.addEventListener('click', function(event) {
				var mousePos = game.canvasHolder.getCanvas('game_map').getMousePos(event);
				var underlyingB = game.physicEngine.player.buildingHolder.getUnderlying(mousePos);

				if(typeof underlyingB.underlyingBuilding !== "undefined")
				{
					underlyingB.underlyingBuilding.active = true;
					for(var i in underlyingB.notUnderlyingBuilding)
					{
						underlyingB.notUnderlyingBuilding[i].active = false;
					};
				}

			}, false);
		};

		EventHandler.prototype.handleCellMouseOver = function(game) {
			window.addEventListener('mousemove', function(event) {
				var mousePos = game.canvasHolder.getCanvas('game_map').getMousePos(event);
				var underlying = game.physicEngine.map.getUnderlying(mousePos);

				if(typeof underlying.underlyingCell !== "undefined")
				{
					underlying.underlyingCell.hover = true;
				}

				for (var i in underlying.notUnderlyingCell) {
					underlying.notUnderlyingCell[i].hover = false;
				};

			}, false);
		};

		return EventHandler;
	}
);
