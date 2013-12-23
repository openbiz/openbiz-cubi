"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            required: true
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
        collection: 'cubi-user'
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

    return mongoose.model('cubi.user.User', schema);
}