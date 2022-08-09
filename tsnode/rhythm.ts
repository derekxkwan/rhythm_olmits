import * as RK from './rhythm_knowledge';

export const dur_grain: number = 100000; //grain of duration
export const dur_lim_correct: number = 0.225; //limit to consider note correct
export const dur_lim_same: number = 0.5; //limit to consider note the same
export const dur_lim_match: number = 0.225; //limit to consider note a match
export const perf_vthresh: number = 5.; //threshold val must pass in performance to consider an actual attack
export const comp_closest: boolean = true; //compare if multiple attack with closest, else compare with maximum

export const num_patts_to_pick:number = 3;

// skill lower bound, barlen
export const m24_exlen: number[][] = [[0,2], [25,3], [50,4]];
export const m34_exlen: number[][] = [[0,1], [25,2], [50,3]];
export const m24_beatorder: number[][] = [[0, 1], [1, 0]];
export const m34_beatorder: number[][] = [[0,1,2],[0,2,1], [1,0,2],[1,2,0], [2,0,1],[2,1,0]];

//weight to pick focus patterns

export const focus_pattwt: [number, number, number] = [50,30,20];
export const unfocus_pattwt: [number, number, number] = [40,35,25];

//weight to pick focus beat
export const focus_beatwt24: number[] = [80,20];
export const focus_beatwt34: number[] = [70,25,5];
//chance at which to pick focus dur
export const focus_pickchance: number = 75;

export function debug_ex(x: RK.RhythmEx): void {
    for(let i = 0; i < x.example.length; i++) {
        console.log(`-----${i}-----`);
        for(let j=0; j < x.example[i].length; j++) {
            let cur_beat = x.example[i][j];
            let curcat = categorize_beat(cur_beat);
            console.log(cur_beat);
            console.log(curcat);
        };
    };
}


export function categorize_beat(x: RK.RhythmBeat) : RK.RhythmCat {
    let min_mult: number = Infinity;
    let max_div: number = -Infinity;

    let retstr: string = "";
    for(let i: number = 0; i < x.length; i++) {
        let cnote: RK.RhythmNote = x[i];
        let cmult: number = cnote.mult;
        let cdiv: number = cnote.subdiv;
        let cdot: boolean = cnote.dot;
        if (cdot == true) {
            cdiv *= 2;
        };

        min_mult = Math.min(min_mult, cmult);
        max_div = Math.max(max_div, cdiv);
    };


    for(let i: number = 0; i < x.length; i++) {
        let cnote: RK.RhythmNote = x[i];
        let cmult: number = cnote.mult;
        let cdiv: number = cnote.subdiv;
        let cdot: boolean = cnote.dot;
        let cval: number = cnote.val;

        let cstr: string = "";

        let cur_len: number = 1; 
            
        if (cdiv != max_div) {
            let cur_prop: number = Math.round(max_div/cdiv);
            cur_len *= cur_prop;
        };
        
        if (cdot == true) {
            cur_len = Math.round((cur_len * 3)/2);
        };

        if (cmult != min_mult) {
            let cur_prop: number = Math.round(cmult/min_mult);
            cur_len *= cur_prop;
        };

        for(let j: number =0; j < cur_len; j++){
            let toadd: string = "0";
            if(j==0) {
                if (cval > 0) {
                    toadd = "1";
                };
            };
            cstr = cstr.concat(toadd);
        };

        retstr = retstr.concat(cstr);
    };

    let rkind = RK.get_rhy_kind(retstr);
    let ret: RK.RhythmCat = {rstr: RK.pattstr_to_key(retstr), mult: min_mult, dur: rkind.dur, kind: rkind.kind};
    return ret;
}

export function get_qtized(sdiv: number, ctup: number, cmult: number, cdot: boolean, qdur: number): number {
        let ret: number = (qdur * cmult)/ sdiv;

        if (cdot == true) {
            ret = Math.round(ret * 3 / 2);
        };
        if (ctup == 3) {
            ret = Math.round(ret * 2 / 3);
        }
        else if (ctup == 5) {
            ret = Math.round(ret * 4 / 5);
        };


        return ret;
}


