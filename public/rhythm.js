"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_exercise = exports.get_rnotes = exports.wt_3idx = exports.wt_2idx = exports.rhythm_priority = exports.cat_performance = exports.default_good_beats = exports.duration_to_beat = exports.convert_example_timings = exports.debug_evts = exports.parse_performance = exports.bpm_to_msec = exports.rex_to_list = exports.rbar_to_list = exports.dur_remaining = exports.get_durgrain = exports.make_rex = exports.tuparray2d_to_rbars = exports.tuparray_to_rbar = exports.rnotes_to_rbar = exports.tup_to_rnote = exports.get_qtized = exports.categorize_beat = exports.debug_ex = exports.focus_pickchance = exports.focus_beatwt34 = exports.focus_beatwt24 = exports.unfocus_pattwt = exports.focus_pattwt = exports.m34_beatorder = exports.m24_beatorder = exports.m34_exlen = exports.m24_exlen = exports.num_patts_to_pick = exports.comp_closest = exports.perf_vthresh = exports.dur_lim_match = exports.dur_lim_same = exports.dur_lim_correct = exports.dur_grain = void 0;
const RK = __importStar(require("./rhythm_knowledge"));
exports.dur_grain = 100000; //grain of duration
exports.dur_lim_correct = 0.225; //limit to consider note correct
exports.dur_lim_same = 0.5; //limit to consider note the same
exports.dur_lim_match = 0.225; //limit to consider note a match
exports.perf_vthresh = 5.; //threshold val must pass in performance to consider an actual attack
exports.comp_closest = true; //compare if multiple attack with closest, else compare with maximum
exports.num_patts_to_pick = 3;
// skill lower bound, barlen
exports.m24_exlen = [[0, 2], [25, 3], [50, 4]];
exports.m34_exlen = [[0, 1], [25, 2], [50, 3]];
exports.m24_beatorder = [[0, 1], [1, 0]];
exports.m34_beatorder = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
//weight to pick focus patterns
exports.focus_pattwt = [50, 30, 20];
exports.unfocus_pattwt = [40, 35, 25];
//weight to pick focus beat
exports.focus_beatwt24 = [80, 20];
exports.focus_beatwt34 = [70, 25, 5];
//chance at which to pick focus dur
exports.focus_pickchance = 75;
function debug_ex(x) {
    for (let i = 0; i < x.example.length; i++) {
        console.log(`-----${i}-----`);
        for (let j = 0; j < x.example[i].length; j++) {
            let cur_beat = x.example[i][j];
            let curcat = categorize_beat(cur_beat);
            console.log(cur_beat);
            console.log(curcat);
        }
        ;
    }
    ;
}
exports.debug_ex = debug_ex;
function categorize_beat(x) {
    let min_mult = Infinity;
    let max_div = -Infinity;
    let retstr = "";
    for (let i = 0; i < x.length; i++) {
        let cnote = x[i];
        let cmult = cnote.mult;
        let cdiv = cnote.subdiv;
        let cdot = cnote.dot;
        if (cdot == true) {
            cdiv *= 2;
        }
        ;
        min_mult = Math.min(min_mult, cmult);
        max_div = Math.max(max_div, cdiv);
    }
    ;
    for (let i = 0; i < x.length; i++) {
        let cnote = x[i];
        let cmult = cnote.mult;
        let cdiv = cnote.subdiv;
        let cdot = cnote.dot;
        let cval = cnote.val;
        let cstr = "";
        let cur_len = 1;
        if (cdiv != max_div) {
            let cur_prop = Math.round(max_div / cdiv);
            cur_len *= cur_prop;
        }
        ;
        if (cdot == true) {
            cur_len = Math.round((cur_len * 3) / 2);
        }
        ;
        if (cmult != min_mult) {
            let cur_prop = Math.round(cmult / min_mult);
            cur_len *= cur_prop;
        }
        ;
        for (let j = 0; j < cur_len; j++) {
            let toadd = "0";
            if (j == 0) {
                if (cval > 0) {
                    toadd = "1";
                }
                ;
            }
            ;
            cstr = cstr.concat(toadd);
        }
        ;
        retstr = retstr.concat(cstr);
    }
    ;
    let rkind = RK.get_rhy_kind(retstr);
    let ret = { rstr: RK.pattstr_to_key(retstr), mult: min_mult, dur: rkind.dur, kind: rkind.kind };
    return ret;
}
exports.categorize_beat = categorize_beat;
function get_qtized(sdiv, ctup, cmult, cdot, qdur) {
    let ret = (qdur * cmult) / sdiv;
    if (cdot == true) {
        ret = Math.round(ret * 3 / 2);
    }
    ;
    if (ctup == 3) {
        ret = Math.round(ret * 2 / 3);
    }
    else if (ctup == 5) {
        ret = Math.round(ret * 4 / 5);
    }
    ;
    return ret;
}
exports.get_qtized = get_qtized;
function tup_to_rnote(x, qdur) {
    let cval = x[0];
    let cdiv = x[1];
    let ctup = x[2];
    let cmult = 1;
    let cdot = false;
    if (x.length > 3) {
        cmult = x[3];
    }
    ;
    if (x.length > 4) {
        if (x[4] > 0) {
            cdot = true;
        }
        ;
    }
    ;
    let qval = get_qtized(cdiv, ctup, cmult, cdot, qdur);
    let res = { val: cval, subdiv: cdiv, tuplet: ctup, mult: cmult, dot: cdot, qval: qval };
    return res;
}
exports.tup_to_rnote = tup_to_rnote;
function rnotes_to_rbar(x, qdur) {
    let accum = 0;
    let ret = [];
    let cur_ngroup = [];
    for (let i = 0; i < x.length; i++) {
        let cnote = x[i];
        let qval = cnote.qval;
        accum = accum + qval;
        cur_ngroup.push(cnote);
        if (accum % qdur == 0 && accum > 0) {
            //fill out durs before pushing to ret list
            ret.push(cur_ngroup);
            cur_ngroup = [];
            accum = 0;
        }
        ;
    }
    ;
    return ret;
}
exports.rnotes_to_rbar = rnotes_to_rbar;
function tuparray_to_rbar(x) {
    let rnotes = x.map(y => tup_to_rnote(y, RK._qdur));
    let rbar = rnotes_to_rbar(rnotes, RK._qdur);
    return rbar;
}
exports.tuparray_to_rbar = tuparray_to_rbar;
function tuparray2d_to_rbars(x) {
    let ret = x.map(y => tuparray_to_rbar(y));
    return ret;
}
exports.tuparray2d_to_rbars = tuparray2d_to_rbars;
function make_rex(tups, meter) {
    let cur_ex = tuparray2d_to_rbars(tups);
    let cb = [];
    for (let i = 0; i < cur_ex.length; i++) {
        let cur_bar = cur_ex[i];
        let cur_cats = [];
        for (let j = 0; j < cur_bar.length; j++) {
            let cur_beat = cur_bar[j];
            let cur_cat = categorize_beat(cur_beat);
            cur_cats.push(cur_cat);
        }
        cb.push(cur_cats);
    }
    ;
    let ret = { meter: meter, example: cur_ex, cats: cb, qdur: RK._qdur };
    return ret;
}
exports.make_rex = make_rex;
function get_durgrain(qval, qdur) {
    let ret = Math.floor((qval * exports.dur_grain) / qdur) / exports.dur_grain;
    return ret;
}
exports.get_durgrain = get_durgrain;
//basically, make sure things add up to a whole number (triplets: 0.33 0.33 0.34)
function dur_remaining(durs) {
    let cur_sum = durs.reduce((x, y) => x + y);
    let modded = Math.floor(cur_sum * exports.dur_grain) % exports.dur_grain;
    let rem = (exports.dur_grain - modded) / exports.dur_grain;
    return rem;
}
exports.dur_remaining = dur_remaining;
function rbar_to_list(cur, cm, idx, _cur_taccum, qdur) {
    //output lists of form [timing, val, timing, val, timing, val,...]
    let accum = 0;
    let timeval_list = [];
    let evt_list = [];
    let cur_durs = [];
    let cur_vals = [];
    let cur_refs = [];
    let cur_evts = [];
    let reflist = [];
    let cur_taccum = _cur_taccum;
    for (let i = 0; i < cur.length; i++) {
        let cur_beat = cur[i];
        for (let j = 0; j < cur_beat.length; j++) {
            let cur_note = cur_beat[j];
            let cur_ref = [idx, i, j];
            let cval = cur_note.val;
            let qval = cur_note.qval;
            let cdur;
            if ((cur_durs.length < 1) || j < (cur_beat.length - 1)) {
                cdur = get_durgrain(qval, qdur);
            }
            else {
                cdur = dur_remaining(cur_durs);
            }
            ;
            //timing measures moment of attack (not after)
            let cur_timing = cur_taccum;
            let cur_nevt = { time: cur_timing, val: cval };
            let cur_exevt = { nevt: cur_nevt, ref: cur_ref };
            //now add cdur to get beginning of next attack
            cur_taccum = cur_taccum + cdur;
            //push to current lists
            cur_vals.push(cval);
            cur_durs.push(cdur);
            cur_evts.push(cur_exevt);
        }
        ;
        for (let j = 0; j < cur_durs.length; j++) {
            timeval_list.push(cur_durs[j]);
            timeval_list.push(cur_vals[j]);
            evt_list.push(cur_evts[j]);
        }
        ;
        cur_vals = [];
        cur_durs = [];
        cur_evts = [];
    }
    ;
    let ret = { timeval: timeval_list, evts: evt_list, accum: cur_taccum };
    return ret;
}
exports.rbar_to_list = rbar_to_list;
function rex_to_list(cur) {
    let cur_bars = cur.example;
    let cur_meter = cur.meter;
    let timeval_list = [];
    let evt_list = [];
    let qdur = cur.qdur;
    let cur_taccum = 0;
    for (let i = 0; i < cur_bars.length; i++) {
        let cur = rbar_to_list(cur_bars[i], cur_meter, i, cur_taccum, qdur);
        timeval_list = timeval_list.concat(cur.timeval);
        evt_list = evt_list.concat(cur.evts);
        cur_taccum = cur.accum;
    }
    ;
    let ret = { timeval: timeval_list, evts: evt_list };
    return ret;
}
exports.rex_to_list = rex_to_list;
function bpm_to_msec(bpm) {
    //http://moz.ac.at/sem/lehre/lib/cdp/cdpr5/html/timechart.htm
    return (60000. / bpm);
}
exports.bpm_to_msec = bpm_to_msec;
function parse_performance(cur, countin, bpm) {
    //format from Pd is beats of lead in then timing,val pairs
    let ret = [];
    let msec_scale = bpm_to_msec(bpm);
    let cur_countin = 0;
    if (cur.length > 1) {
        cur_countin = cur[0];
        //cur_countin *= msec_scale;
        for (let i = 1; i < cur.length; i += 2) {
            //must have pairs
            if (cur.length > (i + 1)) {
                let cur_time = cur[i];
                let cur_val = cur[i + 1];
                //since Pd starts recording at beginning of countin
                let corrected_time = cur_time - cur_countin;
                let cur_nevt = { time: corrected_time, val: cur_val };
                ret.push(cur_nevt);
            }
            else {
                //is invalid, send back empty list
                ret = [];
            }
            ;
        }
        ;
    }
    ;
    return ret;
}
exports.parse_performance = parse_performance;
function debug_evts(evt1, evt2) {
    console.log("example events");
    let att_count = 0;
    for (let i = 0; i < evt1.length; i++) {
        let nevt = evt1[i].nevt;
        if (nevt.val > 0) {
            att_count += 1;
        }
        console.log(nevt);
    }
    ;
    console.log(`attack count: ${att_count}`);
    console.log("perf events");
    for (let i = 0; i < evt2.length; i++) {
        console.log(evt2[i]);
    }
    ;
    console.log(`attack count: ${evt2.length}`);
}
exports.debug_evts = debug_evts;
function convert_example_timings(x, bpm) {
    let scaling = bpm_to_msec(bpm);
    let ret = [];
    for (let i = 0; i < x.length; i++) {
        let cnevt = x[i].nevt;
        let cref = x[i].ref;
        let ctime = x[i].nevt.time;
        let cval = x[i].nevt.val;
        let new_evt = { time: ctime * scaling, val: cval };
        let new_ex = { nevt: new_evt, ref: cref };
        ret.push(new_ex);
    }
    ;
    return ret;
}
exports.convert_example_timings = convert_example_timings;
function duration_to_beat(x, bpm, ex_meter) {
    let scaler = bpm_to_msec(bpm);
    //let ptime: number = x/scaler;
    let ptime = x;
    //want measure, beat, number (except no number)
    //should be able to get from time
    //only dealing with x/4 meters so don't care about denominator
    let cur_meas = Math.floor(ptime / ex_meter[0]);
    let cur_beat = Math.floor(ptime % ex_meter[0]);
    // use because have no idea what number it would be
    let cur_number = -1;
    let cur_mistake = [cur_meas, cur_beat, cur_number];
    return cur_mistake;
}
exports.duration_to_beat = duration_to_beat;
function default_good_beats(ex, defval) {
    let num_bars = ex.example.length;
    let ex_meter = ex.meter;
    let good_beats = Array.from({ length: num_bars }, () => Array.from({ length: ex_meter[0] }, () => defval));
    return good_beats;
}
exports.default_good_beats = default_good_beats;
function cat_performance(ex, ex_evts, perf_list, countin, bpm) {
    let perf_evts = parse_performance(perf_list, countin, bpm);
    //let ex_evts: RK.ExampleEvent[] = convert_example_timings(_ex_evts, bpm);
    let ex_num = ex_evts.length;
    let perf_num = perf_evts.length;
    //debug_evts(ex_evts, perf_evts);
    let ex_cat = ex.cats;
    let ex_meter = ex.meter;
    let num_bars = ex.example.length;
    //can do this because only dealing with 4/4
    let num_beats = num_bars * ex_meter[0];
    let good_beats = Array.from({ length: num_bars }, () => Array.from({ length: ex_meter[0] }, () => true));
    //collecting perf_evts into bins corresponding to ex_evts
    let ex_ref = Array.from({ length: ex_num }, () => []);
    //and keeping track of perf_evts accounted for
    let perf_ref_found = Array.from({ length: perf_num }, () => false);
    //[idx, time]
    let last_match = [-1, 0];
    for (let i = 0; i < ex_num; i++) {
        let cnevt = ex_evts[i].nevt;
        let ctime = cnevt.time;
        let cval = cnevt.val;
        let cur_start = 0;
        // only keep track of matches where there's actually example notes
        if (cval > 0) {
            if ((last_match[1] + exports.dur_lim_match) < ctime) {
                //if last_matching is out of current matching bounds, can skip ahead
                // can do because sequential
                cur_start = last_match[0] + 1;
            }
            ;
            for (let j = 0; j < perf_num; j++) {
                let pnevt = perf_evts[j];
                let ptime = pnevt.time;
                let pval = pnevt.val;
                if (pval > exports.perf_vthresh) {
                    let cur_diff = Math.abs(ptime - ctime);
                    if (cur_diff < exports.dur_lim_match) {
                        ex_ref[i].push([j, pnevt]);
                        last_match = [j, ptime];
                        perf_ref_found[j] = true;
                    }
                    ;
                    /*
                    else if(ctime < (ptime - dur_lim_match)) {
                        //since both are sequential, there will be no further matches
                        break;
                    };
                    */
                }
                ;
            }
            ;
        }
        ;
    }
    ;
    //console.log(ex_ref);
    //and keeping track of perf_evts actually matched
    let perf_ref_match = Array.from({ length: perf_num }, () => false);
    //keep track of where mistakes are made
    let mistake_ref = [];
    // and keeping track of successfully matched notes when there should be
    let ex_good = Array.from({ length: ex_num }, () => true);
    // notes that are matched but too early to be correct, keep track of how early
    // also keep track of what rhyhtms they refer to ([diff, ref])
    let early_diffs = [];
    let late_diffs = [];
    let perfect_diffs = [];
    for (let i = 0; i < ex_num; i++) {
        let cnevt = ex_evts[i].nevt;
        let ctime = cnevt.time;
        let cval = cnevt.val;
        let cref = ex_evts[i].ref;
        let cbin = ex_ref[i];
        let cbinlen = cbin.length;
        //console.log(i);
        if (cbinlen > 0 && cval > 0) {
            let ccomp;
            let idx_comp = [];
            let can_comp = false;
            //console.log("cbinlen", cbinlen);
            if (cbinlen == 1) {
                // easy case
                let pevt = cbin[0][1];
                let pidx = cbin[0][0];
                ccomp = pevt;
                idx_comp.push(pidx);
                can_comp = true;
            }
            else {
                let pfirstevt = cbin[0][1];
                let plastevt = cbin[cbinlen - 1][1];
                let pfirsttime = pfirstevt.time;
                let plasttime = plastevt.time;
                //can do this because perfs were added sequentially
                let timediff = plasttime - pfirsttime;
                //console.log(pfirsttime, plasttime);
                if (Math.abs(timediff) < exports.dur_lim_same) {
                    // close enough in time that can count as same
                    // pick furthest to compare if comp_closest false
                    let cur_idx = 0;
                    let m_dist = -Infinity;
                    if (exports.comp_closest == true) {
                        m_dist = Infinity;
                    }
                    ;
                    for (let k = 0; k < cbin.length; k++) {
                        let pevt = cbin[k][1];
                        let pidx = cbin[k][0];
                        //console.log(k);
                        let ptime = pevt.time;
                        //console.log(ptime);
                        let cur_dist = Math.abs(ptime - ctime);
                        if (((cur_dist < m_dist) && exports.comp_closest == true) ||
                            ((cur_dist > m_dist) && exports.comp_closest == false)) {
                            m_dist = cur_dist;
                            cur_idx = k;
                        }
                        ;
                        idx_comp.push(pidx);
                    }
                    ;
                    ccomp = cbin[cur_idx][1];
                    can_comp = true;
                }
                else {
                    // not close enough in time so that can't count as same
                    ex_good[i] = false;
                }
                ;
            }
            ;
            if (can_comp == true) {
                let ptime = ccomp.time;
                let cur_diff = ptime - ctime;
                //console.log("cur_diff", ptime, ctime, cur_diff);
                if (Math.abs(cur_diff) < exports.dur_lim_correct) {
                    ex_good[i] = true;
                    for (let k = 0; k < idx_comp.length; k++) {
                        let ok_idx = idx_comp[k];
                        perf_ref_match[ok_idx] = true;
                    }
                    ;
                    // keep track of timing anyways (even though correct)
                    if (cur_diff > 0) {
                        late_diffs.push([cur_diff, cref]);
                    }
                    else if (cur_diff < 0) {
                        early_diffs.push([cur_diff, cref]);
                    }
                    else {
                        perfect_diffs.push([cur_diff, cref]);
                    }
                    ;
                }
                else {
                    ex_good[i] = false;
                    if (cur_diff > 0) {
                        // performance note is late
                        late_diffs.push([cur_diff, cref]);
                    }
                    else {
                        // performance note is early
                        early_diffs.push([cur_diff, cref]);
                    }
                    ;
                }
                ;
            }
            ;
        }
        else {
            if (cval > 0) {
                // there should be matches but there are not
                // aka an example note and no performance notes
                ex_good[i] = false;
            }
            else {
                // there aren't matches and there shouldn't be
                // aka a rest and no performance notes
                ex_good[i] = true;
            }
            ;
        }
        ;
    }
    ;
    // this is the case where maybe there's a long duration
    // but extraneous notes (which would be mistakes)
    //need to take into account unmatched performance notes
    let last_extime = ex_evts[ex_num - 1].nevt.time;
    // time bounds to consider performance notes
    let end_bounds = last_extime + exports.dur_lim_match;
    let beg_bounds = -exports.dur_lim_match;
    //console.log("stage 2");
    for (let i = 0; i < perf_num; i++) {
        let cur_matched = perf_ref_match[i];
        //console.log(i);
        if (cur_matched == false) {
            let cur_perf = perf_evts[i];
            //console.log("curperf", cur_perf);
            let ptime = cur_perf.time;
            let pval = cur_perf.val;
            if ((ptime > beg_bounds) && (ptime < end_bounds) && (pval > exports.perf_vthresh)) {
                //console.log(i, cur_perf);
                let cref = duration_to_beat(ptime, bpm, ex_meter);
                good_beats[cref[0]][cref[1]] = false;
            }
            else {
                perf_ref_match[i] = true;
            }
            ;
        }
        ;
    }
    ;
    //console.log(perf_ref_match);
    //console.log("stage 3");
    //checking example notes
    let all_good = true;
    for (let i = 0; i < ex_num; i++) {
        let cur = ex_good[i];
        if (cur == false) {
            let cref = ex_evts[i].ref;
            good_beats[cref[0]][cref[1]] = false;
        }
        ;
    }
    ;
    //console.log(ex_good);
    //console.log(good_beats);
    //gather mistakes
    for (let i = 0; i < good_beats.length; i++) {
        let cur_bar = good_beats[i];
        for (let j = 0; j < cur_bar.length; j++) {
            let cur = cur_bar[j];
            if (cur == false) {
                //console.log(i,j);
                mistake_ref.push([i, j, -1]);
            }
            ;
        }
        ;
    }
    ;
    //and keeping track of mistakes by type of rhythm
    let miss_rtype = [];
    //console.log("stage 4");
    for (let i = 0; i < mistake_ref.length; i++) {
        let cur_miss = mistake_ref[i];
        let cur_meas = cur_miss[0];
        let cur_beat = cur_miss[1];
        //console.log(i, cur_meas, cur_beat);
        let mistake_type = ex_cat[cur_meas][cur_beat];
        miss_rtype.push([cur_miss, mistake_type]);
    }
    ;
    //console.log(miss_rtype);
    //console.log("stage 5");
    let latediff_cat = late_diffs.map((x, y) => {
        return [x[0], ex_cat[x[1][0]][x[1][1]]];
    });
    let perfectdiff_cat = perfect_diffs.map((x, y) => {
        return [x[0], ex_cat[x[1][0]][x[1][1]]];
    });
    let earlydiff_cat = early_diffs.map((x, y) => {
        return [x[0], ex_cat[x[1][0]][x[1][1]]];
    });
    let timings = { early: earlydiff_cat, perfect: perfectdiff_cat, late: latediff_cat };
    let ret = { timing: timings, mistakes: miss_rtype, good_beats: good_beats };
    return ret;
}
exports.cat_performance = cat_performance;
// should return dict of arrays
//return a dict of every wanted duration with 3 patterns each
// the first being highest priority and the last being least priority
function rhythm_priority(cur_lkm, want_types) {
    let ret = {};
    let cur_durs = Object.keys(want_types);
    for (let i = 0; i < cur_durs.length; i++) {
        let cur_dur = cur_durs[i];
        ret[cur_dur] = [];
        if (want_types[cur_dur] == true) {
            let to_pick = exports.num_patts_to_pick;
            let dur_hard;
            let dur_patt;
            let dur_lkmdur;
            let dur_max;
            if (cur_dur == RK.DurKind.qtr) {
                dur_hard = RK.qtr_hard;
                dur_patt = RK.QtrPatt;
                dur_lkmdur = cur_lkm.durs.qtr;
                dur_max = RK.qtr_hardmax;
            }
            else if (cur_dur == RK.DurKind.ei) {
                dur_hard = RK.ei_hard;
                dur_patt = RK.EiPatt;
                dur_lkmdur = cur_lkm.durs.ei;
                dur_max = RK.ei_hardmax;
            }
            else if (cur_dur == RK.DurKind.eit) {
                dur_hard = RK.eit_hard;
                dur_patt = RK.EiTPatt;
                dur_lkmdur = cur_lkm.durs.eit;
                dur_max = RK.eit_hardmax;
            }
            else {
                dur_hard = RK.steen_hard;
                dur_patt = RK.STeenPatt;
                dur_lkmdur = cur_lkm.durs.steen;
                dur_max = RK.steen_hardmax;
            }
            ;
            //patt: Record<EiPType, number>;
            //export const steen_hardrev: Record<STeenPType, number> =
            //export const num_dur_bthresh: number = 1; //number of rhythm patts to pick for below thresh dur dur
            // TO DO: need to make sure key exists
            let dur_thlvl = dur_hard[dur_lkmdur.lvl_bthresh];
            let dur_maxlvl = dur_hard[dur_lkmdur.lvl_bmax];
            //prioritize on dured durations patt below thresh
            if (dur_lkmdur.all_thresh == false) {
                for (let i = 0; i < dur_thlvl.length; i++) {
                    if (to_pick <= 0) {
                        break;
                    }
                    else {
                        let cur_patt = dur_thlvl[i];
                        let cur_progress = dur_lkmdur.patt[cur_patt];
                        if (cur_progress < RK.skill_thresh) {
                            let cur_rstr = dur_patt[cur_patt];
                            ret[cur_dur].push([cur_patt, cur_rstr]);
                            to_pick -= 1;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
            // now prioritize on dured durations patt below max
            if (dur_lkmdur.all_max == false) {
                for (let i = 0; i < dur_maxlvl.length; i++) {
                    if (to_pick <= 0) {
                        break;
                    }
                    else {
                        let cur_patt = dur_maxlvl[i];
                        let cur_progress = dur_lkmdur.patt[cur_patt];
                        if (cur_progress < RK.skill_max) {
                            let cur_rstr = dur_patt[cur_patt];
                            ret[cur_dur].push([cur_patt, cur_rstr]);
                            to_pick -= 1;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
            //if a patt from dur dur not picked yet, go ahead and pick anything from it
            // plus the extra nums specifiedfrom dur
            //pick from levels that have actually met threshold if not maxed out
            // else pick from any level
            let dur_maxtopick = Math.max(0, dur_lkmdur.lvl_bthresh - 1);
            if (dur_lkmdur.all_max == true) {
                dur_maxtopick = dur_lkmdur.lvl_max;
            }
            ;
            while (to_pick > 0) {
                let cur_lvl = Math.floor(Math.random() * 1.1 * (dur_maxtopick));
                let dur_curlvl = dur_hard[cur_lvl];
                let cur_pidx = Math.floor(Math.random() * dur_curlvl.length);
                let cur_patt = dur_curlvl[cur_pidx];
                let cur_rstr = dur_patt[cur_patt];
                ret[cur_dur].push([cur_patt, cur_rstr]);
                to_pick -= 1;
            }
            ;
        }
        ;
    }
    ;
    return ret;
}
exports.rhythm_priority = rhythm_priority;
// develop priority list of individual rhythms to include
function wt_2idx(w) {
    let w0 = w[0];
    let w1 = w0 + w[1];
    let r = Math.random() * 100;
    let ret = 0;
    if (r < w0) {
        ret = 0;
    }
    else {
        ret = 1;
    }
    ;
    return ret;
}
exports.wt_2idx = wt_2idx;
function wt_3idx(w) {
    let w0 = w[0];
    let w1 = w0 + w[1];
    let w2 = w1 + w[2];
    let r = Math.random() * 100;
    let ret = 0;
    if (r < w0) {
        ret = 0;
    }
    else if (r >= w0 && r < w1) {
        ret = 1;
    }
    else {
        ret = 2;
    }
    ;
    return ret;
}
exports.wt_3idx = wt_3idx;
function get_rnotes(x) {
    let ret;
    if (x == "qtr") {
        ret = RK.qtr_rnotes;
    }
    else if (x == "ei") {
        ret = RK.ei_rnotes;
    }
    else if (x == "eit") {
        ret = RK.eit_rnotes;
    }
    else {
        ret = RK.steen_rnotes;
    }
    ;
    return ret;
}
exports.get_rnotes = get_rnotes;
function generate_exercise(cur_lk, cur_meter, cur_focus, want_types) {
    let cur_mlvl;
    // beats per bar
    let bpb = cur_meter[0];
    let barlen_sel;
    if (bpb == 2) {
        barlen_sel = exports.m24_exlen;
        cur_mlvl = cur_lk.m24.val;
    }
    else {
        barlen_sel = exports.m34_exlen;
        cur_mlvl = cur_lk.m34.val;
    }
    //get number of bars 
    let num_bars = barlen_sel[0][1];
    for (let i = 0; i < barlen_sel.length; i++) {
        if (cur_mlvl >= barlen_sel[i][0]) {
            num_bars = barlen_sel[i][1];
        }
        ;
    }
    ;
    //console.log(cur_meter, cur_focus, want_types, barlen_sel, cur_mlvl, num_bars);
    let cur_ex = Array.from({ length: num_bars }, () => Array.from({ length: bpb }, () => []));
    let cur_cats = [];
    // choose preferred beat placement of focus duration in bar from highest to lowest pref
    let focus_beat;
    let focus_beatfn;
    let focus_beatwt;
    let focus_rnotes;
    if (bpb == 2) {
        let cur_idx = Math.floor(Math.random() * exports.m24_beatorder.length);
        focus_beat = exports.m24_beatorder[cur_idx];
        focus_beatfn = wt_2idx;
        focus_beatwt = exports.focus_beatwt24;
    }
    else {
        let cur_idx = Math.floor(Math.random() * exports.m34_beatorder.length);
        focus_beat = exports.m34_beatorder[cur_idx];
        focus_beatfn = wt_3idx;
        focus_beatwt = exports.focus_beatwt34;
    }
    ;
    //console.log(focus_beat, focus_beatfn, focus_beatwt);
    let focus_picked = false;
    // durs to pick from that aren't focus dur
    let durs_topick = [];
    let num_durs = durs_topick.length;
    let pick_patts;
    if (bpb == 2) {
        pick_patts = rhythm_priority(cur_lk.m24, want_types);
    }
    else {
        pick_patts = rhythm_priority(cur_lk.m34, want_types);
    }
    ;
    let ckeys = Object.keys(pick_patts);
    for (let i = 0; i < ckeys.length; i++) {
        let ckey = ckeys[i];
        if (ckey != cur_focus && pick_patts[ckey].length > 0) {
            durs_topick.push(ckey);
        }
        ;
    }
    ;
    if (durs_topick.length <= 0) {
        durs_topick.push(cur_focus);
    }
    ;
    //console.log(durs_topick); 
    //console.log(durs_topick, pick_patts);
    //export const qtr_rnotes: Record<QtrPatt, RhythmNote[]> = pattkeys_to_rnoterec<QtrPatt>(Object.values(QtrPatt));
    // values do not have leading p
    // cur_patt has leading p, rstr doesn't
    //ret[cur_dur].push([cur_patt, cur_rstr]);
    for (let i = 0; i < num_bars; i++) {
        let cur_bar = cur_ex[i];
        let beat_idx = focus_beatfn(focus_beatwt);
        //beat to potentially put focus dur
        let cur_fbeat = focus_beat[beat_idx];
        let cur_catbar = [];
        for (let j = 0; j < bpb; j++) {
            let cur_beat = cur_bar[j];
            let beat_picked = false;
            let cur_pattwt;
            let cur_durtype;
            if (j == cur_fbeat) {
                let cur_r = Math.floor(Math.random() * 100);
                if (cur_r < exports.focus_pickchance) {
                    cur_pattwt = exports.focus_pattwt;
                    cur_durtype = cur_focus;
                    beat_picked = true;
                    focus_picked = true;
                }
                ;
            }
            ;
            if (beat_picked == false) {
                let cur_idx = Math.floor(Math.random() * num_durs);
                cur_durtype = durs_topick[cur_idx];
                cur_pattwt = exports.unfocus_pattwt;
            }
            ;
            let patt_idx = wt_3idx(cur_pattwt);
            let cur_pair = pick_patts[cur_durtype][patt_idx];
            let cur_patt;
            let cur_rstr = "";
            if (cur_pair != null) {
                if (cur_pair.length != undefined) {
                    if (cur_pair.length >= 2) {
                        cur_patt = cur_pair[0];
                        cur_rstr = cur_pair[1];
                        //console.log("gotit");
                    }
                    ;
                }
                ;
            }
            ;
            if (cur_rstr.length == 0) {
                if (cur_durtype == "qtr") {
                    cur_rstr = "1";
                }
                else if (cur_durtype == "ei") {
                    cur_rstr = "11";
                }
                else if (cur_durtype == "eit") {
                    cur_rstr = "111";
                }
                else {
                    cur_rstr = "1111";
                }
                ;
            }
            ;
            //console.log(cur_rstr);
            //console.log(i,j, cur_pair);
            let cur_rnotes = get_rnotes(cur_durtype);
            //console.log(cur_rnotes);
            let cur_notes = cur_rnotes[cur_rstr];
            cur_ex[i][j] = cur_notes;
            let ccat = categorize_beat(cur_notes);
            cur_catbar.push(ccat);
        }
        ;
        cur_cats.push(cur_catbar);
    }
    ;
    if (focus_picked == false) {
        let cur_bar = Math.floor(Math.random() * num_bars);
        let beat_idx = focus_beatfn(focus_beatwt);
        //beat to potentially put focus dur
        let cur_fbeat = focus_beat[beat_idx];
        let i = cur_bar;
        let j = cur_fbeat;
        let cur_pattwt = exports.focus_pattwt;
        let cur_durtype = cur_focus;
        let patt_idx = wt_3idx(cur_pattwt);
        let cur_pair = pick_patts[cur_durtype][patt_idx];
        let cur_patt = cur_pair[0];
        let cur_rstr = cur_pair[1];
        let cur_rnotes = get_rnotes(cur_durtype);
        let cur_notes = cur_rnotes[cur_rstr];
        cur_ex[i][j] = cur_notes;
        let ccat = categorize_beat(cur_notes);
        cur_cats[i][j] = ccat;
    }
    ;
    let ret = { meter: cur_meter, example: cur_ex,
        cats: cur_cats, qdur: RK._qdur };
    //debug_ex(ret);
    return ret;
}
exports.generate_exercise = generate_exercise;
