"use strict";
define(['./views/LoginView',
		'./router'],
	function(LoginView, router){
	return openbiz.Module.extend({
		views:{
			LoginView: LoginView
		},
		router: router
	});
});