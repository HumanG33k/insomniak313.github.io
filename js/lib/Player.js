define(
	['BuildingHolder'],
	function(BuildingHolder) {
		"use strict";

		function Player(login, password, mail)
		{
			this.login    = login;
			this.password = password;
			this.mail     = mail;

			this.buildingHolder = new BuildingHolder();
			this.buildingHolder.build();
		}

		Player.prototype.draw = function(context, eventHandler)
		{
			this.drawUser(context, eventHandler);
		};

		Player.prototype.drawBuildingHolder = function(context, eventHandler)
		{
			this.buildingHolder.draw(context, eventHandler);
		};

		Player.prototype.drawUser = function(context, eventHandler)
		{
			context.clearRect(0, 0,  100, 40);
			context.font = '18pt Calibri';
			context.fillStyle = 'black';
			context.fillText(this.login, 10, 30);
		};

		return Player;
	}
);
