'use strict';
module.exports = function(app){
    return app.openbiz.Controller.extend({
        _model: app.getModel('Contact')
    });
}