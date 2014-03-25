"use strict";
define(['text!templates/account/membersEditView.html'],
	function(templateData){
		return openbiz.View.extend({
			app: 'cubi',
			module:'account',
			name: 'membersEditView',
			el: '#main',
			model:null,
			events:{
				"click .btn-save-record" : "saveRecord"
			},
			initialize:function(){
				openbiz.View.prototype.initialize.call(this);
				this.template = _.template(templateData);
				this.model = $("body").data('Members');
			},
			render:function(){

				this.locale.user = this.model;
				this.locale.apps = this.app.views.get('account.MembersListView').apps.toJSON();;
				this.$el  = $(this.template(this.locale));
				openbiz.ui.update(this.$el)
				return this;
			},
			saveRecord:function(event){
				event.preventDefault();
				var selectedRoles = [], self = this;
				$('.role-selection input[name="role"]').each(function(){
					if($(this).is(":checked")){
						selectedRoles.push($(this).val());
					}
				});

				var collection = this.app.views.get('account.MembersListView').collection;

				this.model.save({roles:selectedRoles},{success:function(){
					collection.fetch({success:function(){
						if(self.model.id == openbiz.session.me.id){
							self.app.views.get("system.MenuView").updateMenu();
						}
						self.$el.modal('hide');
					}});
				}});
			}
		});
	});