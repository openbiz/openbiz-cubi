"use strict";
define(['./modules/system/views/LayoutView'],
		function(layoutView){
	return openbiz.Router.extend({		
		app: openbiz.apps.cubi?openbiz.apps.cubi:'cubi',
		views:{
			layout  	: layoutView			
		},
		routes:{
			"" 						: "home",			
			"!/user/login" 			: "login",
			"!/user/register"		: "register",
			"!/user/forget-password": "forgetPassword"
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