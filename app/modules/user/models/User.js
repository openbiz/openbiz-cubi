"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema(function(){
        var schema = require(__filename.replace(/\.js$/i,'.json'));
        //advanced parse config json can be done here
        schema.creator.timestamp.default=Date.now;      
        return schema;
    }(),{
        versionKey: false,
        collection: 'cubi_user'
    });

    schema.methods.hasPermission = function(permission,openbiz)
    {
        if(this.roles.length)
        {            
            for(var i=0 ; i<this.roles.length; i++)
            {
                var roleName = this.roles[i];    
                if(openbiz.getRole(roleName).indexOf(permission) != -1)
                {
                    return true;                
                }                
            }
        }
        return false;
    };

    schema.methods.getOutput = function(){
        var result = this.toJSON();
        delete result.password;
        if(result.contact){
            delete result.contact.creator;
        }
        if(result.account){
            delete result.account.invitations;
        }
        var perms = {};
        for(var i in result.roles){
            for(var appName in app.openbiz.apps){
                if(app.openbiz.apps.hasOwnProperty(appName)){
                    if(app.openbiz.apps[appName].roles.hasOwnProperty(result.roles[i])){
                        perms[result.roles[i]]  = app.openbiz.apps[appName].roles[result.roles[i]];
                        break;
                    }
                }
            }
        }
        result.roles = perms;
        return result;
    }

    schema.methods.recordLoginAction = function(ip){
        this.lastLogin.timestamp = new Date(),
        this.lastLogin.ip = ip,
        this.save();
    }

    schema.methods.getRoleInAccount = function(){
        if( typeof this.account == 'undefined'){
            return false;
        }        
        this.populate('account'); 
        return this.account.users.id(this._id).role;
    }

    schema.statics.encryptPassword = function(password) 
    {
        if(password){
            return require('crypto').createHmac('sha512', app.openbiz.context.get('crypto-key')).update(password).digest('hex');
        }else{
            return null;
        }
    };
    return app.openbiz.db.model('cubi.user.User', schema);
}