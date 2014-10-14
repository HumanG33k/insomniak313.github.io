define(
	[],
	function() {
		"use strict";

		function RatioHolder()
		{
			this.ratios = [];
		}

		ResourceHolder.prototype.addRatio = function(ratio)
		{
			this.ratios.push(ratio);
		};

		ResourceHolder.prototype.getRatio = function(resource)
		{
			for (var ratio in this.ratios) {
				if(ratio.resource = resource)
				{
					return ratio;
				}
			};
		};

		return RatioHolder;
	}
);
