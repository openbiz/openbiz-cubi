"use strict";
define(function(){
	var object = {		
		extend:function(properties)
		{
			_.extend(properties,this);
			return properties;
		}
	};
	_.extend(object,Backbone.Events);
	return object;
});