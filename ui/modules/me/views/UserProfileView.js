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
				addressCollection: null,
				emailCollection: null,
				phoneCollection: null,
				contact: null
			},
			events:{
				"click .btn-update" : "saveRecord"
			},
			initialize:function(){
				openbiz.View.prototype.initialize.call(this);
				var self = this;
//				this.models.addressCollection = new addressCollection();
//				this.models.emailCollection = new emailCollection(openbiz.session.me.get('contact').emails);
//				this.models.phoneCollection = new phoneCollection();
				this.models.contact = new contact(openbiz.session.me.get('contact'));
				this.template = _.template(templateData);
				openbiz.session.me.on('sync',function(){
					$(self.el).html(self.template(self.locale));
					openbiz.ui.update($(self.el))
				});
			},
			renderDataPhoneGrid:function(){
				//init columns
				var columns = [
					{
						name:"countryCode",
						label:"CountryCode",
						cell:"string",
						editable:true,
						sortable: false
					},
					{
						name:"number",
						label:"Number",
						cell: Backgrid.IntegerCell.extend({
							orderSeparator: ''
						}),
						editable:true,
						sortable: false
					},
					{
						name:"_id",
						label:"Action",
						cell:Backgrid.UriCell.extend({
							render:function(){
								this.$el.empty();
								var value = this.model.get("_id");
								this.$el.html(_.template(
									$('#action-column-template-phone').html(),
									{id:value},
									{interpolate: /\{\{(.+?)\}\}/g}
								));
								this.delegateEvents();
								return this;
							}
						}),
						editable:false,
						sortable: false
					}
				];

				var editRow = Backgrid.Row.extend({
					events: {
						focusin: "rowFocused",
						focusout: "rowLostFocus"
					},
					rowFocused: function(event) {
						var number = this.model.get("number");
						var countryCode = this.model.get("countryCode");
						console.log(event.currentTarget.innerText);
					},
					rowLostFocus: function(event) {
						console.log($(event.currentTarget).text());
						console.log($(event.currentTarget).val());
						console.log($(event.currentTarget).html());
					}
				});

				//init data grid
				var grid = new Backgrid.Grid({
					row: editRow,
					columns:columns,
					collection:this.models.phoneCollection,
					className: 'backgrid table table-striped table-bordered text-center',
					emptyText: 'Please click "Add Phone" button to add your new phoneNumber.'
				});
				$(this.el).find('.data-grid-phone').append(grid.render().el);

				//init the paginator
				var paginator = new Backgrid.Extension.Paginator({
					windowSize: 2,
					slideScale: 0.5,
					goBackFirstOnSort: true,
					collection: this.models.phoneCollection,
					className:'pagination'
				});
				$(this.el).find('.data-grid-phone').append(paginator.render().el);
				this.models.phoneCollection.fetch();
			},
			renderDataAddressGrid:function(){

				//init columns
				var columns = [
					{
						name:"country",
						label:"Country",
						cell:"string",
						editable:false,
						sortable: false
					},
					{
						name:"state",
						label:"Province",
						cell:"string",
						editable:false,
						sortable: false
					},
					{
						name:"city",
						label:"City",
						cell:"string",
						editable:false,
						sortable: false
					},
					{
						name:"street",
						label:"Street",
						cell:"string",
						editable:false,
						sortable: false
					},
					{
						name:"zipcode",
						label:"Zipcode",
						cell: Backgrid.IntegerCell.extend({
							orderSeparator: ''
						}),
						editable:false,
						sortable: false
					},
					{
						name:"_id",
						label:"Action",
						cell:Backgrid.UriCell.extend({
							render:function(){
								this.$el.empty();
								var value = this.model.get("_id");
								this.$el.html(_.template(
									$('#action-column-template-address').html(),
									{id:value},
									{interpolate: /\{\{(.+?)\}\}/g}
								));
								this.delegateEvents();
								return this;
							}
						}),
						editable:false,
						sortable: false
					}
				];

				//init data grid
				var grid = new Backgrid.Grid({
					columns:columns,
					collection:this.models.addressCollection,
					className: 'backgrid table table-striped table-bordered text-center',
					emptyText: 'Please click "Add Address" button to add your new address.'
				});
				$(this.el).find('.data-grid-address').append(grid.render().el);

				//init the paginator
				var paginator = new Backgrid.Extension.Paginator({
					windowSize: 2,
					slideScale: 0.5,
					goBackFirstOnSort: true,
					collection: this.models.addressCollection,
					className:'pagination'
				});
				$(this.el).find('.data-grid-address').append(paginator.render().el);
				var self = this;
				this.models.addressCollection.fetch();
			},
			render:function(){
				$(window).off('resize');
				this.locale.contact = this.models.contact;
				$(this.el).html(this.template(this.locale));
				openbiz.ui.update($(this.el));
			},
			showPhoneAddView:function(event){
				event.preventDefault();
				this.popupView('me.UserProfileAddPhoneView');
			},
			saveRecord:function(event){
				event.preventDefault();
				if(!this._validateForm()) return;
				var self = this;
				if(this._needUpdateName()){
					var contact = {
						name: {
							lastName:$(this.el).find("#contactLastname").val(),
							firstName:$(this.el).find("#contactFirstname").val(),
							displayName:$(this.el).find("#contactLastname").val()+$(this.el).find("#contactFirstname").val()
						}
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
				}
				if(this._needUpdatePassword()){
					this.models.contact.updatePassword($("#inputRepeatPassword").val(),function(finishd){
						console.log("finishd :" +finishd);
						if(finishd){
							bootbox.alert({
								title:"Data notification",
								message:"<h2>Password has been reseted</h2>"
							});
						}
					});
				}
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
								self.models.phoneCollection.fetch();
							}});
						}
					}
				});
			},
			showAddressAddView:function(event){
				event.preventDefault();
				this.popupView('me.UserProfileAddAddressView');
			},
			showAddressDeleteConfirm:function(event){
				event.preventDefault();
				var self = this;
				var addressId = $(event.currentTarget).attr('address-id');
				bootbox.confirm({
					title:"Data delete confirmation",
					message:"You are about to delete this address <br/> \
	    				    Are you sure?",
					callback:function(result){
						if(result){
							self.models.addressCollection.get(addressId).destroy({success:function(){
								self.models.addressCollection.fetch();
							}});
						}
					}
				});
			},
			uploadPicture:function(event){
				event.preventDefault();
				var self = this;
				$(this.el).find("#group-content-picture").ajaxSubmit({
					complete: function(response)
					{
						if(response.status==201){
//							console.log(self.locale.baseUrl + response.responseJSON.location);
							$("#avator").attr("src",self.locale.baseUrl + response.responseJSON.location);
							$("#uploadFile").val("");
						}else{

						}
					},
					error: function()
					{
//						$(".file-upload-indicator").hide();
					}
				});
			},
			_validateForm:function(){
				var self = this;
				var isPwdChange = true;
				var isNameChange = true;
				if(this._needUpdateName()){
					isNameChange = $(this.el).find('.form-profile').parsley('validate');
				}
				if(this._needUpdatePassword()){
					$(this.el).find('.form-password input[name="password"]').attr("parsley-remote",this.app.appUrl+'/users/check-password');
					$(this.el).find('.form-password').parsley('addListener',{
						onFormValidate:function(isValid,event,ParsleyForm)
						{
							if(isValid){
//								self.onCreateAccount.call(self,event);
							}
						}
					});
					isPwdChange = $(this.el).find('.form-password').parsley('validate');
				}
				return (isPwdChange && isNameChange);
			},

			_needUpdateName:function(){
				if($("#contactLastname").val() != this.models.contact.get("name").lastName || $("#contactFirstname").val() != this.models.contact.get("name").firstName){
					return true;
				}
				return false;
			},
			_needUpdatePassword:function(){
				if($("#oldPassword").val().length > 0 || $("#inputPassword").val().length > 0 || $("#inputRepeatPassword").val().length > 0){
					return true;
				}
				return false;
			}
		});
	});