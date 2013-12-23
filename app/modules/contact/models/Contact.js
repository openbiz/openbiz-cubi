"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{
            firstName:  String,
            middleName: String,
            lastName:   String,
            displayName:String
        },
        avator:     String,
        birthday:   Date,
        company:    String,
        department: String,
        title:      String,
        emails:[{
            category:   String,
            email:      String
        }],
        phones:[{            
            type:{
                type: String,
                enum: ['mobile','linephone']
            },
            category:   String,
            countryCode: String,
            areaCode:   Number,
            number:     Number
        }],
        addresses:[{
            category:   String,
            country:    String,
            state:      String,
            city:       String,
            street:     String,
            zipcode:    Number
        }],
        ims:[{
            category:   String,     //home or work etcs
            type:       String,     //QQ or Skype
            account:    String
        }],
        creator:{
            _id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cubi.user.User'
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
        
    },{
        versionKey: true,
        collection: 'cubi-contact'
    });
    return mongoose.model('cubi.contact.Contact', schema);
}