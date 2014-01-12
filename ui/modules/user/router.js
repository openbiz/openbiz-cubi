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
			"!/user/dashboard" 		: "dashboard"
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
			this.me.getMe(function(isAuthed,user){
				if(isAuthed){
					location.href="#!/user/dashboard";	
				}else{
					location.href="#!/user/login";
				}
			});
		},
		dashboard:function(){
			var self = this;
			this.me.getMe(function(isAuthed,user){
				if(isAuthed){	
					self.initDashboardUI();				
					//if user has no account yet, show wizard
					self.renderView("user.DashboardView",function(){						
					});
				}else{
					location.href="#!/user/login";
				}
			});
		},
		initDashboardUI:function(){
			var view = new layoutView();
			view.hideLoading();			
			$('body').removeClass('full-lg');
			this.renderView('system.HeaderView');
			this.renderView('system.NavView');
			this.renderView('system.MenuView');
			this.renderView('system.ContactRightView');
		},
		forgetPassword:function(){
			this.renderView("user.ForgetPasswordView");
		},
		login:function(){
			this.renderView("user.LoginView");	
		},
		logout:function(){
			this.me.logout(function(){
				location.href="#!/user/login";
			})
		},
		register:function(){
			this.renderView("user.RegisterView");			
		}
	});
})