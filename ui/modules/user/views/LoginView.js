"use strict";
define(['text!templates/user/loginView.html'],function(templateData){
	return Backbone.View.extend({
		events:{
			"submit .login-form"  :  "checkLogin",
			"click .forget-password" : "gotoForgetPassword"
		},
		gotoForgetPassword:function(event)
		{
			event.preventDefault();
			var self = this;
			openbiz.apps.cubi.require(['./modules/user/views/ForgetPasswordView'],function(forgetPasswordView){
				var view = new forgetPasswordView();
				$(self.el).fadeOut(function(){
					$(self.el).html(view.render().el).fadeIn();
				})
			})
		},
		checkLogin:function(event)
		{
			event.preventDefault();
			console.log('submit login');
		},
		initialize:function(){						
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.loginView));
	        return this;
	    }
	});
})