export function tup_to_rnote(x: number[], qdur: number) : RK.RhythmNote {
    let cval: number = x[0];
    let cdiv: number = x[1];
    let ctup: number = x[2];
    let cmult: number = 1;
    let cdot: boolean = false;
    if (x.length > 3) {
        cmult = x[3];
    };

    if (x.length > 4) {
        if (x[4] > 0) {
            cdot = true;
        };
    };

    let qval: number = get_qtized(cdiv, ctup, cmult, cdot, qdur);
    let res: RK.RhythmNote = {val: cval, subdiv: cdiv, tuplet: ctup, mult: cmult, dot: cdot, qval: qval};
    return res;
}

export function rnotes_to_rbar(x: RK.RhythmNote[], qdur: number) : RK.RhythmBar {
    let accum: number = 0;
    let ret: RK.RhythmBar = [];

    let cur_ngroup: RK.RhythmBeat = [];

    for (let i: number = 0; i < x.length; i++) {
        let cnote: RK.RhythmNote = x[i];
        let qval: number = cnote.qval;
        accum = accum + qval;
        
        cur_ngroup.push(cnote);
        if (accum % qdur == 0 && accum > 0) {
            //fill out durs before pushing to ret list
            ret.push(cur_ngroup);
            cur_ngroup = [];
            accum = 0;
        };
    };

    return ret;

}

export function tuparray_to_rbar(x: number[][]) : RK.RhythmBar {
    let rnotes: RK.RhythmNote[] = x.map(y => tup_to_rnote(y, RK._qdur));
    let rbar: RK.RhythmBar = rnotes_to_rbar(rnotes, RK._qdur);
    return rbar;
}

export function tuparray2d_to_rbars( x: number[][][]) : RK.RhythmBar[] {
    let ret: RK.RhythmBar[] = x.map(y => tuparray_to_rbar(y));
    return ret;
}

export function make_rex(tups: number[][][], meter: RK.RhythmMeter) : RK.RhythmEx {
    let cur_ex: RK.RhythmBar[] = tuparray2d_to_rbars(tups);
    let cb: RK.RhythmCat[][] = [];

    for(let i = 0; i < cur_ex.length; i++){
        let cur_bar: RK.RhythmBar = cur_ex[i];
        let cur_cats: RK.RhythmCat[] = [];
        for(let j=0; j < cur_bar.length; j++) {
            let cur_beat: RK.RhythmBeat = cur_bar[j];
            let cur_cat: RK.RhythmCat = categorize_beat(cur_beat);
            cur_cats.push(cur_cat);
        }
        cb.push(cur_cats);
    };

    let ret: RK.RhythmEx = {meter: meter, example: cur_ex, cats: cb, qdur: RK._qdur};
    return ret;
}

export function get_durgrain(qval: number, qdur: number): number {
    let ret: number = Math.floor((qval * dur_grain)/qdur)/dur_grain;
    return ret;
}

//basically, make sure things add up to a whole number (triplets: 0.33 0.33 0.34)
export function dur_remaining(durs: number[]): number {
    let cur_sum: number = durs.reduce((x: number, y: number) => x+y);
    let modded: number = Math.floor(cur_sum * dur_grain) % dur_grain;
    let rem: number = (dur_grain - modded)/dur_grain;
    return rem;
}

export function rbar_to_list(cur: RK.RhythmBar, cm: RK.RhythmMeter, idx: number, _cur_taccum: number, qdur: number) : any {
    //output lists of form [timing, val, timing, val, timing, val,...]
    let accum: number = 0;
    let timeval_list: number[] = [];
    let evt_list: RK.ExampleEvent[] = [];
    let cur_durs: number[] = [];
    let cur_vals: number[] = [];
    let cur_refs: RK.NoteRef[] = [];
    let cur_evts: RK.ExampleEvent[] = [];
    let reflist: RK.NoteRef[] = [];  
    
    let cur_taccum: number = _cur_taccum;


    for (let i: number =0; i < cur.length; i++) {
        let cur_beat: RK.RhythmBeat = cur[i];
        for(let j: number = 0; j < cur_beat.length; j++) {
            let cur_note: RK.RhythmNote = cur_beat[j];
            let cur_ref: RK.NoteRef = [idx, i, j];
            let cval = cur_note.val;
            let qval = cur_note.qval;
            let cdur: number;
            if ( (cur_durs.length < 1) || j < (cur_beat.length - 1)) {
                cdur = get_durgrain(qval, qdur);
            }
            else {
                cdur = dur_remaining(cur_durs);
            };

            //timing measures moment of attack (not after)
            let cur_timing: number = cur_taccum;
            let cur_nevt: RK.NoteEvent = {time: cur_timing, val: cval};
            let cur_exevt: RK.ExampleEvent = {nevt: cur_nevt, ref: cur_ref};

            //now add cdur to get beginning of next attack
            cur_taccum = cur_taccum + cdur;

            //push to current lists
            cur_vals.push(cval);
            cur_durs.push(cdur);
            cur_evts.push(cur_exevt);
        };
        for(let j: number = 0; j < cur_durs.length; j++) {
            timeval_list.push(cur_durs[j]);
            timeval_list.push(cur_vals[j]);
            evt_list.push(cur_evts[j]);
        };
        cur_vals = [];
        cur_durs = [];
        cur_evts = [];

    };

    let ret = {timeval: timeval_list, evts: evt_list, accum: cur_taccum};
    return ret;
}

