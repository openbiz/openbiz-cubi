"use strict";
define(['./models/Me' ],
		function(me){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		me: null,
		views:{
		},
		routes:{
			"do-nothing"			     : "doNothing",
			"!/backend/me/logout" 	     : "logout",
            "!/backend/me/profile"       : "logout",
            "!/backend/me/setup"         : "setupWizard"
		},		
		initialize:function(){			
			// wired way to call parent methods 
			// or this.__proto__.initialize it's even wired
			openbiz.Router.prototype.initialize.call(this);
			this.me = new me();
		},
		doNothing:function(){

		},
        setupWizard:function(){
            this.renderView("me.SetupWizardView");
        },
		logout:function(){
			Backbone.history.trigger('dismissBackendUI',function(){
                openbiz.session.me.on('destroy',function(){
                    location.href="#!/user/login";
                });
                openbiz.session.me.destroy();
            })
		}
	});
});