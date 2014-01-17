/**
 * @namespace cubi
 * @author Jixian Wang <jixian@openbiz.me>
 * @version 4.0.0
 * @copyright {@link http://www.openbiz.me|Openbiz LLC}
 * @license {@link http://opensource.org/licenses/BSD-3-Clause|BSD License}
 */
"use strict";
var path = require('path');
module.exports = function(openbiz)
{
    if(typeof openbiz != 'object') return null;
    var application = new openbiz.Application({
        _context : openbiz.context,
        _name : path.basename(path.dirname(__dirname)),
        _path : __dirname,
        _ui : path.join(path.dirname(__dirname),'ui'),
        openbiz: openbiz,
        config:{
            invitation:{
                defaultExpiry: 86400 * 7 * 1000
            }
        }
    });    
    return application;
}