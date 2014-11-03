define(
	['Texture'],
	function(Texture) {
		"use strict";

		function TextureHolder()
		{
			this.textures = [];
		}

		TextureHolder.prototype.init = function() {
			this.textures.push(new Texture('ground', 'img/ground.png'));
			this.textures.push(new Texture('grass', 'img/image_grass_iso.png'));
			this.textures.push(new Texture('building', 'img/building.png'))
			this.textures.push(new Texture('building_2', 'img/building_2.png'))
			this.textures.push(new Texture('Or', 'img/money.png'))
			this.textures.push(new Texture('Habitants', 'img/manicon.png'))
			this.textures.push(new Texture('Temps', 'img/time.png'))

		};

		TextureHolder.prototype.getTexture = function(name) {
			for (var t in this.textures) 
			{
				if(this.textures[t].name == name)
				{
					return this.textures[t];
				}
			};
		};
		return TextureHolder;
	}
);
