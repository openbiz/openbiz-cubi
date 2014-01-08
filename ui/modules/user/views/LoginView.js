"use strict";
define(['text!templates/user/loginView.html',
		'../models/User'],
		function(templateData,model){
	return Backbone.View.extend({
		model:model,
		events:{
			"submit .login-form"  :  "checkLogin",
			"click .forget-password" : "gotoForgetPassword",
			"click .btn-create-account" : "gotoRegister"
		},
		gotoRegister:function(event){
			event.preventDefault();
			var self = this;			
			$(this.el).find('.btn-create-account')
						.attr('data-loading-text',openbiz.apps.cubi.locale.loading)
						.button('loading');
			openbiz.apps.cubi.require(['./modules/user/views/RegisterView'],function(targetView){
				var view = new targetView();
				$(self.el).fadeOut(function(){
					$(self.el).html(view.render().el).fadeIn();
				})
			});
		},
		gotoForgetPassword:function(event)
		{
			event.preventDefault();
			var self = this;
			$(this.el).find('.forget-password').replaceWith(openbiz.apps.cubi.locale.loading);
			openbiz.apps.cubi.require(['./modules/user/views/ForgetPasswordView'],function(targetView){
				var view = new targetView();
				$(self.el).fadeOut(function(){
					$(self.el).html(view.render().el).fadeIn();
				})
			});
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