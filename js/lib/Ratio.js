define(
	[],
	function() {
		"use strict";

		function Ratio(resource)
		{
			this.resource = resource;
		}

		Ratio.prototype.setCallback = function(callback) {
			this.callback = callback;
		};

		Ratio.prototype.setParams = function(params) {
			this.params = params;
		};

		return Ratio;
	}
);
