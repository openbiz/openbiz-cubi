"use strict";
define(['text!templates/me/userProfileAddAddressView.html',
	'../models/Address'],
	function(templateData,model){
		return openbiz.View.extend({
			app: 'cubi',
			module:'me',
			name: 'userProfileAddAddressView',
			el: '',
			model: model,
			events:{
				"click .btn-address-save-record" : "saveRecord"
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
					category:   'Default',
					country:     $('.form-add-address').find('#inputCountry').val(),
					state:$('.form-add-address').find('#inputState').val(),
					city:     $('.form-add-address').find('#inputCity').val(),
					street:     $('.form-add-address').find('#inputStreet').val(),
					zipcode:     $('.form-add-address').find('#inputZipcode').val()
				};
				var self = this;
				var addressCollection = this.app.views.get('me.UserProfileView').models.addressCollection;
				this.model.save(newRecord,{success:function(){
					addressCollection.fetch();
					self.$el.modal('hide');
				},error: function(model, response) {
					console.log(model);
					console.log(response);
				}
				});
			},
			_validateForm:function(){
				return this.$el.find('.form-add-address').parsley('validate');
			}
		});
	});