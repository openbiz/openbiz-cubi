"use strict";
define(['text!templates/user/registerView.html',
		'../models/User'],
		function(templateData,model){
	return Backbone.View.extend({
		model:model,
		events:{
			"submit .create-account-form"  	:  "createAccount",
			"click .go-to-login"  			:  "gotoLogin"
		},	
		validateForm:function(){				
			$(this.el).find('.create-account-form').validate({		
				debug: true,		
				rules:{
					repeatPassword: {
						equalTo : "#inputPassword"
					}
				},
				messages:{					
					repeatPassword: {
						equalTo : openbiz.apps.cubi.locale.registerView.validation.passwordNotMatch
					}
				}
			});

		},	
		createAccount:function(event)
		{
			if(!$(this.el).find('.create-account-form').valid())return;
			var userRecord = {
				username: $(this.el).find('#inputEmail').val(),
				password: $(this.el).find('#inputPassword').val()
			}
			console.log('Create Account');
			console.log(userRecord);
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
		initialize:function(){				
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.registerView));	        
	        this.localize();
	        this.validateForm();
	        return this;
	    },
	    localize:function(){
	    	var nameElems = {
	    		firstName : $(this.el).find('#inputFirstName'),
	    		lastName : $(this.el).find('#inputLastName')
	    	}
	    	var nameRootElem = nameElems.firstName.parent();
	    	nameRootElem.html('');
	    	for(var i in openbiz.apps.cubi.locale.registerView.nameFormat){
	    		var elem = nameElems[openbiz.apps.cubi.locale.registerView.nameFormat[i]];	    		
	    		switch(parseInt(i))
	    		{
	    			case 0:
	    				elem.css({'width':'47%','margin-right':'3%'});	    				
	    				break;
	    			case 1:
	    				elem.css({'width':'50%','margin-right':'0%'});
	    				break;
	    		}
	    		nameRootElem.append(elem);
	    		
	    	}
	    	
	    }
	});
})