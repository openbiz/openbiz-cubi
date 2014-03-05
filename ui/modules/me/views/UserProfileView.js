"use strict";
define(['text!templates/me/userProfileView.html',
	'../models/AddressCollection',
	'../models/EmailCollection',
	'../models/PhoneCollection',
	'../models/Contact'],
	function(templateData,addressCollection,emailCollection,phoneCollection,contact){
		return openbiz.View.extend({
			app: 'cubi',
			module:'me',
			name: 'userProfileView',
			el: '#main',
			models:{
				addressCollection: new addressCollection(),
				emailCollection: new emailCollection(),
				phoneCollection: new phoneCollection(),
				contact: new contact()
			},
			events:{
				'click .btn-save':'saveRecord'
			},
			initialize:function(){
				var self = this;
				openbiz.View.prototype.initialize.call(this);
				this.template = _.template(templateData);
				this.models.phoneCollection.on('sync',function(){
					var output = self.locale;
					output.phones = self.models.phoneCollection.models;
					$(self.el).html(self.template(output));
					openbiz.ui.update($(self.el));
				})
			},
			render:function(){
				var self = this;
				this.models.contact.fetch({success:function(){
					self.locale.contact = self.models.contact;
					$(self.el).html(self.template(self.locale));
					$(window).off('resize');
					openbiz.ui.update($(self.el));
				}});
				this.models.phoneCollection.fetch();
			},
			saveRecord:function(){
				if(!this._validateForm()) return;
				var self = this;
				var contact = {
					name: {
						lastName:$(this.el).find('input[name="contact-lastname"]').val(),
						firstName:$(this.el).find('input[name="contact-firstname"]').val(),
						displayName:$(this.el).find('input[name="contact-lastname"]').val()+$(this.el).find('input[name="contact-firstname"]').val()
					},
					title:"Ms."
				};
				this.models.contact.save(contact,{
					success:function(){
						bootbox.alert({
							title:"Data notification",
							message:"<h2>Data has been saved</h2>"
						});
						//update UI display name
					}
				});
			},
			_validateForm:function(){
				return $(this.el).find('.form-profile').parsley('validate');
			}
		});
	});