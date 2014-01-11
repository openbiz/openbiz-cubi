"use strict";
define(['text!templates/system/layoutView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: openbiz.apps.cubi,
		el:'#wrapper',
		initialize:function(){						
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(openbiz.apps.cubi.locale.resetPasswordView));	 
	        this.afterViewRenderred();
	        return this;
	    },	    
	    afterViewRenderred:function(){	    				
			var throbber = new Throbber({  size: 32, padding: 17,  strokewidth: 2.8,  lines: 12, rotationspeed: 0, fps: 15 });
			throbber.appendTo(document.getElementById('canvas_loading'));
			throbber.start();
			$('#wrapper div#header').hide();
	        $('#wrapper div#nav').hide();
	        $('#wrapper div#menu').hide();	
	        openbiz.ui.update();
	    }
	});	
})