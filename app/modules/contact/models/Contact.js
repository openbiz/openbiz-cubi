"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema(
    app.openbiz.MetadataParser.call(app.openbiz,__filename.replace(/\.js$/i,'.json')),
    {
        collection: 'cubi.contact'
    });

    return app.openbiz.db.model('cubi.contact.Contact', schema);
}