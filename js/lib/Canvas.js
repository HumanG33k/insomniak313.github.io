define(
	['EventHandler'],
	function(EventHandler) {
		"use strict";

		function Canvas(canvasId)
		{
			this.canvasId  = canvasId;
			this.domCanvas = document.getElementById(this.canvasId);
			this.context   = this.domCanvas.getContext('2d');
			this.width     = 0;
			this.height    = 0;	
		}

		Canvas.prototype.getMousePos = function (event) {
			var rect = this.domCanvas.getBoundingClientRect();
			return {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			};
		};

		Canvas.prototype.stretchToParent = function() {
			this.domCanvas.setAttribute('width', this.domCanvas.parentNode.offsetWidth );
			this.domCanvas.setAttribute('height', this.domCanvas.parentNode.offsetHeight );
			this.width = this.domCanvas.parentNode.offsetWidth;
			this.height = this.domCanvas.parentNode.offsetHeight;
		};


		return Canvas;
	}
);
