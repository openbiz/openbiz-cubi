"use strict";
define(['text!templates/user/dashboardView.html',
		'../models/User'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
		el: '#main',
		model:model,
		events:{},		
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(){			
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.dashboardView));
        	openbiz.ui.update();
 	        return this;
	    }
	});
})