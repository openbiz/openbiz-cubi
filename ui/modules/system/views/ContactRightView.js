"use strict";
define(['text!templates/system/contactRightView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		name: 'contactRightView',
		el:'#wrapper nav#contact-right',
		initialize:function(){		
			openbiz.View.prototype.initialize.call(this); 				
	        this.template = _.template(templateData);
    	},
		render:function(){			
	        $(this.el).html(this.template(this.locale));
	        openbiz.ui.update();			        
	        return this;
	    }
	});	
})