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
			var self = this;
			this.locale.me = openbiz.session.me.toJSON();			
	        $(this.el).html(this.template(this.locale));	 	        	        
	        $(this.el).fadeIn(function(){
	        	openbiz.ui.update($(self.el));	
	        });
	        return this;
	    }
	});	
})