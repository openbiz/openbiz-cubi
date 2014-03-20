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
        collection: 'cubi_contact'
    });

    return app.openbiz.db.model('cubi.contact.Contact', schema);
}