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
        }],
        lastLogin:{
            timestamp: Date,
            ip: String
        },
        creator:{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cubi.user.User', 
                required : true               
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    },{
        versionKey: false,
        collection: 'cubi_user'
    });

    schema.methods.hasPermission = function(permission,openbiz)
    {
        if(this.roles.length)
        {
            for(var i in this.roles)
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