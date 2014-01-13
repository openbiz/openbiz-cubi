"use strict";
define(['../system/views/LayoutView',
		'../myaccount/models/Me' ],
		function(layoutView, me){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		me: null,
		routes:{
			"" 						: "home",			
			"!/user/login" 			: "login",			
			"!/user/register"		: "register",
			"!/user/forget-password": "forgetPassword",
<<<<<<< HEAD
			"!/user/dashboard" 		: "dashboard"
=======
			"!/user/dashboard" 		: "dashboard",
			"!/backend/testform"	: "renderTestForm"
		},
		renderTestForm:function(){
			console.log('render test form +++');
>>>>>>> 2fc298f50e90be66d36c960aaf138043d35c7152
		},
		initialize:function(){			
			// wired way to call parent methods 
			// or this.__proto__.initialize it's even wired

            openbiz.Router.prototype.initialize.call(this);
			this.me = new me();			
			this.renderView('system.LayoutView');
			$('body').addClass('full-lg');
		},
		home:function(){
			this.me.fetch({
				success:function(){		
					location.href="#!/user/dashboard";
				},
				error:function(){
					location.href="#!/user/login";
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
						location.href="#!/user/login";
					}
				});
			}
		},
		_renderDashboard:function(){
			var view = new layoutView();
			view.hideLoading();			
			$('body').removeClass('full-lg');
			this.renderView('system.HeaderView');
			this.renderView('system.NavView');
			this.renderView('system.MenuView');
			this.renderView('system.ContactRightView');		
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
})