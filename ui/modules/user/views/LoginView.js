"use strict";
define(['text!templates/user/loginView.html',
		'../models/User'],
		function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
		el: '#main',
		model:model,
		events:{
			"click .btn-forget-password" : "gotoForgetPassword",
			"click .btn-create-account" : "gotoRegister"
		},
		validate:function(){
			var self=this;				
			$(this.el).find('#form-signin').parsley('addListener',{
				onFormValidate:function(isValid,event,ParsleyForm)
				{	
					event.preventDefault();
					if(isValid){
						self.checkLogin(event);
					}
				}
			});
		},	
		gotoRegister:function(event){
			event.preventDefault();
			var self = this;			
			$(this.el).find('.btn-create-account')
						.attr('data-loading-text',openbiz.apps.cubi.locale.loading)
						.tbButton('loading');
			this.switchView('user.RegisterView');
		},
		gotoForgetPassword:function(event)
		{
			event.preventDefault();
			var self = this;
			$(this.el).find('.btn-forget-password').replaceWith(
					$("<span/>")
					.html(openbiz.apps.cubi.locale.loading)
					.addClass($(this.el).find('.btn-forget-password').attr('class')));
			this.switchView('user.ForgetPasswordView');
		},
		checkLogin:function(event)
		{
			event.preventDefault();
			console.log('checking login');
			var self = this;
			$(this.el).find('.btn-sign-in')
						.attr('data-loading-text',openbiz.apps.cubi.locale.loginView.signing)						
						.tbButton('loading');
			$(self.el).find('#inputPassword').closest(".input-group").removeClass("parsley-error").addClass("parsley-success");

			//scroll to top
			$(this.el).animate({
				scrollTop: 0
			}, 500);
			$(this.el).addClass("slideDown");

			this.model.login( 	$(this.el).find('#inputEmail').val(), 
								$(this.el).find('#inputPassword').val() , 
								function(isAuthed, user){								
				$(self.el).find('.btn-sign-in').tbButton('reset');
				if(!isAuthed)
				{
					setTimeout(function(){
						$(self.el).removeClass("slideDown");
						$(self.el).find('#inputPassword').closest(".input-group").removeClass("parsley-success").addClass("parsley-error");
						$(self.el).find('#inputPassword').attr("data-content",openbiz.apps.cubi.locale.loginView.validation.incorrectPassword).popover('show');						
					},500);					
				}else{
					//we are good to go !
					
				}
			});
		},
		initialize:function(){	
			openbiz.View.prototype.initialize.call(this); 						
	        this.template = _.template(templateData);	        	        
    	},
		render:function(){			
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.loginView));
	        $('#wrapper div#header').hide();
	        $('#wrapper div#nav').hide();
	        $('#wrapper div#menu').hide();			
			var self = this;
	    	function toCenter(){
				var mainH=$(self.el).find("#main").outerHeight();
				var accountH=$(self.el).find(".account-wall").outerHeight();
				var marginT=(mainH-accountH)/2;
			   	if(marginT>30){
				    $(self.el).find(".account-wall").css("margin-top",marginT-15);
				}else{
					$(self.el).find(".account-wall").css("margin-top",30);
				}
			}
			toCenter();
			var toResize;
			$(window).resize(function(e) {
				clearTimeout(toResize);
				toResize = setTimeout(toCenter(), 500);
			});	        	        
	        openbiz.ui.update();
	        this.validate();	        
	        return this;
	    }
	});
})