export function rex_to_list(cur:RK.RhythmEx): any {
    let cur_bars: RK.RhythmBar[] = cur.example;
    let cur_meter: RK.RhythmMeter = cur.meter;
    let timeval_list: number[] = [];
    let evt_list: RK.ExampleEvent[] = [];
    let qdur: number = cur.qdur;

    let cur_taccum: number = 0;

    for (let i: number = 0; i < cur_bars.length; i++) {
        let cur = rbar_to_list(cur_bars[i], cur_meter, i, cur_taccum, qdur);
        timeval_list = timeval_list.concat(cur.timeval);
        evt_list = evt_list.concat(cur.evts);
        cur_taccum = cur.accum;


    };


    let ret = {timeval: timeval_list, evts: evt_list}; 
    return ret;
}

export function bpm_to_msec(bpm: number) : number {
    //http://moz.ac.at/sem/lehre/lib/cdp/cdpr5/html/timechart.htm
    return (60000./bpm);
}

export function parse_performance(cur: number[], countin: number, bpm: number): RK.NoteEvent[] {
    //format from Pd is beats of lead in then timing,val pairs
    
    let ret: RK.NoteEvent[] = [];

    let msec_scale: number = bpm_to_msec(bpm);
    let cur_countin: number = 0;
    if(cur.length > 1) {
        cur_countin = cur[0];
        //cur_countin *= msec_scale;
        for(let i: number = 1; i < cur.length; i += 2) {

            //must have pairs
            if(cur.length > (i+1)) {
                let cur_time: number = cur[i];
                let cur_val: number = cur[i+1];
                //since Pd starts recording at beginning of countin
                let corrected_time: number = cur_time - cur_countin; 
                let cur_nevt: RK.NoteEvent = {time: corrected_time, val: cur_val};
                ret.push(cur_nevt);
            }
            else {
            //is invalid, send back empty list
                ret = [];
            };
        };
    };

    return ret;
}

export function debug_evts(evt1: RK.ExampleEvent[], evt2: RK.NoteEvent[]) {
    console.log("example events");
    let att_count: number = 0;
    for(let i =0; i < evt1.length; i++) {
        let nevt: RK.NoteEvent = evt1[i].nevt;
        if(nevt.val > 0) {
            att_count += 1;
        }
        console.log(nevt);
    };
    console.log(`attack count: ${att_count}`);
    console.log("perf events");
    for(let i =0; i < evt2.length; i++) {
        console.log(evt2[i]);
    };
    console.log(`attack count: ${evt2.length}`);
}

export function convert_example_timings(x: RK.ExampleEvent[], bpm: number): RK.ExampleEvent[] {
    let scaling: number = bpm_to_msec(bpm);
    let ret: RK.ExampleEvent[] = [];
    for(let i: number = 0; i < x.length; i++) {
        let cnevt: RK.NoteEvent = x[i].nevt;
        let cref: RK.NoteRef = x[i].ref;
        let ctime: number = x[i].nevt.time;
        let cval: number = x[i].nevt.val;
        let new_evt: RK.NoteEvent = {time: ctime * scaling, val: cval};
        let new_ex: RK.ExampleEvent = {nevt: new_evt, ref: cref};
        ret.push(new_ex);
    };
    return ret;
}

export function duration_to_beat(x: number, bpm: number, ex_meter: RK.RhythmMeter) : RK.NoteRef {
    let scaler: number = bpm_to_msec(bpm);
    //let ptime: number = x/scaler;
    let ptime: number = x;
    //want measure, beat, number (except no number)
    //should be able to get from time
    //only dealing with x/4 meters so don't care about denominator
    let cur_meas: number = Math.floor(ptime/ex_meter[0]);
    let cur_beat: number = Math.floor(ptime % ex_meter[0]);
    // use because have no idea what number it would be
    let cur_number: number = -1;
    let cur_mistake: RK.NoteRef = [cur_meas, cur_beat, cur_number];
    return cur_mistake;

}

