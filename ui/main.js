"use strict";
define(['i18n!./nls/locale',
		'./modules/common/main',
		'./modules/system/main',
		'./modules/user/main',
		'./modules/me/main', 
		'./modules/account/main',
		'./menu/main',
		 ],
	function(locale, common, system,
			user, me, account, menu){
	return openbiz.Application.extend({
		name 	: 'cubi',
		appUrl 	: REPLACE_APPURL,
		baseUrl : REPLACE_BASEURL,
		modules:{
			common: common,
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