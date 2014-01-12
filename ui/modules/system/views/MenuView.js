"use strict";
define(['text!templates/system/menuView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		name: 'menuView',
		el:'#wrapper nav#menu',
		initialize:function(){
			openbiz.View.prototype.initialize.call(this); 							
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(this.app.locale.headerView));	 
	        openbiz.ui.update();	
	        $(this.el).fadeIn();        
	        return this;
	    }
	});	
})