"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		urlRoot: openbiz.apps.cubi.appUrl+'/account/invitations',
		idAttribute: "_id",
		defualts:{
			expiredDate:null,
			data:{}
		},
		getDisplayExpiryDate:function(){
			var date = new Date(this.get('expiredDate'));
			return  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' +
					date.getHours() + ':' + date.getMinutes();
		}
	});
});