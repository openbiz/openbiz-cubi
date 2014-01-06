"use strict";
define(['./views/LoginView',
		'./routes'],
	function(LoginView, routes){
	return openbiz.Module.extend({
		test:'ss',
		views:{
			LoginView: LoginView
		}
	});
});