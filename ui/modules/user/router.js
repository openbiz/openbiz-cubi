"use strict";
define(['../system/views/LayoutView',
		'../me/models/Me' ],
		function(layoutView, me){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		me: null,
		routes:{
			"" 						: "home",			
			"!/user/login" 			: "login",			
			"!/user/register"		: "register",
			"!/user/forget-password": "forgetPassword",
            "!/backend/dashboard"   : "dashboard"
		},
		initialize:function(){
            openbiz.Router.prototype.initialize.call(this);
			this.me = new me();
		},
		home:function(){
			this.me.fetch({
				success:function(){
                    Backbone.history.navigate("#!/backend/dashboard", {trigger: true, replace: true});
                },
				error:function(){
                    Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
                }
			});
		},
        dashboard:function(){
            if(typeof openbiz.session.me.get('account')=='undefined'){
                location.href="#!/backend/me/setup";
                return;
            }
            var view = openbiz.views.get("system.LayoutView");
            if(view != null){
                view.hideLoading();
            }
            this.renderView("user.DashboardView");
        },
		forgetPassword:function(){
			this.renderView("user.ForgetPasswordView");
		},
		login:function(){
			this.renderView("user.LoginView");	
		},
		register:function(){
			this.renderView("user.RegisterView");			
		}
	});
});