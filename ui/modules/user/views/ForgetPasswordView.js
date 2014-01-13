"use strict";
define(['text!templates/user/forgetPasswordView.html',
		'../models/User'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
		name: 'forgetPasswordView',
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
			var self = this;	
	        $(this.el).html(this.template(this.locale));
			this.validate(); 
			function toCenter(){
				var mainH=$(self.el).outerHeight();
				var accountH=$(self.el).find(".account-wall").outerHeight();
				var marginT=(mainH-accountH)/2;
			   	if(marginT>30){			   		
				    $(self.el).find(".account-wall").css("margin-top",marginT-25);
				}else{
					$(self.el).find(".account-wall").css("margin-top",30);
				}
			}
			setTimeout(toCenter, 50);
			var toResize;
			$(window).on('resize',function(e) {
				clearTimeout(toResize);
				toResize = setTimeout(toCenter, 50);
			});	    
			$(this.el).find("#inputEmail").val($.cookie('username'));    			
        	openbiz.ui.update($(this.el));
 	        return this;
	    }
	});
});