"use strict";
define(['text!templates/user/registerView.html',
		'../models/User'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
		el: '#main',
		model:model,
		events:{},		
		validate:function(){
			var self=this;
			$(this.el).find('#inputEmail').attr("parsley-remote",this.app.appUrl+'/users/check-unique');
			$(this.el).find('#form-sign-up').parsley('addListener',{
				onFormValidate:function(isValid,event,ParsleyForm)
				{	
					if(isValid){
						event.preventDefault();
						self.signUp.call(self,event);
					}
				}
			});
		},		
		signUp:function(event)
		{
			event.preventDefault();
			$(this.el).find('.btn-sign-up')
						.attr('data-loading-text',openbiz.apps.cubi.locale.registerView.signing)						
						.tbButton('loading');
			//scroll to top
			$(this.el).animate({
				scrollTop: 0
			}, 500);
			$(this.el).addClass("slideDown");

			var self = this;
			if(openbiz.apps.cubi.locale.registerView.nameFormat[0]=='firstName'){
				var displayName = $(this.el).find('#inputLastName').val() + $(this.el).find('#inputFirstName').val();
			}else{
				var displayName = $(this.el).find('#inputLastName').val() + $(this.el).find('#inputFirstName').val();
			}			
			var user = {
				username: $(this.el).find('#inputEmail').val(),
				password: $(this.el).find('#inputPassword').val(),
				contact:{
					name:{
						firstName: 		$(this.el).find('#inputFirstName').val(),
						lastName: 		$(this.el).find('#inputLastName').val(),
						displayName: 	displayName
					},
					company: $(this.el).find('#inputCompany').val(),
					title:   $(this.el).find('input:radio[name="title"]#title-mr').is(":checked")?'Mr.':'Ms.',
					emails:[{
						category: 	'Default',
						email: 		$(this.el).find('#inputEmail').val()
					}],
					phones:[{
						type: 		'mobile',
						category: 	'Default',
						countryCode:$(this.el).find('#inputMobileCountryCode').val(),
						number: 	$(this.el).find('#inputMobileNumber').val(),
					}]
				}
			}

			this.model.createAccount(user,function(data)
			{
				self.model.login( user.username, user.password,function(isAuthed, user)
				{	
					$(this.el).find('.btn-sign-up').tbButton('reset');
					setTimeout(function(){
						$(self.el).removeClass("slideDown");						
					},500);									
					if(isAuthed)
					{
						//we are good to go !
										
					}				
				});
			});
		},
		initialize:function(){						
			openbiz.View.prototype.initialize.call(this); 				
	        this.template = _.template(templateData);	        	        
    	},
		render:function(){			
			var self = this;
			$(this.el).fadeOut(function(){
	        	$(self.el).html(self.template(openbiz.apps.cubi.locale.registerView));
	        	$(self.el).fadeIn();
	        	self.localize();
				self.validate(); 	        			
	        	openbiz.ui.update();
	    	});	        
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
	    				elem.css({'padding-left':'20px','padding-right':'0px'});	    				
	    				break;
	    			case 1:
	    				elem.css({'padding-left':'0px','padding-right':'20px'});	    				
	    				break;
	    		}
	    		nameRootElem.append(elem);	    	
	    	}	    	
	    }

	});
})