"use strict";
define(['text!./invitationsListView.json',
		'text!templates/account/invitationsListView.html',
		'../models/InvitationCollection'],
	function(metadata,templateData,dataCollection){
	return openbiz.GridView.extend({
		app: 'cubi',
        module:'account',
		name: 'invitationsListView',
		el: '#main',
		collection: dataCollection,
		template : templateData,
		metadata:  openbiz.MetadataParser.call(this,metadata),		
		events:{
			"click .btn-record-add" 	: "showRecordAddView"
		},		
		
		beforeRender:function(){},
		afterRender:function(){},

		beforeDeleteRecord:function(){},
		afterDeleteRecord:function(){},


	    showRecordAddView:function(event){
	    	event.preventDefault();	 
	    	this.popupView('account.InvitationsNewView');
<<<<<<< HEAD
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
	    }
=======
	    },	    	    
		showRecordDetail:function(event){
			event.preventDefault();
			var self = this;
			var recordId = $(event.currentTarget).attr('record-id');
			var url = "#!/backend/account/invitations/" + recordId;
			Backbone.history.navigate(url, {trigger: true, replace: true});
		}
>>>>>>> 040a6c9f25929285a394c2ad8b3e4d1a2383d8a9
	});
});