export function default_good_beats(ex: RK.RhythmEx, defval: boolean) : boolean[][] {

    let num_bars: number = ex.example.length;
    let ex_meter: RK.RhythmMeter = ex.meter;

    let good_beats: boolean[][] = Array.from({length: num_bars}, () => Array.from({length: ex_meter[0]}, () => defval));

    return good_beats;
}

export function cat_performance(ex: RK.RhythmEx, ex_evts: RK.ExampleEvent[], perf_list: number[], countin: number, bpm: number) : any {
    let perf_evts: RK.NoteEvent[] = parse_performance(perf_list, countin, bpm);
    //let ex_evts: RK.ExampleEvent[] = convert_example_timings(_ex_evts, bpm);
    let ex_num: number = ex_evts.length;
    let perf_num: number = perf_evts.length;
   
    //debug_evts(ex_evts, perf_evts);
    let ex_cat: RK.RhythmCat[][] = ex.cats;
    let ex_meter: RK.RhythmMeter = ex.meter;
    let num_bars: number = ex.example.length;
    
    //can do this because only dealing with 4/4
    let num_beats = num_bars * ex_meter[0];

    let good_beats: boolean[][] = Array.from({length: num_bars}, () => Array.from({length: ex_meter[0]}, () => true));
    //collecting perf_evts into bins corresponding to ex_evts
    let ex_ref: [number, RK.NoteEvent][][] = Array.from({length: ex_num}, () => []);
    //and keeping track of perf_evts accounted for
    let perf_ref_found: boolean[] = Array.from({length: perf_num}, () => false);

    //[idx, time]
    let last_match: number[] = [-1,0];
    for(let i: number = 0; i < ex_num; i++) {
        let cnevt: RK.NoteEvent = ex_evts[i].nevt;
        let ctime: number = cnevt.time;
        let cval: number = cnevt.val;
        let cur_start: number = 0;
        // only keep track of matches where there's actually example notes
        if (cval > 0) {
            if((last_match[1] + dur_lim_match) < ctime) {
                //if last_matching is out of current matching bounds, can skip ahead
                // can do because sequential
                cur_start = last_match[0] + 1;
            };
            for(let j: number = 0; j < perf_num; j++) {
               let pnevt: RK.NoteEvent = perf_evts[j];
               let ptime: number = pnevt.time;
               let pval: number = pnevt.val;
               if( pval> perf_vthresh) {
                    let cur_diff: number = Math.abs(ptime - ctime);
                    if(cur_diff < dur_lim_match) {
                        ex_ref[i].push([j, pnevt]);
                        last_match = [j, ptime];
                        perf_ref_found[j] = true;
                    };
                    /*
                    else if(ctime < (ptime - dur_lim_match)) {
                        //since both are sequential, there will be no further matches
                        break;
                    };
                    */
               };
            };
        };
    };

        //console.log(ex_ref);
    //and keeping track of perf_evts actually matched
    let perf_ref_match: boolean[] = Array.from({length: perf_num}, () => false);
    //keep track of where mistakes are made
    let mistake_ref: RK.NoteRef[] = [];
    // and keeping track of successfully matched notes when there should be
    let ex_good: boolean[] = Array.from({length: ex_num}, () => true);
    // notes that are matched but too early to be correct, keep track of how early
    // also keep track of what rhyhtms they refer to ([diff, ref])
    let early_diffs: [number, RK.NoteRef][] = [];
    let late_diffs: [number, RK.NoteRef][] = [];
    let perfect_diffs: [number, RK.NoteRef][] = [];

    for(let i: number = 0; i < ex_num; i++) {
        let cnevt: RK.NoteEvent = ex_evts[i].nevt;
        let ctime: number = cnevt.time;
        let cval: number = cnevt.val;
        let cref: RK.NoteRef = ex_evts[i].ref;
        let cbin: [number, RK.NoteEvent][] = ex_ref[i];
        let cbinlen = cbin.length;
        //console.log(i);
        if(cbinlen > 0 && cval > 0) {
            let ccomp: RK.NoteEvent;
            let idx_comp: number[] = [];
            let can_comp: boolean = false;
            //console.log("cbinlen", cbinlen);
            if(cbinlen == 1) {
                // easy case
                let pevt: RK.NoteEvent = cbin[0][1];
                let pidx: number = cbin[0][0];
                ccomp = pevt;
                idx_comp.push(pidx);
                can_comp = true;
            }
            else {
                let pfirstevt: RK.NoteEvent = cbin[0][1];
                let plastevt: RK.NoteEvent = cbin[cbinlen-1][1];
                let pfirsttime: number = pfirstevt.time;
                let plasttime: number = plastevt.time;
                //can do this because perfs were added sequentially
                let timediff = plasttime-pfirsttime;
                //console.log(pfirsttime, plasttime);
                if(Math.abs(timediff) < dur_lim_same) {
                    // close enough in time that can count as same
                    // pick furthest to compare if comp_closest false
                    let cur_idx: number = 0;
                    let m_dist: number = -Infinity;
                    if(comp_closest == true) {
                        m_dist = Infinity;
                    };
                    for(let k: number = 0; k < cbin.length; k++){
                        let pevt: RK.NoteEvent = cbin[k][1];
                        let pidx: number = cbin[k][0];
                        //console.log(k);
                        let ptime: number = pevt.time;
                        //console.log(ptime);
                        let cur_dist: number = Math.abs(ptime - ctime);
                        if(((cur_dist < m_dist) && comp_closest == true) ||
                           ((cur_dist > m_dist) && comp_closest == false)){
                            m_dist = cur_dist;
                            cur_idx = k;
                        };
                        idx_comp.push(pidx);
                    };
                    ccomp = cbin[cur_idx][1];
                    can_comp = true;
                }
                else {
                    // not close enough in time so that can't count as same
                    ex_good[i] = false;
                };
            };
            if(can_comp == true) {
                let ptime: number = ccomp.time;
                let cur_diff: number = ptime - ctime;
                //console.log("cur_diff", ptime, ctime, cur_diff);
                if(Math.abs(cur_diff) < dur_lim_correct) {
                    ex_good[i] = true;
                    for(let k: number = 0; k < idx_comp.length; k++) {
                        let ok_idx: number = idx_comp[k];
                        perf_ref_match[ok_idx] = true;
                    };
                    // keep track of timing anyways (even though correct)
                    if(cur_diff > 0) {

                        late_diffs.push([cur_diff, cref]);
                    }
                    else if (cur_diff < 0){

                        early_diffs.push([cur_diff, cref]);
                    }
                    else {
                        perfect_diffs.push([cur_diff, cref]);
                    };
                }
                else {
                    ex_good[i] = false;
                    if(cur_diff > 0) {
                        // performance note is late
                        late_diffs.push([cur_diff, cref]);
                    }
                    else {
                        // performance note is early
                        early_diffs.push([cur_diff, cref]);
                    };
                };
            };

        }
        else {
            if(cval > 0) {
                // there should be matches but there are not
                // aka an example note and no performance notes
                ex_good[i] = false;
            }
            else {
                // there aren't matches and there shouldn't be
                // aka a rest and no performance notes
                ex_good[i] = true;
            };
        };
        
    };
   
    // this is the case where maybe there's a long duration
    // but extraneous notes (which would be mistakes)

    //need to take into account unmatched performance notes
    let last_extime: number = ex_evts[ex_num-1].nevt.time;
    // time bounds to consider performance notes
    let end_bounds: number = last_extime + dur_lim_match;
    let beg_bounds: number = -dur_lim_match;
    //console.log("stage 2");
    for(let i: number = 0; i < perf_num; i++) {
        let cur_matched: boolean = perf_ref_match[i];
        //console.log(i);
        if(cur_matched == false) {
            let cur_perf: RK.NoteEvent = perf_evts[i];
            //console.log("curperf", cur_perf);
            let ptime: number = cur_perf.time;
            let pval: number = cur_perf.val;
            if((ptime > beg_bounds) && (ptime < end_bounds) && (pval > perf_vthresh)) {
                //console.log(i, cur_perf);
                let cref = duration_to_beat(ptime, bpm, ex_meter);
                good_beats[cref[0]][cref[1]] = false;
            }
            else {
                perf_ref_match[i] = true;
            };
        };
    };
    //console.log(perf_ref_match);
    //console.log("stage 3");
    //checking example notes
    let all_good: boolean = true;
    for(let i: number = 0; i < ex_num; i++) {
        let cur: boolean = ex_good[i];
        if (cur == false) {
            let cref: RK.NoteRef = ex_evts[i].ref;
            good_beats[cref[0]][cref[1]] = false;
        };
    };
    //console.log(ex_good);
    //console.log(good_beats);
    //gather mistakes
    for(let i: number = 0; i < good_beats.length; i++) {
        let cur_bar = good_beats[i];
        for(let j: number = 0; j < cur_bar.length; j++) {
            let cur = cur_bar[j];
            if(cur == false) {
                //console.log(i,j);
                mistake_ref.push([i,j,-1]);
            };
        };
    };
    //and keeping track of mistakes by type of rhythm
    let miss_rtype: [RK.NoteRef, RK.RhythmCat][] = [];
    //console.log("stage 4");
    for(let i: number = 0; i < mistake_ref.length; i++) {
        let cur_miss: RK.NoteRef = mistake_ref[i];
        let cur_meas: number = cur_miss[0];
        let cur_beat: number = cur_miss[1];
        //console.log(i, cur_meas, cur_beat);
        let mistake_type: RK.RhythmCat = ex_cat[cur_meas][cur_beat];
        miss_rtype.push([cur_miss, mistake_type]);
    };

        //console.log(miss_rtype);
    //console.log("stage 5");
    let latediff_cat: [number, RK.RhythmCat][] = late_diffs.map((x: [number, RK.NoteRef], y: number) => {
        return [x[0], ex_cat[x[1][0]][x[1][1]]];});
    let perfectdiff_cat: [number, RK.RhythmCat][] = perfect_diffs.map((x: [number, RK.NoteRef], y: number) => {
        return [x[0], ex_cat[x[1][0]][x[1][1]]];});
    let earlydiff_cat: [number, RK.RhythmCat][] = early_diffs.map((x: [number, RK.NoteRef], y: number) => {
        return [x[0], ex_cat[x[1][0]][x[1][1]]];});
    let timings: any = {early: earlydiff_cat, perfect: perfectdiff_cat, late: latediff_cat};

    let ret: any = {timing: timings, mistakes: miss_rtype, good_beats: good_beats};
    return ret;
}

