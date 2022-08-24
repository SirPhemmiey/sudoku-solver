"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
let server;
_1.app.set('port', process.env.PORT || 9000); //this should ideally be gotten from env and 9000 should be the fallback port
server = _1.app.listen(_1.app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', _1.app.get('port'), _1.app.get('env'));
    console.log('Press CTRL+C to stop\n');
});
exports.default = server;
