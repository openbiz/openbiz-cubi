"use strict";
define(['./modules/system/views/LayoutView',
		'./modules/myaccount/models/Me' ],
		function(layoutView, me){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		me: null,
		dashboardUIInited:false,
		views:{
			layout  	: new layoutView()
		},
		routes:{
			"" 						: "home",			
			"!/user/login" 			: "login",
			"!/user/register"		: "register",
			"!/user/forget-password": "forgetPassword",
			"!/user/dashboard" 		: "dashboard",
		},		
		initialize:function(){			
			// wired way to call parent methods 
			// or this.__proto__.initialize it's even wired
			openbiz.Router.prototype.initialize.call(this);
			this.me = new me();
			this.renderView('system.LayoutView');
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
					self.renderView("user.DashboardView");
				}else{
					location.href="#!/user/login";
				}
			});
		},
		initDashboardUI:function(){
			if(this.dashboardUIInited==true) return;
			this.views.layout.hideLoading();
			this.dashboardUIInited=true;
			this.renderView('system.HeaderView');
			this.renderView('system.NavView');
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