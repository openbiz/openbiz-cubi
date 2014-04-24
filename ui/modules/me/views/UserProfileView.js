"use strict";
define(['text!./UserProfileView.json',
	'text!templates/me/userProfileView.html'
	/*CUSTOM_ELEMNT_CLASSES*/],
	function(metadata,templateData,dataModel){
		return openbiz.View.extend({
			app: 'cubi',
			name: 'userProfileView',
			module:'me',
			el: '#main',
			template: templateData,
			metadata: metadata,			
			events:{},
			render:function(id){
				this._dataId = id;
				openbiz.View.prototype.render.call(this);
			},
			beforeRender:function(){},
			afterRender:function(){},
			beforeDeleteRecord:function(){},
			afterDeleteRecord:function(){}
	});
});