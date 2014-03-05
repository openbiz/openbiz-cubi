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
				'click .btn-save':'saveRecord',
				"click .btn-phone-delete" 	: "showPhoneDeleteConfirm"

			},
			initialize:function(){
				var self = this;
				openbiz.View.prototype.initialize.call(this);
				this.template = _.template(templateData);
				this.models.phoneCollection.on('sync',function(){
					self._updateCollection("phone");
				});
				this.models.emailCollection.on('sync',function(){
					self._updateCollection("email");
				})
			},
			render:function(){
				var self = this;
				$(window).off('resize');
				this.models.contact.fetch({success:function(){
						self.locale.contact = self.models.contact;
						$(self.el).html(self.template(self.locale));
						openbiz.ui.update($(self.el));
				}});
				this.models.phoneCollection.fetch();
				this.models.emailCollection.fetch();

			},
			_updateCollection:function(collectionName){
				var self = this;
				switch (collectionName){
					case "phone":
					{
						self.locale.phones = self.models.phoneCollection.models;
						$(self.el).html(self.template(self.locale));
						openbiz.ui.update($(self.el))
						break;
					}
					case "email":
					{
						self.locale.emails = self.models.emailCollection.models;
						$(self.el).html(self.template(self.locale));
						openbiz.ui.update($(self.el))
						break;
					}
					case "address":
					{
						self.locale.emails = self.models.addressCollection.models;
						$(self.el).html(self.template(self.locale));
						openbiz.ui.update($(self.el))
						break;
					}
				}
			},
			saveRecord:function(event){
				event.preventDefault();
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
						self.app.views.get('system.NavView').updateDisplayName(contact.name.displayName);
						self.app.views.get('system.HeaderView').updateDisplayName(contact.name.displayName);
					}
				});
			},
			showPhoneDeleteConfirm:function(event){
				event.preventDefault();
				var self = this;
				var phoneId = $(event.currentTarget).attr('phone-id');
				var phoneNumber = self.models.phoneCollection.get(phoneId).get("number");
				bootbox.confirm({
					title:"Data delete confirmation",
					message:"You are about to delete this phone number: <h2>"+phoneNumber +"</h2> <br/> \
	    				    Are you sure?",
					callback:function(result){
						if(result){
							self.models.phoneCollection.get(phoneId).destroy({success:function(){
								self._updateCollection("phone");
							}});
						}
					}
				});
			},
			_validateForm:function(){
				return $(this.el).find('.form-profile').parsley('validate');
			}
		});
	});