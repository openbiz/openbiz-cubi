"use strict";
define(['text!templates/account/applicationsListView.html',
		'modules/system/models/AppCollection'],
	function(templateData,dataCollection){
	return openbiz.View.extend({
		app: 'cubi',
        module:'account',
		name: 'applicationsListView',
		el: '#main',
		collection: dataCollection,
		events:{
			"click .btn-record-delete" 	: "showRecordDeleteConfirm" ,
			"click .btn-record-add" 	: "showRecordAddView"
		},				
		initialize:function(){			
			var self = this;
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
	        this.collection = new dataCollection();
    	},
    	renderDataGrid:function(){
    		var columns = [
				{
	    			name: "name",
	    			label: "Name",
                    cell: Backgrid.UriCell.extend({
                        render: function () {
                            this.$el.empty();
                            debugger;
                            var rawValue = this.model.get(this.column.get("name"));
                            var formattedValue = this.formatter.fromRaw(rawValue, this.model);
                            this.$el.append($("<a>", {
                                tabIndex: -1,
                                href: "#!/backend/account/applications/"+rawValue,
                                title: this.title || rawValue
                            }).text(formattedValue));
                            this.delegateEvents();
                            return this;
                        }
                    }),
                    editable: false
	    		},
                {
                    name: "info.version",
                    label: "Version",
                    cell: "String",
                    editable: false,
                    sortable: false
                },
                {
                    name: "info.name",
                    label: "Description",
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
                            console.log(value);
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

    		//init the search bar
			var filter = new Backgrid.Extension.ServerSideFilter({
			  collection: this.collection,
			  name: "query",
			  placeholder: "ex: Search an application"
			});
			$(this.el).find('.uninstall-grid').append(filter.render().el);

    		//init the data grid
    		var grid = new Backgrid.Grid({
    			columns:columns,
    			collection: this.collection,
    			className: 'backgrid table table-striped table-bordered text-center',
    			emptyText: 'Please click "Invite User" button to start invite your colleagues.'
    		})
    		$(this.el).find('.uninstall-grid').append(grid.render().el);

    		//init the paginator
			var paginator = new Backgrid.Extension.Paginator({
				windowSize: 10,
				slideScale: 0.5,
				goBackFirstOnSort: true,
				collection: this.collection,
				className:'pagination'
			});
			$(this.el).find('.uninstall-grid').append(paginator.render().el);

			//pull data from server now
    		this.collection.fetch();
    	},
		render:function(){	    			
	        $(window).off('resize');
	        $(this.el).html(this.template(this.locale)); 
	        openbiz.ui.update($(this.el));       	
	        this.renderDataGrid();
 	        return this;
	    },
	    showRecordAddView:function(event){
	    	event.preventDefault();	 
	    	this.popupView('account.ApplicationsNewView');
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
	});
});