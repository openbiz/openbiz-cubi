"use strict";
define(['i18n!./nls/locale',
		'./modules/system/main',
		'./modules/user/main',
		'./modules/me/main', 
		'./modules/account/main',
		'./menu/main',
		 ],
	function(locale, system,
			user, me, account, menu){
	return openbiz.Application.extend({
		name 	: 'cubi',
		appUrl 	: REPLACE_APPURL,
		baseUrl : REPLACE_BASEURL,
		modules:{
            system: system,
			user: user,
            me: me,
            account: account
		},
		init:function(){			
			for(var i in this.modules){				
				this.modules[i].init();				
			}			
		},
		locale: locale,
		menu: menu
	});
});