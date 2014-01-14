"use strict";
define(['i18n!./nls/locale',
		'./modules/system/main',
		'./modules/user/main',
		'./modules/me/main'],
	function(locale, system,
			user, myaccount){
	return openbiz.Application.extend({
		name:'cubi',
		appUrl:null,
		baseUrl:null,
		modules:{			
			user: user,
			myaccount: myaccount,
			//load system as the latest module, because it has router middle wares
			system: system 
		},
		init:function(){			
			for(var i in this.modules){				
				this.modules[i].init();				
			}			
		},
		locale: locale
	});
});