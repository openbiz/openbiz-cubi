"use strict";
define(['./router'],
    function( router ){    	
    	var R = new router();
        return openbiz.Module.extend({
            router: router
        });
    }
);