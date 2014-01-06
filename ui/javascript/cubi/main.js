"use strict";
define(['./modules/user/main'],
	function(user){
	return openbiz.Application.extend({
		modules:{
			user: user
		},
		views:{
			LoginView: new user.views.LoginView()
		}
	});
});