'use strict';
module.exports = function(app){
    return app.openbiz.ModelController.extend({
        getApps:function(req,res)
        {
            var installedApps = [];
            for(var appName in app.openbiz.apps)
            {
                if(app.openbiz.apps[appName].uiUrl!=null){
                    var roles = [];
                    for( var roleName in app.openbiz.apps[appName].roles){
                        roles.push({id:roleName, name:roleName});
                    }
                    installedApps.push({
                        name:   appName,
                        roles:  roles,
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