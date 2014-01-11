"use strict";
define(['./modules/system/views/LayoutView'],
		function(layoutView){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		dashboardUIInited:false,
		views:{
			layout  	: layoutView			
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
			this.renderView('system.LayoutView');
		},
		home:function(){
			if(openbiz.session.hasOwnProperty('user')){
				//render main dashboard view
				location.href="#!/user/dashboard";
			}else{
				//render login view
				location.href="#!/user/login";
			}
		},
		dashboard:function(){
			if(openbiz.session.hasOwnProperty('user')){
				this.initDashboardUI();
				//if user has no account yet, show wizard
				this.renderView("user.DashboardView");
			}else{
				location.href="#!/user/login";
			}
		},
		initDashboardUI:function(){
			if(this.dashboardUIInited==true) return;
			this.dashboardUIInited=true;
			this.renderView('system.HeaderView');
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