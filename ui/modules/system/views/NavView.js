"use strict";
define(['text!templates/system/navView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		name: 'navView',
		el:'#wrapper #nav',
		initialize:function(){						
	        this.template = _.template(templateData);
    	},
		render:function(){			
	        $(this.el).html(this.template(this.locale));	 	        
	        return this;
	    }
	});	
})