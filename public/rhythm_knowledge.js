"use strict";
// mirrored in tspublic/misc.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ei_p4kwt = exports.ei_p4knum = exports.ei_k2p = exports.ei_p2k = exports.qtr_hard = exports.qtr_hardmax = exports.qtr_hardrev = exports.qtr_kwt = exports.qtr_knum = exports.qtr_pwt = exports.qtr_pnum = exports.qtr_p4kwt = exports.qtr_p4knum = exports.qtr_k2p = exports.qtr_p2k = exports.get_score_weight = exports.dur_rhywt = exports.num_rhy = exports.steen_rnotes = exports.eit_rnotes = exports.ei_rnotes = exports.qtr_rnotes = exports.pattkeys_to_rnoterec = exports.patt_to_rnote = exports.STeenKind = exports.STeenPatt = exports.EiTKind = exports.EiTPatt = exports.EiKind = exports.EiPatt = exports.QtrKind = exports.QtrPatt = exports.durs = exports.meter_wt = exports.num_meters = exports.MeterKind = exports.DurKind = exports.initval = exports.qscale = exports.pskill_rng = exports.skill_thresh = exports.lowestlvl = exports.skill_min = exports.skill_max = exports.pskill_min = exports.pskill_max = exports.num_to_master = exports.unfocuswt = exports.focuswt = exports._qdur = void 0;
exports.change_rstr = exports.LearnerKnow = exports.dur_prettylong = exports.rstr_eq = exports.dur_hard = exports.dur_hardrev = exports.get_durhardmax = exports.get_rhy_kind = exports.pattstr_to_key = exports.revrec_wt = exports.revrec_num = exports.revrec = exports.TimingKnow = exports.MeterKnow = exports.DursKnow = exports.STeenKnow = exports.EiTKnow = exports.EiKnow = exports.QtrKnow = exports.steen_hard = exports.steen_hardmax = exports.steen_hardrev = exports.overall_pwt = exports.overall_pnum = exports.steen_kwt = exports.steen_knum = exports.steen_pwt = exports.steen_pnum = exports.steen_p4kwt = exports.steen_p4knum = exports.steen_k2p = exports.steen_p2k = exports.eit_hard = exports.eit_hardmax = exports.eit_hardrev = exports.eit_kwt = exports.eit_knum = exports.eit_pwt = exports.eit_pnum = exports.eit_p4kwt = exports.eit_p4knum = exports.eit_k2p = exports.eit_p2k = exports.ei_hard = exports.ei_hardmax = exports.ei_hardrev = exports.ei_kwt = exports.ei_knum = exports.ei_pwt = exports.ei_pnum = void 0;
exports._qdur = 60;
exports.focuswt = { pos: 1., neg: -1. };
exports.unfocuswt = { pos: 0.5, neg: -0.5 };
exports.num_to_master = 15;
exports.pskill_max = 100; // maximum of dur skill meter
exports.pskill_min = 0; // maximum of dur skill meter
exports.skill_max = 100;
exports.skill_min = 0;
exports.lowestlvl = 0;
exports.skill_thresh = 80;
exports.pskill_rng = exports.pskill_max - exports.pskill_min;
exports.qscale = exports.pskill_rng / exports.num_to_master;
exports.initval = 0;
var DurKind;
(function (DurKind) {
    DurKind["qtr"] = "qtr";
    DurKind["ei"] = "ei";
    DurKind["eit"] = "eit";
    DurKind["steen"] = "steen";
})(DurKind = exports.DurKind || (exports.DurKind = {}));
var MeterKind;
(function (MeterKind) {
    MeterKind["m24"] = "m24";
    MeterKind["m34"] = "m34";
})(MeterKind = exports.MeterKind || (exports.MeterKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
exports.num_meters = Object.keys(MeterKind).length;
exports.meter_wt = 1. / exports.num_meters;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
exports.durs = Object.keys(DurKind);
var QtrPatt;
(function (QtrPatt) {
    QtrPatt["p1"] = "1";
    QtrPatt["p0"] = "0";
})(QtrPatt = exports.QtrPatt || (exports.QtrPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
var QtrKind;
(function (QtrKind) {
    QtrKind["o0"] = "o0"; //not on an offbeat
})(QtrKind = exports.QtrKind || (exports.QtrKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
var EiPatt;
(function (EiPatt) {
    EiPatt["p11"] = "11";
    EiPatt["p01"] = "01";
})(EiPatt = exports.EiPatt || (exports.EiPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
// defining rhythms based on where non-rest stasrts
var EiKind;
(function (EiKind) {
    EiKind["o0"] = "o0";
    EiKind["o1"] = "o1"; //on the first offbeat
})(EiKind = exports.EiKind || (exports.EiKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
var EiTPatt;
(function (EiTPatt) {
    EiTPatt["p110"] = "110";
    EiTPatt["p111"] = "111";
    EiTPatt["p010"] = "010";
    EiTPatt["p011"] = "011";
    EiTPatt["p001"] = "001";
    EiTPatt["p101"] = "101";
})(EiTPatt = exports.EiTPatt || (exports.EiTPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
var EiTKind;
(function (EiTKind) {
    EiTKind["o0"] = "o0";
    EiTKind["o1"] = "o1";
    EiTKind["o2"] = "o2"; //on second offbeat
})(EiTKind = exports.EiTKind || (exports.EiTKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
var STeenPatt;
(function (STeenPatt) {
    STeenPatt["p0100"] = "0100";
    STeenPatt["p0001"] = "0001";
    STeenPatt["p1100"] = "1100";
    STeenPatt["p1001"] = "1001";
    STeenPatt["p0110"] = "0110";
    STeenPatt["p0101"] = "0101";
    STeenPatt["p0011"] = "0011";
    STeenPatt["p1110"] = "1110";
    STeenPatt["p1101"] = "1101";
    STeenPatt["p0111"] = "0111";
    STeenPatt["p1011"] = "1011";
    STeenPatt["p1111"] = "1111";
})(STeenPatt = exports.STeenPatt || (exports.STeenPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
var STeenKind;
(function (STeenKind) {
    STeenKind["o0"] = "o0";
    STeenKind["o1"] = "o1";
    STeenKind["o2"] = "o2";
    STeenKind["o3"] = "o3"; //third offbeat
})(STeenKind = exports.STeenKind || (exports.STeenKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
function patt_to_rnote(x) {
    let cur_subdiv = x.length;
    let cur_tup = 1.;
    if (x.length == 3) {
        cur_tup = 3;
        cur_subdiv = 2;
    }
    ;
    let cur_mult = 1;
    let cur_dot = false;
    let cur_qval = Math.round(exports._qdur / cur_subdiv);
    if (cur_tup != 1) {
        cur_qval = Math.round(exports._qdur / cur_tup);
    }
    ;
    let ret = [];
    for (let i = 0; i < x.length; i++) {
        let cur = x[i];
        let cur_val = 0;
        if (cur != "0") {
            cur_val = 1;
        }
        ;
        let cnote = { val: cur_val, subdiv: cur_subdiv, tuplet: cur_tup,
            mult: cur_mult, dot: cur_dot, qval: cur_qval };
        ret.push(cnote);
    }
    ;
    return ret;
}
exports.patt_to_rnote = patt_to_rnote;
function pattkeys_to_rnoterec(k) {
    let ret = {};
    for (let i = 0; i < k.length; i++) {
        let ckey = k[i];
        let cnotes = patt_to_rnote(ckey);
        ret[ckey] = cnotes;
    }
    ;
    return ret;
}
exports.pattkeys_to_rnoterec = pattkeys_to_rnoterec;
exports.qtr_rnotes = pattkeys_to_rnoterec(Object.values(QtrPatt));
exports.ei_rnotes = pattkeys_to_rnoterec(Object.values(EiPatt));
exports.eit_rnotes = pattkeys_to_rnoterec(Object.values(EiTPatt));
exports.steen_rnotes = pattkeys_to_rnoterec(Object.values(STeenPatt));
exports.num_rhy = {
    qtr: Object.keys(QtrPatt).length,
    ei: Object.keys(EiPatt).length,
    eit: Object.keys(EiTPatt).length,
    steen: Object.keys(STeenPatt).length
};
//how to weight rhythms to overall duration skill level
exports.dur_rhywt = {
    qtr: 1. / exports.num_rhy.qtr,
    ei: 1. / exports.num_rhy.ei,
    eit: 1. / exports.num_rhy.eit,
    steen: 1. / exports.num_rhy.steen
};
function get_score_weight(pos, dur, focus) {
    // gives inverse of number of rhythms
    // ie proportion of rhythm exercises to total dur exercises
    let cur_durwt = exports.dur_rhywt[dur];
    // if answering 1 question for each rhythm, will max out skill meter
    let cur_prop = cur_durwt * exports.pskill_max;
    // but really want to answer x questions to max out skill meter
    // so divide by number of question to master particular rhythm skill
    cur_prop = cur_prop / exports.num_to_master;
    // now want to weight based on if focus of lesson or not
    let ans_wt = 1.;
    if (pos == true) {
        if (focus == true) {
            ans_wt = exports.focuswt.pos;
        }
        else {
            ans_wt = exports.unfocuswt.pos;
        }
        ;
    }
    else {
        if (focus == true) {
            ans_wt = exports.focuswt.neg;
        }
        else {
            ans_wt = exports.unfocuswt.neg;
        }
        ;
    }
    ;
    cur_prop = cur_prop * ans_wt;
    return cur_prop;
}
exports.get_score_weight = get_score_weight;
exports.qtr_p2k = {
    p1: "o0",
    p0: "o0"
};
exports.qtr_k2p = revrec(exports.qtr_p2k);
exports.qtr_p4knum = revrec_num(exports.qtr_k2p);
exports.qtr_p4kwt = revrec_wt(exports.qtr_k2p);
exports.qtr_pnum = Object.keys(exports.qtr_p2k).length;
exports.qtr_pwt = 1. / exports.qtr_pnum;
exports.qtr_knum = Object.keys(QtrKind).length;
exports.qtr_kwt = 1. / exports.qtr_knum;
exports.qtr_hardrev = {
    p1: 0,
    p0: 0
};
exports.qtr_hardmax = get_durhardmax(exports.qtr_hardrev);
exports.qtr_hard = revrec(exports.qtr_hardrev);
// categorizing specific rhythms by type
exports.ei_p2k = {
    p11: "o0",
    p01: "o1"
};
exports.ei_k2p = revrec(exports.ei_p2k);
exports.ei_p4knum = revrec_num(exports.ei_k2p);
exports.ei_p4kwt = revrec_wt(exports.ei_k2p);
exports.ei_pnum = Object.keys(exports.ei_p2k).length;
exports.ei_pwt = 1. / exports.ei_pnum;
exports.ei_knum = Object.keys(EiKind).length;
exports.ei_kwt = 1. / exports.ei_knum;
// difficulties with bigger number = harder
// these are relative to the duration
exports.ei_hardrev = {
    p11: 0,
    p01: 1
};
exports.ei_hardmax = get_durhardmax(exports.ei_hardrev);
exports.ei_hard = revrec(exports.ei_hardrev);
exports.eit_p2k = {
    p110: "o0",
    p111: "o0",
    p010: "o1",
    p011: "o1",
    p001: "o2",
    p101: "o0"
};
exports.eit_k2p = revrec(exports.eit_p2k);
exports.eit_p4knum = revrec_num(exports.eit_k2p);
exports.eit_p4kwt = revrec_wt(exports.eit_k2p);
exports.eit_pnum = Object.keys(exports.eit_p2k).length;
exports.eit_pwt = 1. / exports.eit_pnum;
exports.eit_knum = Object.keys(EiTKind).length;
exports.eit_kwt = 1. / exports.eit_knum;
exports.eit_hardrev = {
    p110: 2,
    p111: 0,
    p010: 4,
    p011: 3,
    p001: 3,
    p101: 1,
};
exports.eit_hardmax = get_durhardmax(exports.eit_hardrev);
exports.eit_hard = revrec(exports.eit_hardrev);
exports.steen_p2k = {
    p0100: "o1",
    p0001: "o3",
    p1100: "o0",
    p1001: "o0",
    p0110: "o1",
    p0101: "o1",
    p0011: "o2",
    p1110: "o0",
    p1101: "o0",
    p0111: "o1",
    p1011: "o0",
    p1111: "o0",
};
exports.steen_k2p = revrec(exports.steen_p2k);
exports.steen_p4knum = revrec_num(exports.steen_k2p);
exports.steen_p4kwt = revrec_wt(exports.steen_k2p);
exports.steen_pnum = Object.keys(exports.steen_p2k).length;
exports.steen_pwt = 1. / exports.steen_pnum;
exports.steen_knum = Object.keys(STeenKind).length;
exports.steen_kwt = 1. / exports.steen_knum;
exports.overall_pnum = exports.qtr_pnum + exports.ei_pnum + exports.eit_pnum + exports.steen_pnum;
exports.overall_pwt = 1. / exports.overall_pnum;
exports.steen_hardrev = {
    p0100: 5,
    p0001: 4,
    p1100: 3,
    p1001: 4,
    p0110: 4,
    p0101: 5,
    p0011: 3,
    p1110: 2,
    p1101: 3,
    p0111: 5,
    p1011: 1,
    p1111: 0,
};
exports.steen_hardmax = get_durhardmax(exports.steen_hardrev);
exports.steen_hard = revrec(exports.steen_hardrev);
class QtrKnow {
    constructor() {
        let x = Object.keys(QtrPatt).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let x1 = x;
        let y = Object.keys(QtrKind).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let y1 = y;
        this.patt = x1;
        this.kind = y1;
        this.lvl_bthresh = exports.lowestlvl;
        this.lvl_bmax = exports.lowestlvl;
        this.lvl_max = exports.qtr_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.val = exports.initval;
    }
}
exports.QtrKnow = QtrKnow;
;
class EiKnow {
    constructor() {
        let x = Object.keys(EiPatt).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let x1 = x;
        let y = Object.keys(EiKind).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let y1 = y;
        this.patt = x1;
        this.lvl_bthresh = exports.lowestlvl;
        this.lvl_bmax = exports.lowestlvl;
        this.lvl_max = exports.ei_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.kind = y1;
        this.val = exports.initval;
    }
}
exports.EiKnow = EiKnow;
;
class EiTKnow {
    constructor() {
        let x = Object.keys(EiTPatt).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let x1 = x;
        let y = Object.keys(EiTKind).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let y1 = y;
        this.patt = x1;
        this.lvl_bthresh = exports.lowestlvl;
        this.lvl_bmax = exports.lowestlvl;
        this.lvl_max = exports.eit_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.kind = y1;
        this.val = exports.initval;
    }
}
exports.EiTKnow = EiTKnow;
;
class STeenKnow {
    constructor() {
        let x = Object.keys(STeenPatt).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let x1 = x;
        let y = Object.keys(STeenKind).reduce((prev, cur) => { prev[cur] = exports.initval; return prev; }, {});
        let y1 = y;
        this.patt = x1;
        this.lvl_bthresh = exports.lowestlvl;
        this.lvl_bmax = exports.lowestlvl;
        this.lvl_max = exports.steen_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.kind = y1;
        this.val = exports.initval;
    }
}
exports.STeenKnow = STeenKnow;
;
class DursKnow {
    constructor() {
        this.qtr = new QtrKnow();
        this.ei = new EiKnow();
        this.eit = new EiTKnow();
        this.steen = new STeenKnow();
    }
}
exports.DursKnow = DursKnow;
class MeterKnow {
    constructor() {
        this.val = exports.initval;
        this.durs = new DursKnow();
    }
}
exports.MeterKnow = MeterKnow;
class TimingKnow {
    constructor() {
        this.val = 0.;
        this.durs = new DursKnow();
    }
}
exports.TimingKnow = TimingKnow;
function revrec(x) {
    let arr = Object.keys(x);
    let ret = {};
    for (let i = 0; i < arr.length; i++) {
        let a = arr[i];
        let b = x[a];
        if (!(b in ret)) {
            ret[b] = [];
        }
        ;
        ret[b].push(a);
    }
    ;
    return ret;
}
exports.revrec = revrec;
function revrec_num(x) {
    let ret = {};
    let arr = Object.keys(x);
    for (let i = 0; i < arr.length; i++) {
        let k = arr[i];
        ret[k] = x[k].length;
    }
    ;
    return ret;
}
exports.revrec_num = revrec_num;
function revrec_wt(x) {
    let ret = {};
    let arr = Object.keys(x);
    for (let i = 0; i < arr.length; i++) {
        let k = arr[i];
        ret[k] = 1. / x[k].length;
    }
    ;
    return ret;
}
exports.revrec_wt = revrec_wt;
function pattstr_to_key(x) {
    return "p".concat(x);
}
exports.pattstr_to_key = pattstr_to_key;
function get_rhy_kind(x) {
    let cur_dur;
    let rstr_len = x.length;
    let aug_str = "p".concat(x);
    let cur_kind = "";
    if (rstr_len == 2) {
        cur_dur = DurKind.ei;
        cur_kind = exports.ei_p2k[aug_str];
    }
    else if (rstr_len == 3) {
        cur_dur = DurKind.eit;
        cur_kind = exports.eit_p2k[aug_str];
    }
    else if (rstr_len == 4) {
        cur_dur = DurKind.steen;
        cur_kind = exports.steen_p2k[aug_str];
    }
    else {
        cur_dur = DurKind.qtr;
        cur_kind = exports.qtr_p2k[aug_str];
    }
    ;
    let ret = { dur: cur_dur, kind: cur_kind };
    return ret;
}
exports.get_rhy_kind = get_rhy_kind;
function get_durhardmax(x) {
    let ckeys = Object.keys(x);
    let cmax = -Infinity;
    for (let i = 0; i < ckeys.length; i++) {
        let ckey = ckeys[i];
        let cval = x[ckey];
        cmax = Math.max(cmax, cval);
    }
    ;
    return cmax;
}
exports.get_durhardmax = get_durhardmax;
exports.dur_hardrev = {
    qtr: 1,
    ei: 2,
    eit: 3,
    steen: 4
};
exports.dur_hard = revrec(exports.dur_hardrev);
exports.rstr_eq = {
    "p1010": { rstr: "11", mult: 2, dur: DurKind.ei, kind: "o0" },
    "p0010": { rstr: "01", mult: 2, dur: DurKind.ei, kind: "o1" },
    "p10": { rstr: "1", mult: 2, dur: DurKind.qtr, kind: "" },
    "p1000": { rstr: "1", mult: 4, dur: DurKind.qtr, kind: "" },
};
exports.dur_prettylong = {
    qtr: "Quarter Notes",
    ei: "Eighth Notes",
    eit: "Eighth-Note Triplets",
    steen: "Sixteenth Notes"
};
class LearnerKnow {
    constructor() {
        this.val = exports.initval;
        this.overall = new DursKnow();
        this.m24 = new MeterKnow();
        this.m34 = new MeterKnow();
        this.needs_update = false;
    }
    load_from_ilk(x) {
        this.val = x.val;
        this.overall = x.overall;
        this.m24 = x.m24;
        this.m34 = x.m34;
        this.needs_update = true;
        this.update_totals();
    }
    randomize(lo, hi) {
        //start with meter dur patts
        //use meter dur patts for meter dur kind and meter dur overall (val)
        //compute meter overall val from meter dur patts
        //use meter dur patts for overall dur patts
        //use meter dur kinds for overall dur kinds
        //use meter dur patts for overall dur val
        //use meter overall val for val
        let cm = [this.m24, this.m34];
        let cnum = cm.length;
        let cwt = 1. / cnum;
        let crange = Math.abs(hi - lo);
        //reset val overall
        this.val = 0.;
        for (let i = 0; i < cnum; i++) {
            //iterating over METER
            let cur_mk = cm[i];
            let cur_mkdur = cur_mk.durs;
            let avail_durs = Object.keys(cur_mkdur);
            let dnum = avail_durs.length;
            //reset old meter overall val
            cur_mk.val = 0.;
            for (let j = 0; j < dnum; j++) {
                //iterating over DURS
                let cdurkey = avail_durs[j];
                let cdur = cur_mkdur[cdurkey];
                let odur = this.overall[cdurkey]; //overall dur
                let cdur_p = cdur.patt;
                let cdur_k = cdur.kind;
                let odur_p = odur.patt;
                let odur_k = odur.kind;
                let cur_patts = Object.keys(cdur_p);
                let cur_kinds = Object.keys(cdur_k);
                let num_patts = cur_patts.length;
                let num_kinds = cur_kinds.length;
                //idea: reset old vals (for both meter and overall) then accumulate
                // first reset
                cdur.val = 0;
                odur.val = 0;
                for (let k = 0; k < num_kinds; k++) {
                    let kind_key = cur_kinds[k];
                    cdur_k[kind_key] = 0.;
                    odur_k[kind_key] = 0.;
                }
                ;
                for (let k = 0; k < num_patts; k++) {
                    // add meter patt to meter kind
                    let patt_key = cur_patts[k];
                    let patt_val = cdur_p[patt_key];
                    cdur_p[patt_key] = Math.min(Math.floor((Math.random() * crange * 1.01) + lo), 100);
                }
                ;
            }
            ;
        }
        ;
        this.update_totals();
    }
    update_totals() {
        //start with meter dur patts
        //use meter dur patts for meter dur kind and meter dur overall (val)
        //compute meter overall val from meter dur patts
        //use meter dur patts for overall dur patts
        //use meter dur kinds for overall dur kinds
        //use meter dur patts for overall dur val
        //use meter overall val for val
        let cm = [this.m24, this.m34];
        let cnum = cm.length;
        let cwt = 1. / cnum;
        //reset val overall
        this.val = 0.;
        for (let i = 0; i < cnum; i++) {
            //iterating over METER
            let cur_mk = cm[i];
            let cur_mkdur = cur_mk.durs;
            let avail_durs = Object.keys(cur_mkdur);
            let dnum = avail_durs.length;
            //reset old meter overall val
            cur_mk.val = 0.;
            for (let j = 0; j < dnum; j++) {
                //iterating over DURS
                let cdurkey = avail_durs[j];
                let cdur = cur_mkdur[cdurkey];
                let odur = this.overall[cdurkey]; //overall dur
                let cdur_p = cdur.patt;
                let cdur_k = cdur.kind;
                let odur_p = odur.patt;
                let odur_k = odur.kind;
                let cur_patts = Object.keys(cdur_p);
                let cur_kinds = Object.keys(cdur_k);
                let num_patts = cur_patts.length;
                let num_kinds = cur_kinds.length;
                //idea: reset old vals (for both meter and overall) then accumulate
                // first reset
                cdur.val = 0;
                if (i == 0) {
                    odur.val = 0;
                }
                ;
                cdur.lvl_bthresh = Infinity;
                odur.lvl_bthresh = Infinity;
                cdur.lvl_bmax = Infinity;
                odur.lvl_bmax = Infinity;
                for (let k = 0; k < num_kinds; k++) {
                    let kind_key = cur_kinds[k];
                    cdur_k[kind_key] = 0.;
                    if (i == 0) {
                        odur_k[kind_key] = 0.;
                    }
                    ;
                }
                ;
                let drec_p2k;
                let drec_p4knum;
                let drec_p4kwt;
                let d_hardrev;
                let d_pnum;
                let d_pwt;
                let d_knum;
                let d_kwt;
                let cur_allthresh = true;
                let cur_allmax = true;
                if (cdurkey == "qtr") {
                    cdur.lvl_bthresh = exports.qtr_hardmax;
                    odur.lvl_bthresh = exports.qtr_hardmax;
                    cdur.lvl_bmax = exports.qtr_hardmax;
                    odur.lvl_bmax = exports.qtr_hardmax;
                    drec_p2k = exports.qtr_p2k;
                    drec_p4knum = exports.qtr_p4knum;
                    drec_p4kwt = exports.qtr_p4kwt;
                    d_pnum = exports.qtr_pnum;
                    d_pwt = exports.qtr_pwt;
                    d_knum = exports.qtr_knum;
                    d_kwt = exports.qtr_kwt;
                    d_hardrev = exports.qtr_hardrev;
                }
                else if (cdurkey == "ei") {
                    cdur.lvl_bthresh = exports.ei_hardmax;
                    odur.lvl_bthresh = exports.ei_hardmax;
                    cdur.lvl_bmax = exports.ei_hardmax;
                    odur.lvl_bmax = exports.ei_hardmax;
                    drec_p2k = exports.ei_p2k;
                    drec_p4knum = exports.ei_p4knum;
                    drec_p4kwt = exports.ei_p4kwt;
                    d_pnum = exports.ei_pnum;
                    d_pwt = exports.ei_pwt;
                    d_knum = exports.ei_knum;
                    d_kwt = exports.ei_kwt;
                    d_hardrev = exports.ei_hardrev;
                }
                else if (cdurkey == "eit") {
                    cdur.lvl_bthresh = exports.eit_hardmax;
                    odur.lvl_bthresh = exports.eit_hardmax;
                    cdur.lvl_bmax = exports.eit_hardmax;
                    odur.lvl_bmax = exports.eit_hardmax;
                    drec_p2k = exports.eit_p2k;
                    drec_p4knum = exports.eit_p4knum;
                    drec_p4kwt = exports.eit_p4kwt;
                    d_pnum = exports.eit_pnum;
                    d_pwt = exports.eit_pwt;
                    d_knum = exports.eit_knum;
                    d_kwt = exports.eit_kwt;
                    d_hardrev = exports.eit_hardrev;
                }
                else {
                    cdur.lvl_bthresh = exports.steen_hardmax;
                    odur.lvl_bthresh = exports.steen_hardmax;
                    cdur.lvl_bmax = exports.steen_hardmax;
                    odur.lvl_bmax = exports.steen_hardmax;
                    drec_p2k = exports.steen_p2k;
                    drec_p4knum = exports.steen_p4knum;
                    drec_p4kwt = exports.steen_p4kwt;
                    d_pnum = exports.steen_pnum;
                    d_pwt = exports.steen_pwt;
                    d_knum = exports.steen_knum;
                    d_kwt = exports.steen_kwt;
                    d_hardrev = exports.steen_hardrev;
                }
                ;
                //now accumulate
                for (let k = 0; k < num_patts; k++) {
                    // add meter patt to meter kind
                    let patt_key = cur_patts[k];
                    let patt_val = cdur_p[patt_key];
                    let patt_kind = drec_p2k[patt_key];
                    let curp4k_wt = drec_p4kwt[patt_kind];
                    let d_lvl = d_hardrev[patt_key];
                    //console.log(patt_key, patt_val, cdurkey, patt_kind, curp4k_wt);
                    //update level to keep track of lowest belowthresh level
                    if (patt_val < exports.skill_thresh) {
                        cdur.lvl_bthresh = Math.min(d_lvl, cdur.lvl_bthresh);
                        odur.lvl_bthresh = Math.min(d_lvl, odur.lvl_bthresh);
                        cur_allthresh = false;
                    }
                    ;
                    //update level to keep track of lowest belowmax level
                    if (patt_val < exports.pskill_max) {
                        cdur.lvl_bmax = Math.min(d_lvl, cdur.lvl_bmax);
                        odur.lvl_bmax = Math.min(d_lvl, odur.lvl_bmax);
                        cur_allmax = false;
                    }
                    ;
                    let skill_prop = (patt_val - exports.pskill_min) / exports.pskill_rng;
                    //console.log("skill prop", skill_prop);
                    // direct mapping, no need to worry about num_to_master
                    // but do need to map to 100
                    let kind_wtd = exports.skill_max * curp4k_wt * skill_prop;
                    cdur_k[patt_kind] += kind_wtd;
                    //and overall kind
                    odur_k[patt_kind] += (cwt * kind_wtd);
                    // add meter patt to meter dur overall
                    let dur_wtd = exports.skill_max * d_pwt * skill_prop;
                    cdur.val += dur_wtd;
                    // and overall dur overall
                    odur.val += (dur_wtd * cwt);
                    // add meter patt to meter overall
                    let overall_wtd = exports.skill_max * exports.overall_pwt * skill_prop;
                    cur_mk.val += overall_wtd;
                    // and to overall value
                    this.val += (cwt * overall_wtd);
                    if (i == 0) {
                        odur_p[patt_key] = 0;
                    }
                    ;
                    //meter patt to overall patt
                    odur_p[patt_key] += (patt_val * cwt);
                }
                ;
                cdur.all_thresh = cur_allthresh;
                cdur.all_max = cur_allmax;
            }
            ;
        }
        ;
        this.needs_update = false;
    }
    //strategy, update skills in patts, then worry about updating skills 
    // in kind and overall in separate function
    update_by_patt(ex, good_beats, cur_focus) {
        let cmeter = ex.meter;
        let cex = ex.example;
        let ccat = ex.cats;
        let cqdur = ex.qdur;
        let cur_mkdur;
        if (cmeter[0] == 2) {
            cur_mkdur = this.m24.durs;
        }
        else {
            cur_mkdur = this.m34.durs;
        }
        ;
        //console.log(cur_focus);
        for (let i = 0; i < good_beats.length; i++) {
            let bool_bar = good_beats[i];
            for (let j = 0; j < bool_bar.length; j++) {
                let bool_beat = bool_bar[j];
                let cur_cat = ex.cats[i][j];
                let cur_dur = cur_cat.dur;
                let is_focused = cur_dur == cur_focus;
                let ans_wt = 1.;
                if (is_focused == true && bool_beat == true) {
                    ans_wt = exports.focuswt.pos;
                }
                else if (is_focused == true && bool_beat == false) {
                    ans_wt = exports.focuswt.neg;
                }
                else if (is_focused == false && bool_beat == true) {
                    ans_wt = exports.unfocuswt.pos;
                }
                else if (is_focused == false && bool_beat == false) {
                    ans_wt = exports.unfocuswt.neg;
                }
                ;
                let cur_wt = ans_wt * exports.qscale;
                let know_type = cur_mkdur[cur_dur];
                let pstr = cur_cat.rstr;
                know_type.patt[pstr] += cur_wt;
                if (know_type.patt[pstr] > exports.pskill_max) {
                    know_type.patt[pstr] = exports.pskill_max;
                }
                else if (know_type.patt[pstr] < exports.pskill_min) {
                    know_type.patt[pstr] = exports.pskill_min;
                }
                ;
                //console.log(pstr, know_type.patt[pstr]);
            }
            ;
        }
        ;
        this.needs_update = true;
    }
}
exports.LearnerKnow = LearnerKnow;
function change_rstr(x) {
    let ret = "";
    for (let i = 0; i < x.length; i++) {
        if (x[i] == "1") {
            ret = ret.concat("x");
        }
        else if (x[i] == "0") {
            ret = ret.concat("-");
        }
        ;
    }
    ;
    return ret;
}
exports.change_rstr = change_rstr;
