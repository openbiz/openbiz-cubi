"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true            
        },
        password: {
            type: String,
            required: true
        },
        social:{
            facebook:{},
            twitter:{},
            qzone:{},
            weibo:{}
        },
        account:{
        	type: mongoose.Schema.Types.ObjectId,
            ref: 'cubi.account.Account'
        },
        contact:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cubi.contact.Contact' 
        },
        roles:[{
            type: String,
            default: 'cubi-user'
        }]
    },{
        versionKey: false,
        collection: 'cubi_user'
    });

    schema.methods.hasPermission = function(permission)
    {
        for(var i in this.roles)
        {
            var roleName = this.roles[i];
            if(openbiz.getRole(roleName).indexOf(permission) != -1)
            {
                return true;                
            }
        }
        return false;
    };

    return app.openbiz.db.model('cubi.user.User', schema);
}