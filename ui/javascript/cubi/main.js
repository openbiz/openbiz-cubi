"use strict";
define(['./modules/login/main'],
	function(login){
	return openbiz.Application.extend({
		modules:{
			login: login
		}
	});
});