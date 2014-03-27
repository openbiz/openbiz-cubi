"use strict";
define(function(){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		routes:{
            "!/backend/*any"		: "notFound"
		},		
		notFound:function(){
			this.renderView("common.NotFoundView");
		}
	});
});