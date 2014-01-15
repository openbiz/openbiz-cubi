"use strict";
define(['i18n!./nls/locale',
		'./modules/system/main',
		'./modules/user/main',
		'./modules/me/main'],
	function(locale, system,
			user, me){
	return openbiz.Application.extend({
		name:'cubi',
		appUrl:null,
		baseUrl:null,
		modules:{
            system: system,
			user: user,
            me: me
		},
		init:function(){			
			for(var i in this.modules){				
				this.modules[i].init();				
			}			
		},
		locale: locale
	});
});