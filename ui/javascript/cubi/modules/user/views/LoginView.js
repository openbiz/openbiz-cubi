"use strict";
define(['text!../../../../../templates/user/loginView.html'],function(templateData){
	return Backbone.View.extend({
		initialize:function () {
	        this.template = _.template(templateData);
    	},
		render:function () {
	        $(this.el).html(this.template());
	        return this;
	    }
	});
})