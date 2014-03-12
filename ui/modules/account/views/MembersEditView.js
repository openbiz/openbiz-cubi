"use strict";
define(['text!templates/account/membersEditView.html',
	'../models/User'],
	function(templateData,datamodel){
		return openbiz.View.extend({
			app: 'cubi',
			module:'account',
			name: 'membersEditView',
			el: '#main',
			model:null,
			events:{
				"click .btn-record-add" : "showRecordAddView",
				"click .btn-record-detail" :"showRecordEidtView",
				"click .btn-record-delete" 	: "showRecordDeleteConfirm"
			},
			initialize:function(){
				openbiz.View.prototype.initialize.call(this);
				this.template = _.template(templateData);
				this.model = new datamodel();
			},
			render:function(){
				$(this.el).html(this.template(this.locale));
				$(window).off('resize');
				openbiz.ui.update($(this.el));
				return this;
			}
		});
	});