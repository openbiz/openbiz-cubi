"use strict";
define(['text!templates/system/headerView.html'],
	function(templateData){
	return openbiz.View.extend({		
		app: 'cubi',
		name: 'headerView',
		el:'#wrapper #header',
		events:{
			'click .fullscreen'  : 'fullscreen'
		},
		initialize:function(){
			openbiz.View.prototype.initialize.call(this); 							
	        this.template = _.template(templateData);
    	},
		render:function(){
	        $(this.el).html(this.template(this.locale));
	        openbiz.ui.update();
	        $(this.el).fadeIn();
	        return this;
	    },
	    fullscreen:function(event){
	    	event.preventDefault();
			this._toggleFullScreen();
			$(this).find("i").toggleClass( "fa-expand" );
			$(this).find("i").toggleClass( "fa-compress" );					
	    },
	    _toggleFullScreen : function() {
			if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
				if (document.documentElement.requestFullScreen) {
					document.documentElement.requestFullScreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullScreen) {
					document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			} else {
				if (document.cancelFullScreen) {
					document.cancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}
			}
		}
	});	
})