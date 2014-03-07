"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url:openbiz.apps.cubi.appUrl+'/me/profile',
		idAttribute: "_id",
		defaults:{
			name:null,
			birthday:null,
			avator:null,
			title:null,
			department:null,
			company:null
		},
		getBirthday:function(){
			var date = new Date(this.get('birthday'));
			console.log(date);
			if(!date){
				date = new Date();
			}
			return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		}
	});
})