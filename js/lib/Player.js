define(
	['BuildingHolder'],
	function(BuildingHolder) {
		"use strict";

		function Player(login, password, mail)
		{
			this.login    = login;
			this.password = password;
			this.mail     = mail;
		}

		Player.prototype.draw = function(context)
		{
			this.drawUser(context);
		};

		Player.prototype.drawUser = function(context)
		{
			context.clearRect(0, 0,  100, 40);
			context.font = '18pt Calibri';
			context.fillStyle = 'black';
			context.fillText(this.login, 10, 30);
		};

		return Player;
	}
);
