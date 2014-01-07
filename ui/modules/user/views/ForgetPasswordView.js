"use strict";
define(['text!templates/user/forgetPasswordView.html'],function(templateData){
	return Backbone.View.extend({
		events:{
			"submit .forget-password-form"  :  "resetPassword",
			"click .go-to-login"  			:  "gotoLogin",
			'keydown' 						:  "keydownHandler"
		},
		keydownHandler : function (e) {
			switch (e.which) {
				case 27 :
					this.gotoLogin();
					break;
			}
		},
		gotoLogin:function()
		{
			event.preventDefault();
			var self=this;
			$(this.el).find('.go-to-login').replaceWith(openbiz.apps.cubi.locale.loading);
			openbiz.apps.cubi.require(['./modules/user/views/LoginView'],function(forgetPasswordView){
				var view = new forgetPasswordView();
				$(self.el).fadeOut(function(){
					$(self.el).html(view.render().el).fadeIn();
				})
			})
		},
		resetPassword:function(event)
		{
			event.preventDefault();
			console.log('reset Password');
		},
		initialize:function(){						
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.resetPasswordView));
	        return this;
	    }
	});
})