"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		urlRoot: openbiz.apps.cubi.appUrl+'/account/users',
		idAttribute: "_id",
		defualts:{
			_id:null,
			user:{},
			role:null
		},
		hasRole:function(role){
			var roles = this.toJSON().user.roles;
			var _hasRole = false;
			for(var r in roles){
				if(r == role){
					_hasRole = true;
					break;
				}
			}
			return _hasRole;
		}
	});
});