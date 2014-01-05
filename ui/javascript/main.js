"use strict";
requirejs.config({
	config:{
		i18n:{
//			locale: 'zh-cn' //force to use this locale for test translation
		}
	},
	paths:{
		'bootstrap'	: 'vendor/bootstrap/js/bootstrap.min',
		'underscore': 'vendor/underscore/underscore-min',
		'jquery' 	: 'vendor/jquery/jquery-2.0.3.min',
		'backbone'	: 'vendor/backbone/backbone-min',
		'i18n'		: 'vendor/require/plugins/i18n',
		'text'		: 'vendor/require/plugins/text',
	},
	shim:{
		'backbone':{
			deps: [	'underscore', 
					'jquery'],
			exports: 'Backbone'
		},
		'underscore':{
			exports: '_'
		},
		'bootstrap':{
			deps: ["jquery"],
			exports: 'jQuery'	
		}
	},
	packages:['openbiz','cubi']
});

define(['backbone','i18n!../nls/locale','bootstrap'],
	function(Backbone,locale){
		var loaderView = $('div.loader');
		loaderView.fadeIn();
		loaderView.html(locale.loading.framework);
		require(['openbiz'],function(openbiz){
			window.appRouter = new openbiz.Router();
			window.openbiz = openbiz;
			loaderView.html(locale.loading.cubi);
			require(['cubi'], function(cubi){	
				 loaderView.html(locale.loading.done);
				 loaderView.fadeOut();			     		
			     if(window.hasOwnProperty('onCubiLoaded')){
			     	onCubiLoaded.apply(this);
			     }else{
			     	Backbone.history.start();
			     }
			});
		});
	}
);
