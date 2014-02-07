"use strict";
define(['text!templates/account/membersView.html'],
	function(templateData){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'membersView',
		el: '#main',
		events:{},			
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(){			
	        $(this.el).html(this.template(this.locale));
	        $(window).off('resize');
        	openbiz.ui.update($(this.el));
 	        return this;
	    }
	});
});