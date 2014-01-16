"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        info:{
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
        	userId:{
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
        }       
    },{
        versionKey: false,
        collection: 'cubi_account'
    });
    return mongoose.model('cubi.account.Account', schema);
}