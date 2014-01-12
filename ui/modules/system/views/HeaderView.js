"use strict";
define(['text!templates/system/headerView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		name: 'headerView',
		el:'#wrapper #header',
		initialize:function(){
			openbiz.View.prototype.initialize.call(this); 							
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(this.app.locale.headerView));	 	        
	        return this;
	    }
	});	
})