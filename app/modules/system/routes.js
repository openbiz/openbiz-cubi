'use strict';
module.exports = function(app){
    return {
        "get /apps" 		: [ app.getController("SystemController").getApps ]
    }
};