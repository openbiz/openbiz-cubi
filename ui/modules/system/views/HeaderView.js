"use strict";
define(['text!templates/system/headerView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		el:'#wrapper #header',
		initialize:function(){						
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.headerView));	 	        
	        return this;
	    }
	});	
})