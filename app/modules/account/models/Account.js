"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        users:[{
        	type: mongoose.Schema.Types.ObjectId,
            ref: 'cubi.user.User'
        }],
        contacts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cubi.contact.Contact'
        }]
    },{
        versionKey: false,
        collection: 'cubi-account'
    });
    return mongoose.model('cubi.account.Account', schema);
}