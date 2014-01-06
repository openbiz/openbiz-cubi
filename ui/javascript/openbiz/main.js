"use strict";
define(["./objects/Object",
		"./objects/Module",
		"./objects/Application",
		"./objects/Router",
		"./loaders/TemplateLoader",
		"./utils/MobileDetection",
		],
	function(Object,
		Module,
		Application,
		Router,
		TemplateLoader,
		MobileDetection){		
	return {
		apps:{},
		loaders:{
			TemplateLoader : TemplateLoader
		},
		objects:{
			Object : 	 Object,
			Application: Application,
			Module : 	 Module,
			Router : 	 Router
		},			
		utils:{
			MobileDetection: MobileDetection
		},
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		isMobile: MobileDetection
	}
});