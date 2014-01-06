"use strict";
define(["./objects/Object",
		"./objects/Module",
		"./objects/Application",
		"./objects/Router",
		"./loaders/TemplateLoader",
		"./utils/MobileDetection",
		"./utils/BrowserDetection"
		],
	function(Object,
		Module,
		Application,
		Router,
		TemplateLoader,
		MobileDetection,
		BrowserDetection
		){		
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
			MobileDetection: MobileDetection,
			BrowserDetection: BrowserDetection
		},
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		isMobile: MobileDetection,
		Browser: BrowserDetection
	}
});