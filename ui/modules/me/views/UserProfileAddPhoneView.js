"use strict";
define(['text!templates/me/userProfileAddPhoneView.html',
	'../models/Phone'],
	function(templateData,model){
		return openbiz.View.extend({
			app: 'cubi',
			module:'me',
			name: 'userProfileAddPhoneView',
			el: '',
			model: model,
			events:{
				"click .btn-phone-save-record" : "saveRecord"
			},
			initialize:function(){
				this.model = new model();
				this.template = _.template(templateData);
				openbiz.View.prototype.initialize.call(this);
			},
			render:function(){
				var self = this;
				var output = self.locale;
				this.$el = $(self.template(output));
				openbiz.ui.update(this.$el);
				return this;
			},
			saveRecord:function(event){
				event.preventDefault();
				var self = this;
				if(!this._validateForm())return;

				var newRecord = {
					type:       'mobile',
					category:   'Default',
					countryCode:$('.form-add-phone').find('#inputMobileCountryCode').val(),
					number:     $('.form-add-phone').find('#inputMobileNumber').val()
				};
				var self = this;
				var phoneCollection = this.app.views.get('me.UserProfileView').models.phoneCollection;
				this.model.save(newRecord,{success:function(){
					phoneCollection.fetch();
					self.$el.modal('hide');
					},error: function(model, response) {
						console.log(model);
						console.log(response);
					}
				});
			},
			_validateForm:function(){
				return this.$el.find('.form-add-phone').parsley('validate');
			}
		});
	});