"use strict";
module.exports = function(app)
{
	var mongoose = app.openbiz.mongoose;
    var schema = new mongoose.Schema(
    app.openbiz.MetadataParser.call(app.openbiz,__filename.replace(/\.js$/i,'.json')),
    {
        versionKey: false,
        collection: 'fs.files'
    });
    return app.openbiz.db.model('cubi.system.File', schema);
}