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
			require(['cubi/modules/user/views/ForgetPasswordView'],function(forgetPasswordView){
				var view = new forgetPasswordView();
				$(self.el).html(view.render());
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