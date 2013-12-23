/**
 * @namespace cubi
 * @author Jixian Wang <jixian@openbiz.me>
 * @version 4.0.0
 * @copyright {@link http://www.openbiz.me|Openbiz LLC}
 * @license {@link http://opensource.org/licenses/BSD-3-Clause|BSD License}
 */
"use strict";
module.exports = function(openbiz)
{
    if(typeof openbiz != 'object') return null;
    var application = new openbiz.Application({
        _context : openbiz.context,
        _name : require('path').basename(__dirname),
        _path : __dirname,
        openbiz: openbiz
    });
    return application;
}