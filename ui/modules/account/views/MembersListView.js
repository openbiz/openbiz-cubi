"use strict";
define(['text!templates/account/membersListView.html',
		'../models/UserCollection'],
	function(templateData,dataCollection){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'membersListView',
		el: '#main',
		apps:null,
		collection:null,
		events:{
			"click .btn-record-add" : "showRecordAddView",
			"click .btn-record-detail" :"showRecordEidtView",
			"click .btn-record-delete" 	: "showRecordDeleteConfirm"
		},
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
			this.collection = new dataCollection();
    	},
		renderDataGrid:function(){
			var columns = [
				{
					name: "user.contact.name.displayName",
					label: "Name",
					cell: "String",
					editable: false,
					sortable: false
				},
				{
					name: "user.username",
					label: "Email",
					cell: "String",
					editable: false,
					className:'hidden-xs',
					sortable: false
				},
				{
					name: "role",
					label: "Role",
					cell: "String",
					editable: false,
					sortable: false
				},
				{
					name: "_id",
					label: "Action",
					cell: Backgrid.UriCell.extend({
						render: function () {
							this.$el.empty();
							var model = this.model;
							var value = model.get(this.column.get("name"));
							this.$el.html( _.template(
								$('#action-column-template').html(),
								{id:value},
								{interpolate: /\{\{(.+?)\}\}/g}) );
							this.delegateEvents();
							return this;
						}
					}),
					editable: false,
					sortable: false
				}
			];

			//init the data grid
			var grid = new Backgrid.Grid({
				columns:columns,
				collection: this.collection,
				className: 'backgrid table table-striped table-bordered text-center',
				emptyText: 'Please click "Invite User" button to start invite your colleagues.'
			})
			$(this.el).find('.data-grid').append(grid.render().el);

			//init the paginator
			var paginator = new Backgrid.Extension.Paginator({
				windowSize: 10,
				slideScale: 0.5,
				goBackFirstOnSort: true,
				collection: this.collection,
				className:'pagination'
			});
			$(this.el).find('.data-grid').append(paginator.render().el);

			//pull data from server now
			this.collection.fetch();
		},
		render:function(){			
	        $(this.el).html(this.template(this.locale));
	        $(window).off('resize');
        	openbiz.ui.update($(this.el));
			this.renderDataGrid();
 	        return this;
	    },
		showRecordAddView:function(event){
			event.preventDefault();
		},
		showRecordEidtView:function(event){
			event.preventDefault();
			var recordId = $(event.currentTarget).attr('record-id');
			$("body").data('Members',this.collection.get(recordId));
			var self = this;
			this.app.require(['modules/system/models/AppCollection'],function(model){
				var appCollection = new model();
				appCollection.fetch({success:function(){
					self.apps = appCollection;
					self.popupView('account.membersEditView');
				}})
			});
		},
		showRecordDeleteConfirm:function(event){
			event.preventDefault();
			var self = this;
			var recordId = $(event.currentTarget).attr('record-id');
			if(recordId == openbiz.session.me.id){
				bootbox.alert("You cannot delete yourself from account", function() {

				});
				return;
			}
			var name = self.collection.get(recordId).get("user").contact.name.displayName;
			bootbox.confirm({
				title:"Data delete confirmation",
				message:" You are about to delete this user <strong>"+name +"</strong> <br/> \
	    				Are you sure?",
				callback:function(result){
					if(result){
						self.collection.get(recordId).destroy({success:function(){
							self.collection.fetch();
						},error:function(model,response){

						},wait: true});
					}
				}
			});
		}
	});
});