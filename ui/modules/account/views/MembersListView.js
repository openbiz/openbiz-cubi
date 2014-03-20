"use strict";
define(['text!templates/account/membersListView.html',
		'../models/UserCollection'],
	function(templateData,dataCollection){
	return openbiz.GridView.extend({
		app: 'cubi',
        module:'account',
		name: 'membersListView',
		el: '#main',
		apps:null,
		collection:null,
		_config:{
			fields:[
				{
					name:"displayName",
					field:"user.contact.name.displayName",
					displayName:"Name"
				},
				{
					name:"email",
					field:"user.username",
					displayName:"Email",
					className:"hidden-xs"
				},
				{
					name:"role",
					field:"role",
					displayName:"Role"
				},
				{
					"name":"actions",
					"displayName":"Action",
					"type":"recordActions"
				}
			],
			paginator:true,
			filter:false,
			recordActions:[
				{
					"name":"edit",
					"displayName":"Edit",
					"type":"Button",
					"event":"click",
					"action":"showRecordDeleteConfirm"
				}
			]
		},
		events:{
			"click .btn-record-add" : "showRecordAddView"
		},
		initialize:function(){			
			openbiz.GridView.prototype.initialize.call(this);
	        this.template = _.template(templateData);
			this.collection = new dataCollection();
    	},
		render:function(){
			openbiz.GridView.prototype.render.call(this);
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
					self.popupView('account.MembersEditView');
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