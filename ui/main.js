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
			common: new common(),
            system: new system(),
			user: new user(),
            me: new me(),
            account: new account()
		},
		init:function(){			
			//this.modules['common'].init();
			for(var i in this.modules){				
				if(i =='common') continue;
				this.modules[i].init();				
			}			
		},
		locale: locale,
		menu: menu
	});
});