"use strict";
define(['text!templates/system/navView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		name: 'navView',
		el:'#wrapper div#nav',
		initialize:function(){		
			openbiz.View.prototype.initialize.call(this); 				
	        this.template = _.template(templateData);
    	},
		render:function(){			
			this.locale.me = openbiz.session.me.toJSON();			
	        $(this.el).html(this.template(this.locale));	 	        
	        openbiz.ui.update();
	        $(this.el).fadeIn();
	        return this;
	    }
	});	
})