"use strict";
define(['text!templates/account/profileView.html',
		'../models/Account'],
	function(templateData,accountModel){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'profileView',
		el: '#main',
		events:{},			
		model: new accountModel(),
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(){	
			var self = this;
			this.model.fetch({success:function(){
				self.locale.account = self.model;
		        $(self.el).html(self.template(self.locale));
		        $(window).off('resize');
	        	openbiz.ui.update($(self.el));
        	}});
 	        return this;
	    }
	});
});