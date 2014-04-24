"use strict";
define(['./models/Me' ],
		function(me){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		me: null,
		views:{
		},
		routes:{			
			"!/backend/me/logout" 	     : "logout",
            "!/backend/me/profile"       : "setupProfile",            
            "!/backend/me/setup"         : "setupWizard",
            "!/backend/me/change-password"    : "changePassword",
		},		
		initialize:function(){			
			// wired way to call parent methods 
			// or this.__proto__.initialize it's even wired
			openbiz.Router.prototype.initialize.call(this);
			this.me = new me();
		},
		setupProfile:function(){
			this.renderView("me.UserProfileView");
		},
		changePassword:function(){
			this.renderView("me.UserChangePasswordView");
		},		
        setupWizard:function(){
            this.renderView("me.SetupWizardView");
        },
		logout:function(){
			var self = this;
			Backbone.history.trigger('dismissBackendUI',function(){
                openbiz.session.me.on('destroy',function(){                	
                    location.href="#!/user/login";
                    setTimeout(function(){
	                    _.each(openbiz.apps,function(app){
	                		app.views.reset();
	                	});
                	},1000)
                });
                openbiz.session.me.destroy();
            })
		}
	});
});