// should return dict of arrays

//return a dict of every wanted duration with 3 patterns each
// the first being highest priority and the last being least priority
export function rhythm_priority(cur_lkm: RK.MeterKnow, want_types: Record<RK.DurType, boolean>) : any{
    let ret = {};
    let cur_durs = Object.keys(want_types);
    for (let i = 0; i < cur_durs.length; i++) {
        let cur_dur = cur_durs[i];
        ret[cur_dur] = [];
        if(want_types[cur_dur] == true) {
            let to_pick: number = num_patts_to_pick;
            let dur_hard;
            let dur_patt;
            let dur_lkmdur;
            let dur_max: number;
            if(cur_dur == RK.DurKind.qtr) {
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
            };


            //patt: Record<EiPType, number>;
            //export const steen_hardrev: Record<STeenPType, number> =
            //export const num_dur_bthresh: number = 1; //number of rhythm patts to pick for below thresh dur dur

            // TO DO: need to make sure key exists
            let dur_thlvl = dur_hard[dur_lkmdur.lvl_bthresh];
            let dur_maxlvl = dur_hard[dur_lkmdur.lvl_bmax];
            //prioritize on dured durations patt below thresh
           
            if (dur_lkmdur.all_thresh == false) {
                for(let i = 0; i < dur_thlvl.length; i++) {
                    if(to_pick <= 0) {
                        break;
                    }
                    else {
                       let cur_patt = dur_thlvl[i];
                       let cur_progress: number = dur_lkmdur.patt[cur_patt];
                       if (cur_progress < RK.skill_thresh) {
                           let cur_rstr = dur_patt[cur_patt];
                           ret[cur_dur].push([cur_patt, cur_rstr]);
                           to_pick -= 1;
                       };
                    };
                };
            };
            // now prioritize on dured durations patt below max
            if (dur_lkmdur.all_max == false) {
                for(let i = 0; i < dur_maxlvl.length; i++) {
                    if(to_pick <= 0) {
                        break;
                    }
                    else {
                       let cur_patt = dur_maxlvl[i];
                       let cur_progress: number = dur_lkmdur.patt[cur_patt];
                       if (cur_progress < RK.skill_max) {
                           let cur_rstr = dur_patt[cur_patt];
                           ret[cur_dur].push([cur_patt, cur_rstr]);
                           to_pick -= 1;
                       };
                    };
                };
            };

            //if a patt from dur dur not picked yet, go ahead and pick anything from it
            // plus the extra nums specifiedfrom dur
           
            
            //pick from levels that have actually met threshold if not maxed out
            // else pick from any level

            let dur_maxtopick = Math.max(0, dur_lkmdur.lvl_bthresh - 1);
            if (dur_lkmdur.all_max == true) {
                dur_maxtopick = dur_lkmdur.lvl_max;
            };

  
            while(to_pick > 0) {
                let cur_lvl: number = Math.floor(Math.random() * 1.1 * (dur_maxtopick));
                let dur_curlvl = dur_hard[cur_lvl];
                let cur_pidx: number = Math.floor(Math.random() * dur_curlvl.length);
                let cur_patt = dur_curlvl[cur_pidx];
                let cur_rstr = dur_patt[cur_patt];
                ret[cur_dur].push([cur_patt, cur_rstr]);
                to_pick -= 1;
            };


        };
    };
        
    return ret;
}
// develop priority list of individual rhythms to include


