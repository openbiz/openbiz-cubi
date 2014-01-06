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
		'jquery' 	: 'vendor/jquery/jquery-1.10.2.min',
		'backbone'	: 'vendor/backbone/backbone-min',
		'i18n'		: 'vendor/require/plugins/i18n',
		'text'		: 'vendor/require/plugins/text',
		'respond'	: 'vendor/bootstrap/libs/respond.js/1.3.0/respond.min',
		'html5shiv'	: 'vendor/bootstrap/libs/html5shiv/3.7.0/html5shiv',
		'openbiz'	: 'built/openbiz.min'
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
		// trigger event for onEnvironmentLoaded
		if( typeof onEnvironmentLoaded =='function' ){onEnvironmentLoaded.apply(this);}
		var loaderView = $('div.loader');
		loaderView.fadeIn();
		loaderView.html(locale.loading.framework);
		require(['openbiz'],function(openbiz){
			// trigger event for onOpenbizLoaded
			if( typeof onOpenbizLoaded =='function' ){onOpenbizLoaded.apply(this);}
			if(openbiz.Browser.isIE(8,'lte')){
				//load patches for fucking <= IE8
				require(["html5shiv","respond"]);
			}
			var appRouter = new openbiz.Router();
			window.openbiz = openbiz;
			loaderView.html(locale.loading.cubi);
			require(['cubi'], function(cubi){	
				 openbiz.apps.cubi = cubi;
				 loaderView.html(locale.loading.done);
				 loaderView.fadeOut();
				 // trigger event for onCubiLoaded     		
			     if( typeof onCubiLoaded =='function' ){
			     	onCubiLoaded.apply(this);
			     }else{
			     	Backbone.history.start();
			     }
			});
		});
	}
);
