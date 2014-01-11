"use strict";
define(['text!templates/user/forgetPasswordView.html',
		'../models/User'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
		el: '#main',
		model:model,
		events:{},		
		validate:function(){
			var self=this;				
			$(this.el).find('#form-forget-password').parsley('addListener',{
				onFormValidate:function(isValid,event,ParsleyForm)
				{	
					event.preventDefault();
					if(isValid){
						self.resetPassword(event);
					}
				}
			});
		},		
		resetPassword:function(event)
		{
			event.preventDefault();
			console.log('reset Password');
		},
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(){			
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.forgetPasswordView));
			this.validate(); 	        			
        	openbiz.ui.update();
 	        return this;
	    }
	});
})