export function wt_2idx(w: [number, number]) : number {
    let w0 = w[0];
    let w1 = w0 + w[1];
    let r = Math.random() * 100;
    let ret = 0;
    if(r < w0) {
        ret = 0;
    }
    else {
        ret = 1;
    };

    return ret;
}

export function wt_3idx(w: [number, number, number]) : number {
    let w0 = w[0];
    let w1 = w0 + w[1];
    let w2 = w1 + w[2];
    let r = Math.random() * 100;
    let ret = 0;
    
    if(r < w0) {
        ret = 0;
    }
    else if(r >= w0 && r < w1) {
        ret = 1;
    }
    else {
        ret = 2;
    };

    return ret;
}

export function get_rnotes(x: RK.DurType) : any {
    let ret;
    if(x == "qtr") {
        ret =  RK.qtr_rnotes;
    }
    else if (x == "ei") {
        ret = RK.ei_rnotes;
    }
    else if (x == "eit") {
        ret = RK.eit_rnotes;
    }
    else {
        ret = RK.steen_rnotes;
    };

    return ret;
}

export function generate_exercise(cur_lk: RK.LearnerKnow, cur_meter: RK.RhythmMeter, cur_focus: RK.DurType, want_types: Record<RK.DurType, boolean>) : RK.RhythmEx {

    let cur_mlvl: number;
    // beats per bar
    let bpb: number = cur_meter[0];
    let barlen_sel;
    if(bpb == 2) {
        barlen_sel = m24_exlen;
        cur_mlvl = cur_lk.m24.val;
    }
    else {
        barlen_sel = m34_exlen;
        cur_mlvl = cur_lk.m34.val;
    }

    //get number of bars 
    let num_bars: number = barlen_sel[0][1];
    for(let i: number = 0; i < barlen_sel.length; i++) {
        if(cur_mlvl >= barlen_sel[i][0]) {
            num_bars = barlen_sel[i][1];
        };
    };

    //console.log(cur_meter, cur_focus, want_types, barlen_sel, cur_mlvl, num_bars);
    let cur_ex: RK.RhythmBar[] = Array.from({length: num_bars},
                                            () => Array.from({length: bpb},
                                                             () => [] as RK.RhythmBeat));
    let cur_cats: RK.RhythmCat[][] = [];

    // choose preferred beat placement of focus duration in bar from highest to lowest pref
    let focus_beat: number[];
    let focus_beatfn;
    let focus_beatwt: number[];
    let focus_rnotes;
    if (bpb == 2) {
        let cur_idx: number = Math.floor(Math.random() * m24_beatorder.length);
        focus_beat = m24_beatorder[cur_idx];
        focus_beatfn = wt_2idx;
        focus_beatwt = focus_beatwt24;
    }
    else {
        let cur_idx: number = Math.floor(Math.random() * m34_beatorder.length);
        focus_beat = m34_beatorder[cur_idx];
        focus_beatfn = wt_3idx;
        focus_beatwt = focus_beatwt34;
    };

    //console.log(focus_beat, focus_beatfn, focus_beatwt);
    let focus_picked: boolean = false;
    // durs to pick from that aren't focus dur
    let durs_topick: RK.DurType[] = [];

    let num_durs = durs_topick.length;

    let pick_patts;
    if (bpb == 2) {
        pick_patts = rhythm_priority(cur_lk.m24, want_types);
    }
    else {
        pick_patts = rhythm_priority(cur_lk.m34, want_types);
    };
    
    let ckeys = Object.keys(pick_patts);
    for(let i: number = 0; i < ckeys.length; i++) {
        let ckey = ckeys[i];
        if(ckey != cur_focus && pick_patts[ckey].length > 0){
            durs_topick.push(ckey as RK.DurType);
        };
    };

    if(durs_topick.length <= 0) {
        durs_topick.push(cur_focus);
    };

    //console.log(durs_topick); 
    //console.log(durs_topick, pick_patts);
    //export const qtr_rnotes: Record<QtrPatt, RhythmNote[]> = pattkeys_to_rnoterec<QtrPatt>(Object.values(QtrPatt));
    // values do not have leading p
    // cur_patt has leading p, rstr doesn't
    //ret[cur_dur].push([cur_patt, cur_rstr]);
    for(let i: number = 0; i < num_bars; i++){
        let cur_bar = cur_ex[i];
        let beat_idx: number = focus_beatfn(focus_beatwt);
        //beat to potentially put focus dur
        let cur_fbeat: number = focus_beat[beat_idx];
        let cur_catbar: RK.RhythmCat[] = [];
        for(let j: number = 0; j < bpb; j++) {
            let cur_beat = cur_bar[j];
            let beat_picked: boolean = false;
            let cur_pattwt: [number, number, number];
            let cur_durtype: RK.DurType;
            if(j == cur_fbeat) {
                let cur_r: number = Math.floor(Math.random() * 100);
                if (cur_r < focus_pickchance) {
                    cur_pattwt = focus_pattwt;
                    cur_durtype = cur_focus;
                    beat_picked = true;
                    focus_picked = true;
                };
            };

            if(beat_picked == false) {
                let cur_idx = Math.floor(Math.random() * num_durs);
                cur_durtype = durs_topick[cur_idx];
                cur_pattwt = unfocus_pattwt;
            };
            let patt_idx: number = wt_3idx(cur_pattwt);
            let cur_pair = pick_patts[cur_durtype][patt_idx];
            let cur_patt;
            let cur_rstr = "";
            if(cur_pair != null) {
                if (cur_pair.length != undefined) {
                    if (cur_pair.length >= 2) {
                    cur_patt = cur_pair[0];
                    cur_rstr = cur_pair[1]; 
                    //console.log("gotit");
                    };
                };

            };

            if (cur_rstr.length == 0) {
               if(cur_durtype == "qtr") {
                    cur_rstr = "1";
                }
                else if (cur_durtype == "ei") {
                    cur_rstr = "11";
                }
                else if (cur_durtype == "eit") {
                    cur_rstr = "111";
                }
                else {
                    cur_rstr =  "1111";
                };


            };

            //console.log(cur_rstr);
            //console.log(i,j, cur_pair);
            let cur_rnotes = get_rnotes(cur_durtype);
            //console.log(cur_rnotes);
            let cur_notes = cur_rnotes[cur_rstr];
            cur_ex[i][j] = cur_notes;
            let ccat = categorize_beat(cur_notes);
            cur_catbar.push(ccat);
        };

        cur_cats.push(cur_catbar);

    };

    if(focus_picked == false) {
        let cur_bar = Math.floor(Math.random() * num_bars);
        let beat_idx: number = focus_beatfn(focus_beatwt);
        //beat to potentially put focus dur
        let cur_fbeat: number = focus_beat[beat_idx];
        let i: number = cur_bar;
        let j: number = cur_fbeat;
        let cur_pattwt: [number, number, number] = focus_pattwt;
        let cur_durtype: RK.DurType = cur_focus;
        let patt_idx: number = wt_3idx(cur_pattwt);
        let cur_pair = pick_patts[cur_durtype][patt_idx];
        let cur_patt = cur_pair[0];
        let cur_rstr = cur_pair[1];
        let cur_rnotes = get_rnotes(cur_durtype);
        let cur_notes = cur_rnotes[cur_rstr];
        cur_ex[i][j] = cur_notes;
        let ccat = categorize_beat(cur_notes);
        cur_cats[i][j] = ccat;

    };

    let ret: RK.RhythmEx = {meter: cur_meter, example: cur_ex as RK.RhythmBar[],
        cats: cur_cats as RK.RhythmCat[][], qdur: RK._qdur};
    //debug_ex(ret);
    return ret;
}

