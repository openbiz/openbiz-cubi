"use strict";
define(['text!templates/account/invitationsListView.html',
		'../models/InvitationCollection'],
	function(templateData,dataCollection){
	return openbiz.GridView.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsListView',
		el: '#main',
		collection: dataCollection,
		events:{
			"click .btn-record-add" 	: "showRecordAddView"
		},
		_config:{
			fields:[
				{
					name:"Token",
					field:"_id",
					displayName:"Token",
					type:"link",
					url:"/account/invitations/:id"
				},
				{
					name:"User",
					field:"data.contact.name.displayName",
					displayName:"User",
					className:"hidden-xs",
					sortable:true
				},
				{
					name:"Email",
					field:"data.username",
					displayName:"Email",
					sortable:true
				},
				{
					name:"expiredDate",
					field:"expiredDate",
					displayName:"Expiry Date",
					sortable:true
				},
				{
					"name":"actions",
					"displayName":"Action",
					"type":"recordActions"
				}
			],
			paginator:true,
			filter:true,
			recordActions:[
				{
					"name":"detail",
					"displayName":"Detail",
					"type":"Button",
					"event":"click",
					"action":"showRecordDetail"
				},
				{
					"name":"delete",
					"displayName":"delete",
					"type":"Button",
					"event":"click",
					"action":"showRecordDeleteConfirm"
				}
			]
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
	    	this.popupView('account.InvitationsNewView');
	    },	    
	    showRecordDeleteConfirm:function(event){	    	
	    	event.preventDefault();	   
	    	var self = this; 
	    	var recordId = $(event.currentTarget).attr('record-id');	    		
	    	bootbox.confirm({
	    		title:"Data delete confirmation",
	    		message:"<h2>"+recordId +"</h2> <br/> \
	    				You are about to delete this invitation: <br/> \
	    				Are you sure?",
				callback:function(result){
		    		if(result){
		    			self.collection.get(recordId).destroy({success:function(){
                            self.collection.fetch();
                        }});          
		    		}
		    	}
	    	});
	    },
		showRecordDetail:function(event){
			event.preventDefault();
			var self = this;
			var recordId = $(event.currentTarget).attr('record-id');
			var url = "#!/backend/account/invitations/" + recordId;
			Backbone.history.navigate(url, {trigger: true, replace: true});
		}
	});
});