"use strict";
define(function(){
	return {
		templateRoot: '../templates/',
		batchLoad:function(views, callback){

	        var deferreds = [];

	        $.each(views, function(index, view) {
	            if (window[view]) {
	                deferreds.push($.get('../templates/' + view + '.html', function(data) {
	                    window[view].prototype.template = _.template(data);
	                }, 'html'));
	            } else {
	                alert(view + " not found");
	            }
	        });

	        $.when.apply(null, deferreds).done(callback);
	    },
	    load:function(view, callback)
	    {
	    	$.get(this.templateRoot + view + '.html', 
	    		function(data) {
	                 callback(_.template(data));
	            }, 'html');
	    }
	}
});