'use strict';
module.exports = function(app){
    return app.openbiz.ModelController.extend({
        _model: app.getModel('User')
    });
}