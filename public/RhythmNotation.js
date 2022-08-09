/// <reference path="./global.d.ts" />
// BEGIN CODE FROM https://github.com/0xfe/vexflow/wiki/VexFlow-4-Tutorial 
import { Formatter, Renderer, Stave, StaveNote, Tuplet, Beam } from "vexflow/gonville";
//END CODE FROM https://github.com/0xfe/vexflow/wiki/VexFlow-4-Tutorial
const rpos = "b/4"; //rest position
const npos = "g/4"; //note position
const clefpad = 50;
const mwidth = { "2/4": 175, "3/4": 225, "4/4": 275 };
export class ScoreDisplay {
    constructor(cnv, w, h) {
        let pad = 10;
        // BEGIN CODE FROM https://github.com/0xfe/vexflow/wiki/Tutorial
        // boilerplate
        //let cur : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(container_id);
        let rdr = new Renderer(cnv, Renderer.Backends.CANVAS);
        rdr.resize(w, h);
        let ctx = rdr.getContext();
        ctx.clearRect(0, 0, w, h);
        // END CODE FROM https://github.com/0xfe/vexflow/wiki/Tutorial
        this.ctx = ctx;
        this.cnv = cnv;
        this.width = w;
        this.height = h;
        this.pad = pad;
    }
    get_durstr(cur) {
        let cval = cur.val;
        let sdiv = cur.subdiv;
        let cm = cur.mult;
        let cdot = cur.dot;
        let ret = "";
        if (sdiv == 1 && cm == 1) {
            ret = "q";
        }
        else if (sdiv == 2 && cm == 1) {
            ret = "8";
        }
        else if (sdiv == 4 && cm == 1) {
            ret = "16";
        }
        else if (sdiv == 1 && cm == 2) {
            ret = "h";
        }
        else if (sdiv == 1 && cm == 4) {
            ret = "h";
        }
        ;
        if (cval < 0.01) {
            ret = ret.concat("r");
        }
        ;
        if (cdot == true) {
            ret = "d".concat(ret);
        }
        ;
        return ret;
    }
    parse_bar(cur_bar, qdur) {
        let all_notes = [];
        let all_tup = [];
        let all_beam = [];
        let cur_notes = [];
        for (let i = 0; i < cur_bar.length; i++) {
            let cur_beat = cur_bar[i];
            let last_str;
            for (let j = 0; j < cur_beat.length; j++) {
                let cur_note = cur_beat[j];
                let cur_str = this.get_durstr(cur_note);
                let cur_q = cur_note.qval;
                let cur_key = npos;
                if (cur_note.val == 0) {
                    cur_key = rpos;
                }
                ;
                let cur_sn = new StaveNote({ keys: [cur_key], duration: cur_str });
                last_str = cur_str;
                cur_notes.push(cur_sn);
            }
            ;
            // BEGIN CODE FROM https://github.com/0xfe/vexflow/wiki/Beams 
            if (cur_notes.length > 1) {
                let last_idx = cur_beat.length - 1;
                let cur_note = cur_beat[last_idx];
                let cur_str = last_str;
                if (cur_str != "q" && cur_str != "qr") {
                    let cur_beam = new Beam(cur_notes);
                    all_beam.push(cur_beam);
                }
                ;
                // END CODE FROM https://github.com/0xfe/vexflow/wiki/Beams 
                //BEGIN CODE FROM https://github.com/0xfe/vexflow/wiki/Tuplets
                if (cur_note.tuplet == 3) {
                    let cur_tup = new Tuplet(cur_notes, {
                        num_notes: 3, notes_occupied: 2
                    });
                    all_tup.push(cur_tup);
                }
                else if (cur_note.tuplet == 5) {
                    let cur_tup = new Tuplet(cur_notes, {
                        num_notes: 5, notes_occupied: 4
                    });
                    all_tup.push(cur_tup);
                }
                ;
            }
            ;
            //END CODE FROM https://github.com/0xfe/vexflow/wiki/Tuplets
            if (cur_notes.length > 0) {
                all_notes = all_notes.concat(cur_notes);
                cur_notes = [];
            }
            ;
        }
        ;
        let ret = { notes: all_notes, beams: all_beam, tuplets: all_tup };
        return ret;
    }
    display_rhythm(cur) {
        let qdur = cur.qdur;
        let r_timesig = cur.meter;
        let r_ex = cur.example;
        let cur_clef = "percussion";
        let meter_str = `${r_timesig[0]}/${r_timesig[1]}`;
        let staves = [];
        let cur_mwidth = mwidth["2/4"];
        if (meter_str in mwidth) {
            cur_mwidth = mwidth[meter_str];
        }
        ;
        let mw = cur_mwidth;
        let cx = this.pad;
        let cy = this.pad;
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < r_ex.length; i++) {
            let cw = mw;
            if (i == 0) {
                cw = mw + clefpad;
            }
            ;
            let cur_stave = new Stave(cx, cy, cw);
            cx = cw + cx;
            if (i == 0) {
                cur_stave.addClef(cur_clef).addTimeSignature(meter_str);
            }
            ;
            cur_stave.setContext(this.ctx).draw();
            let pb = this.parse_bar(r_ex[i], qdur);
            //BEGIN CODE FROM https://github.com/0xfe/vexflow/wiki/Tutorial
            Formatter.FormatAndDraw(this.ctx, cur_stave, pb.notes);
            //END CODE FROM https://github.com/0xfe/vexflow/wiki/Tutorial
            for (let j = 0; j < pb.beams.length; j++) {
                pb.beams[j].setContext(this.ctx).draw();
            }
            ;
            for (let j = 0; j < pb.tuplets.length; j++) {
                pb.tuplets[j].setContext(this.ctx).draw();
            }
            ;
            staves.push(cur_stave);
        }
        ;
    }
}
