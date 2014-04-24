"use strict";
define(['text!./UserChangePasswordView.json',
	'text!templates/me/userChangePasswordView.html',
	'../models/Me'
	/*CUSTOM_ELEMNT_CLASSES*/],
	function(metadata,templateData,dataModel){
		return openbiz.FormView.extend({
			app: 'cubi',
			name: 'userChangePasswordView',
			module:'me',
			el: '#main',
			template: templateData,
			model: dataModel,
			metadata: metadata,			
			events:{},
			render:function(id){
				var self = this;
				this.model = new dataModel({_id:id});
				this.model.fetch({
					success:function(){
						openbiz.FormView.prototype.render.call(self);
					}
				});
			},
			saveRecordSuccess:function(){
				 bootbox.alert({
					title: this.locale.passwordChangedTitle,
					message:this.locale.passwordChangedMessage,
					buttons:{
						ok:function(){
							Backbone.history.navigate("#!/backend/me/logout", {trigger: true, replace: true});			
						}
					}
				});				 
			},
			beforeRender:function(){},
			afterRender:function(){},
			beforeDeleteRecord:function(){},
			afterDeleteRecord:function(){}
	});
});