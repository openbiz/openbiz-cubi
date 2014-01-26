"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
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
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cubi.user.User',
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
        
    },{
        collection: 'cubi_contact'
    });

    return app.openbiz.db.model('cubi.contact.Contact', schema);
}