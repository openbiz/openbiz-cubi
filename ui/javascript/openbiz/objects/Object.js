"use strict";
define(function(){
	var object = {		
		extend:function(properties)
		{
			var newClass = {};
			_.extend(newClass,this,properties);
			return newClass;
		}
	};
	_.extend(object,Backbone.Events);
	return object;
});