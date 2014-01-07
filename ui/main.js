"use strict";
define(['i18n!./nls/locale','./modules/user/main'],
	function(locale, user){
	return openbiz.Application.extend({
		modules:{
			user: user
		},
		views:{
			LoginView: new user.views.LoginView()
		},
		locale: locale
	});
});