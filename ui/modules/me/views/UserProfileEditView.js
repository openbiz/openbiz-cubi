"use strict";
define(['text!./UserProfileEditView.json',
	'text!templates/me/userProfileEditView.html',
	'../models/Me'
	/*CUSTOM_ELEMNT_CLASSES*/],
	function(metadata,templateData,dataModel){
		return openbiz.FormView.extend({
			app: 'cubi',
			module:'me',
			name: 'userProfileEditView',
			el: 'div.userProfileEditView',
			model: dataModel,
			template: templateData,
			metadata: metadata,
			events:{},
			beforeRender:function(){},
			afterRender:function(){
				//process name locale
				var elems = {
					'firstName':$('.field-firstname'),
					'lastName':$('.field-lastname')
				}								
				$('.name-firstname').html(elems[this.locale.nameFormat[0]]);
				$('.name-lastname').html(elems[this.locale.nameFormat[1]]);
				
			},
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
					title: this.locale.saveSuccessedTitle,
					message:this.locale.saveSuccessedMessage,
					buttons:{
						ok:function(){
							Backbone.history.navigate("#!/backend/me/profile", {trigger: true, replace: true});			
						}
					}
				});				 
			},
			saveRecordError:function(){},
			beforeDeleteRecord:function(){},
			deleteRecordSuccess:function(){},
			deleteRecordError:function(){}
		
	});
});