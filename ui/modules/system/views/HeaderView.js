"use strict";
define(['text!templates/system/headerView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		el:'#wrapper',
		initialize:function(){						
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.resetPasswordView));	 	        
	        return this;
	    }
	});	
})