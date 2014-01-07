"use strict";
define(['text!../../../../../templates/user/forgetPasswordView.html'],function(templateData){
	return Backbone.View.extend({
		events:{
			"submit .login-form"  :  "checkLogin"
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