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
            "!/backend/dashboard": "dashboard"
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
			return;			
		},
        dashboard:function(){
            var self = this;
            if(openbiz.session.hasOwnProperty('me') && openbiz.session.me.get('username')!=''){
                this._renderDashboard();
            }else{
                this.me.fetch({
                    success:function(){
                        self._renderDashboard();
                    },
                    error:function(){
                        Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
                    }
                });
            }
        },
        _renderDashboard:function(){
            var view = openbiz.views.get("system.LayoutView");
            if(view != null){
                view.hideLoading();
            }
            $('body').removeClass('full-lg');
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