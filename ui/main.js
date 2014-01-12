"use strict";
define(['i18n!./nls/locale',
		'./modules/user/main',
		'./modules/myaccount/main'],
	function(locale, 
			user, myaccount){
	return openbiz.Application.extend({
		name:'cubi',
		appUrl:null,
		baseUrl:null,
		modules:{
			user: user,
			myaccount: myaccount
		},		
		init:function(){			
			for(var i in this.modules){
				this.modules[i].init();
			}			
		},
		locale: locale
	});
});