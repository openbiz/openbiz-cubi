"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
        name: String,
        info:{
	        website: String,
            address:{            
                country: String,
                province: String,
                city: String,
                street: String,
                zipcode: String
            },
            phone:{
                countryCode: String,
                areaCode:   Number,
                number:     Number
            }
        },
        users:[{
        	id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cubi.user.User'
            },
            role:{
                type: String,
                enum: ['administrator','member'],
                default: 'member'
            }
        }],        
        contacts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cubi.contact.Contact'
        }],
        creator:{
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cubi.user.User'
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        },
	    invitations:[{
		    code:{
			    type: String,
			    required: true
		    },
		    expiredDate: Date,
		    infomation:{}
	    }]
    },{
        versionKey: false,
        collection: 'cubi_account'
    });

	schema.statics.createInvitationToken = function(callback)
	{
		var self = this;
		var randomString = function (length) {
			var chars = '0123456789'.split('');
			if (! length) {
				length = Math.floor(Math.random() * chars.length);
			}
			var str = '';
			for (var i = 0; i < length; i++) {
				str += chars[Math.floor(Math.random() * chars.length)];
			}
			return str;
		}
		var checkTokenExist = function(){
			var token = "ACCT-"+randomString(4)+"-"+randomString(6);
			self.findOne({'invitation.code':token},function(err,account){
				if(err){
					console.log("err: ",err);
					callback(err,null);
				}else if(account){
					console.log("account: ",account);
					return checkTokenExist();
				}
				else{
					console.log("token: ",token);
					callback(null,token);
				}
			});
		}
		checkTokenExist();
	};

	return app.openbiz.db.model('cubi.account.Account', schema);
}