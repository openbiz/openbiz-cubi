"use strict";
define(['i18n!./nls/locale',
		'./modules/user/main',
		'./router'],
	function(locale, 
			user, 
			router){
	return openbiz.Application.extend({
		name:'cubi',
		appUrl:null,
		router: router,
		modules:{
			user: user
		},		
		init:function(){
			var router = new this.router();
			
		},
		locale: locale
	});
});