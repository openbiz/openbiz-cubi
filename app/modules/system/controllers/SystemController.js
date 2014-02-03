'use strict';
module.exports = function(app){
    return app.openbiz.ModelController.extend({
        getApps:function(req,res)
        {
            var installedApps = [];
            for(var i in app.openbiz.loadedAppUIs)
            {
                var appName = app.openbiz.loadedAppUIs[i];
                if(app.openbiz.apps[appName].uiUrl!=null){
                    var roles = [];
                    for( var roleName in app.openbiz.apps[appName].roles){
                        var role = {id:roleName, name:roleName};
                        if(app.openbiz.apps[appName].defaultRoles.indexOf(roleName)!=-1){
                            role.isDefault=true;
                        }else{
                            role.isDefault=false;
                        }
                        roles.push(role);
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