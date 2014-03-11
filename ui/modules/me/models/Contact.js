"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/profile',
		idAttribute: "_id",
		defaults:{
		},
		getBirthday:function(){
			var date = new Date(this.get('birthday'));
			if(!date){
				date = new Date();
			}
			return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		}
	});
})