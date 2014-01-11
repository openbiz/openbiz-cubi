"use strict";
define(['./views/LoginView'],
	function(LoginView){
	return openbiz.Module.extend({
		views:{
			LoginView: LoginView
		}
	});
});