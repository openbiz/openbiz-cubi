"use strict";
define(['text!templates/account/applicationsDetailView.html',
		'modules/system/models/App'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'applicationsDetailView',
		el: '#main',
		model: model,
		events:{
			"click .btn-record-delete" 	: "showRecordDeleteConfirm"
		},				
		initialize:function(){						
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(id){	      
			var self = this;  
	        $(window).off('resize');    	
			this.model = new model({_id:id});
            var output = self.locale;
            output.data = self.model;
            debugger;
            $(self.el).html(self.template(output));
            openbiz.ui.update($(self.el));
 	        return this;
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
		    			self.model.destroy({success:function(){
                            // self.collection.fetch();
                            Backbone.history.navigate("#!/backend/account/invitations", {trigger: true, replace: true});
                        }});          
		    		}
		    	}
	    	});
	    }
	});
});