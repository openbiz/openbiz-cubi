"use strict";
define(['./views/LoginView',
		'./routes'],
	function(LoginView, routes){
	return openbiz.Module.extend({
		 views:{
			LoginView: LoginView
		}
	});
});