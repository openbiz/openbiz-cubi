"use strict";
define(function(){
	openbiz.loaders.TemplateLoader.load('login/loginView',function(template){		
		return Backbone.View.extend({
			initialize:function () {
		        console.log('Initializing Login View');
		        this.template = template;		        
	    	},
			render:function () {
		        $(this.el).html(this.template());
		        return this;
		    }
		});
	});
})