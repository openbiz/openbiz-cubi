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
			//reinint UI
			var self = this;
			$('body').addClass("full-lg");
			
			this.app.require(['./modules/user/views/DashboardView'],function(viewClass){
				var view = new viewClass();
				view.undelegateAllEvents();
			});

			//@todo: unregister dashboard view's events
			if($('#main').children().length==0){
				location.href="#!/user/login";
			}
			$('#main').fadeOut(function(){							
				openbiz.session.me.on('destroy',function(model,resp,options){
					location.href="#!/user/login";
				})
				openbiz.session.me.destroy();
			});
		}
	});
})