define(
	[],
	function() {
		"use strict";

		function Texture(name, src)
		{
			this.name = name;
			this.image = new Image();
			this.image.src = src;
		}

		return Texture;
	}
);
