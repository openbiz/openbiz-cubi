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
		validate:function(){				
			$(this.el).find('.login-form').validate({
			});
		},	
		gotoRegister:function(event){
			event.preventDefault();
			var self = this;			
			$(this.el).find('.btn-create-account')
						.attr('data-loading-text',openbiz.apps.cubi.locale.loading)
						.button('loading');
			openbiz.apps.cubi.require(['./modules/user/views/RegisterView'],function(targetView){
				self.undelegateEvents();
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
				self.undelegateEvents();
				var view = new targetView();
				$(self.el).fadeOut(function(){
					$(self.el).html(view.render().el).fadeIn();
				})
			});
		},
		checkLogin:function(event)
		{
			event.preventDefault();
			var self = this;
			if(!$(this.el).find('.login-form').valid())return;
			$(this.el).find('.btn-sign-in')
						.attr('data-loading-text',openbiz.apps.cubi.locale.loginView.signing)
						.button('loading');
			$(self.el).find('#inputPassword').closest(".form-group").removeClass("has-error").addClass("has-success");			
			this.model.login( 	$(this.el).find('#inputEmail').val(), 
								$(this.el).find('#inputPassword').val() , 
								function(isAuthed, user){								
				$(self.el).find('.btn-sign-in').button('reset');
				if(!isAuthed)
				{
					$(self.el).find('#inputPassword').closest(".form-group").removeClass("has-success").addClass("has-error");
					$(self.el).find('#inputPassword').attr("data-validation","invalid");					
					$(self.el).find('#inputPassword').attr("data-content",openbiz.apps.cubi.locale.loginView.validation.incorrectPassword);
					$(self.el).find('#inputPassword').popover('show');					
				}else{
					//we are good to go !
					openbiz.session.user = user;
				}
			});
		},
		initialize:function(){						
	        this.template = _.template(templateData);	        
	        this.model = new this.model();
    	},
		render:function(){			
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.loginView));
	        this.validate();
	        return this;
	    }
	});
})