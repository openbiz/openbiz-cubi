"use strict";
define(['i18n!./nls/locale','./modules/user/main'],
	function(locale, user){
	return openbiz.Application.extend({
		name:'cubi',
		appUrl:null,
		modules:{
			user: user
		},		
		init:function(){
			var view = new user.views.LoginView();			
			return view.render().el;
		},
		locale: locale
	});
});