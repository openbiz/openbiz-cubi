"use strict";
define(["./objects/Object",
		"./objects/Module",
		"./objects/Application",
		"./objects/Router",
		"./loaders/TemplateLoader"],
	function(Object,Module,Application,Router,TemplateLoader){
	return {
		loaders:{
			TemplateLoader : TemplateLoader
		},
		objects:{
			Object : 	 Object,
			Application: Application,
			Module : 	 Module,
			Router : 	 Router
		},		
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router
	}
});