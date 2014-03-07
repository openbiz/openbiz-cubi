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
				'click .btn-save':'saveRecord',
				"click .btn-phone-delete" 	: "showPhoneDeleteConfirm",
				"click .btn-phone-add"      : "showPhoneAddView"
			},
			initialize:function(){
				openbiz.View.prototype.initialize.call(this);
				var self = this;
				this.models.addressCollection = new addressCollection(openbiz.session.me.get('contact').addresses);
				this.models.emailCollection = new emailCollection(openbiz.session.me.get('contact').emails);
				this.models.phoneCollection = new phoneCollection();
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
						cell:"string",
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

				//init data grid
				var grid = new Backgrid.Grid({
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
			render:function(){
 				$(window).off('resize');
				this.locale.contact = this.models.contact;
				this.locale.phones = this.models.phoneCollection.models;
				this.locale.emails = this.models.emailCollection.models;
				this.locale.addresses = this.models.addressCollection.models;
				$(this.el).html(this.template(this.locale));
				openbiz.ui.update($(this.el));
				this.renderDataPhoneGrid();
			},
			showPhoneAddView:function(event){
				event.preventDefault();
				this.popupView('me.UserProfileAddPhoneView');
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
					title:"Ms.",
					birthday:new Date($(this.el).find('input[name="contact-birthday"]').val())
				};
				console.log(contact);
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
								self.models.phoneCollection.fetch();
							}});
						}
					}
				});
			},
			_validateForm:function(){
				return $(this.el).find('.form-profile').parsley('validate');
			}
//			_validatePhone:function(){
//				return $(this.el).find('.form-phone').parsley('validate');
//			}
		});
	});