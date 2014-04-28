"use strict";
define(['text!templates/account/membersNewView.html',
	'../../user/models/User'],
	function(templateData,model){
		return openbiz.View.extend({
			app: 'cubi',
			module:'account',
			name: 'membersNewView',
			el: '',
			model: model,
			events:{
				"click .btn-save-record" : "saveRecord"
			},
			initialize:function(){
				this.model = new model();
				this.template = _.template(templateData);
				openbiz.View.prototype.initialize.call(this);
			},
			render:function(){
				var self = this;
				var output = self.locale;
				this.$el.html($(this.template(output)))
				$(this.el).html(this.$el.html());
				openbiz.ui.update(this.$el);
				return this;
			},
			saveRecord:function(event){
				event.preventDefault();
				var self = this;
				if(!this._validateForm())return;
				if(self.locale.nameFormat[0]=='firstName'){
					var displayName = $('.form-add-record').find('#inputLastName').val() + $('.form-add-record').find('#inputFirstName').val();
				}else{
					var displayName = $('.form-add-record').find('#inputLastName').val() + $('.form-add-record').find('#inputFirstName').val();
				}
				var newRecord = {
					username: $('.form-add-record').find('#inputEmail').val(),
					password: $('.form-add-record').find('#inputPassword').val(),
					account:openbiz.session.me.get('account')._id,
					contact:{
						name:{
							firstName:      $('.form-add-record').find('#inputFirstName').val(),
							lastName:       $('.form-add-record').find('#inputLastName').val(),
							displayName:    displayName
						},
						company: openbiz.session.me.get('account').name,
						title:   $('.form-add-record').find('input:radio[name="title"]#title-mr').is(":checked")?'Mr.':'Ms.',
						emails:[{
							category:   'Default',
							email:      $('.form-add-record').find('#inputEmail').val()
						}],
						phones:[{
							type:       'mobile',
							category:   'Default',
							countryCode:$('.form-add-record').find('#inputMobileCountryCode').val(),
							number:     $('.form-add-record').find('#inputMobileNumber').val()
						}]
					}
				};

				this.model.create(newRecord,function(success,data)
				{
					if(success == true){
						self.model.joinMyAccount(data.id,function(success){
							if(success == false){
								bootbox.alert({
									title: self.locale.addUserErrorTitle,
									message:self.locale.addUserErrorMessage
								});
							}
							else{
								self.parent.collection.fetch({success:function(){
									self.$el.modal('hide');
									self.parent.showEditView(data.id);
								}});
							}
						});
					}else{
						bootbox.alert({
							title: self.locale.addUserErrorTitle,
							message:self.locale.addUserErrorMessage
						});
					}
				});
				this.$el.modal('hide');
			},
			_validateForm:function(){
				this.$el.find('.form-add-record').find('#inputEmail').attr("parsley-remote",this.app.appUrl+'/users/check-unique');
				return this.$el.find('.form-add-record').parsley('validate');
			}
		});
	});