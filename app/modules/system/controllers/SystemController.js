'use strict';
module.exports = function(app){
    var self = function(){
        return app.getController(require('path').basename(module.filename,'.js'));
    };
    return app.openbiz.ModelController.extend({
        model:app.getModel('User'),
        getApps:function(req,res)
        {
            var installedApps = [];
            for(var appName in app.openbiz.apps)
            {
                if(app.openbiz.apps[appName].uiUrl!=null){
                    installedApps.push({
                        name:   appName,
                        roles:  app.openbiz._.keys(app.openbiz.apps[appName].roles),
                        appUrl: app.openbiz.apps[appName].appUrl,
                        baseUrl:app.openbiz.apps[appName].uiUrl,
                        info:   app.openbiz.apps[appName].info
                    });
                }
            }
            res.json(200,installedApps);
        }
    });
};