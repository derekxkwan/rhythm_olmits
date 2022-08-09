"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pd = void 0;
const pdpath = require('path');
;
class Pd {
    constructor(_pn, _ppath, _nin, _nout, _sr, _ticks) {
        const pd = require('node-libpd');
        let pname = "libpdtest.pd";
        //BEGIN CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename
        let ppath = pdpath.join(__dirname, 'pd');
        //END CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename
        let num_in = 1;
        let num_out = 2;
        let sr = 44100;
        let ticks = 8;
        if (typeof _pn != "undefined") {
            pname = _pn;
        }
        ;
        if (typeof _ppath != "undefined") {
            ppath = _ppath;
        }
        ;
        if (typeof _nin != "undefined") {
            num_in = _nin;
        }
        ;
        if (typeof _nout != "undefined") {
            num_out = _nout;
        }
        ;
        if (typeof _sr != "undefined") {
            sr = _sr;
        }
        ;
        if (typeof _ticks != "undefined") {
            ticks = _ticks;
        }
        ;
        // BEGIN CODE FROM https://github.com/ircam-ismm/node-libpd/blob/master/README.md
        const initialized = pd.init({
            numInputChannels: num_in,
            numOutputChannels: num_out,
            sampleRate: sr,
            ticks: ticks,
        });
        // END CODE FROM https://github.com/ircam-ismm/node-libpd/blob/master/README.md
        // instantiate a patch
        var patch = pd.openPatch(pname, ppath);
        this.main = pd;
        this.patch = patch;
        this.num_in = num_in;
        this.num_out = num_out;
        this.sr = sr;
        this.ticks = ticks;
        this.pname = pname;
        this.ppath = ppath;
    }
    subscribe_num(listenkey, callback) {
        // BEGIN CODE FROM https://github.com/ircam-ismm/node-libpd/blob/master/README.md
        // copying call outline code
        this.main.subscribe(`${this.patch.$0}-${listenkey}`, msg => {
            let num = msg;
            //console.log(listenkey, num);
            callback(num);
        });
        // END CODE FROM https://github.com/ircam-ismm/node-libpd/blob/master/README.md
    }
    // BEGIN CODE FROM https://github.com/ircam-ismm/node-libpd/blob/master/README.md
    subscribe_numarray(listenkey, callback) {
        this.main.subscribe(`${this.patch.$0}-${listenkey}`, msg => {
            callback(msg);
        });
    }
    // END CODE FROM https://github.com/ircam-ismm/node-libpd/blob/master/README.md
    adjust_num(sendkey, x) {
        this.main.send(`${this.patch.$0}-${sendkey}`, x);
    }
    adjust_numlist(sendkey, x) {
        this.main.send(`${this.patch.$0}-${sendkey}`, x);
    }
    clean_up() {
        //this.main.closePatch(this.patch);
        this.main.destroy();
    }
}
exports.Pd = Pd;
;
