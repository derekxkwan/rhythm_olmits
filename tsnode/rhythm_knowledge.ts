// mirrored in tspublic/misc.ts

export const _qdur: number = 60; 
export const focuswt: any = {pos: 1., neg: -1.};
export const unfocuswt: any = {pos: 0.5, neg: -0.5}; 
export const num_to_master: number = 15;
export const pskill_max: number = 100; // maximum of dur skill meter
export const pskill_min: number = 0; // maximum of dur skill meter
export const skill_max = 100;
export const skill_min = 0;
export const lowestlvl:number = 0;
export const skill_thresh = 80;
export const pskill_rng: number = pskill_max - pskill_min;
export const qscale: number = pskill_rng/num_to_master;
export const initval: number = 0;

export enum DurKind {
    qtr = "qtr",
    ei = "ei",
    eit = "eit",
    steen = "steen"
}

export enum MeterKind {
    m24 = "m24",
    m34 = "m34"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
// (namely the keyof typeof trick)
export type MeterType = keyof typeof MeterKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export const num_meters = Object.keys(MeterKind).length;
export const meter_wt = 1./num_meters;

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type DurType = keyof typeof DurKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export const durs = Object.keys(DurKind);

export enum QtrPatt {
    p1 = "1",
    p0 = "0"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type QtrPType = keyof typeof QtrPatt;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export enum QtrKind {
    o0 = "o0" //not on an offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type QtrKType = keyof typeof QtrKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export enum EiPatt {
    p11 = "11",
    p01 = "01"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type EiPType = keyof typeof EiPatt;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

// defining rhythms based on where non-rest stasrts
export enum EiKind {
    o0 = "o0", //not on an offbeat (downbeat)
    o1 = "o1" //on the first offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type EiKType = keyof typeof EiKind;

// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export enum EiTPatt {
    p110 = "110",
    p111 = "111",
    p010 = "010",
    p011 = "011",
    p001 = "001",
    p101 = "101"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type EiTPType = keyof typeof EiTPatt;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export enum EiTKind {
    o0 = "o0", //not on offbeat (downbeat)
    o1 = "o1", //on first offbeat
    o2 = "o2" //on second offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type EiTKType = keyof typeof EiTKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export enum STeenPatt {
    p0100 = "0100",
    p0001 = "0001",
    p1100 = "1100",
    p1001 = "1001",
    p0110 = "0110",
    p0101 = "0101",
    p0011 = "0011",
    p1110 = "1110",
    p1101 = "1101",
    p0111 = "0111",
    p1011 = "1011",
    p1111 = "1111"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type STeenPType = keyof typeof STeenPatt;

// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export enum STeenKind {
    o0 = "o0", //not on offbeat (downbeat)
    o1 = "o1", // first offbeat
    o2 = "o2", //second offbeat
    o3 = "o3" //third offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type STeenKType = keyof typeof STeenKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html

export function patt_to_rnote(x: string) : RhythmNote[] {
    let cur_subdiv: number = x.length;
    let cur_tup: number = 1.;
    if (x.length == 3) {
        cur_tup = 3;
        cur_subdiv = 2;
    };

    let cur_mult: number = 1;
    let cur_dot: boolean = false;
    let cur_qval = Math.round(_qdur/cur_subdiv);
    if (cur_tup != 1) {
        cur_qval = Math.round(_qdur/cur_tup);
    };
    
    let ret: RhythmNote[] = [];

    for(let i: number = 0; i < x.length; i++) {
        let cur: string = x[i];
        let cur_val = 0;
        if(cur != "0"){
            cur_val = 1;
        };

        let cnote: RhythmNote = {val: cur_val, subdiv: cur_subdiv, tuplet: cur_tup,
                                    mult: cur_mult, dot: cur_dot, qval: cur_qval};
        ret.push(cnote);
    };
    return ret;
}

export function pattkeys_to_rnoterec<U extends PropertyKey>(k: U[]) : Record<U, RhythmNote[]> {
    let ret: {[z in U]: RhythmNote[]} = {} as {[z in U]: RhythmNote[]};
    for(let i: number = 0; i < k.length; i++) {
        let ckey: U = k[i] as U;
        let cnotes: RhythmNote[] = patt_to_rnote(ckey as string);
        ret[ckey] = cnotes;

    };
    
    return ret;
}

export const qtr_rnotes: Record<QtrPatt, RhythmNote[]> = pattkeys_to_rnoterec<QtrPatt>(Object.values(QtrPatt));
export const ei_rnotes: Record<EiPatt, RhythmNote[]> = pattkeys_to_rnoterec<EiPatt>(Object.values(EiPatt));
export const eit_rnotes: Record<EiTPatt, RhythmNote[]> = pattkeys_to_rnoterec<EiTPatt>(Object.values(EiTPatt));
export const steen_rnotes: Record<STeenPatt, RhythmNote[]> = pattkeys_to_rnoterec<STeenPatt>(Object.values(STeenPatt));

export const num_rhy: Record<DurType, number> = {
    qtr: Object.keys(QtrPatt).length,
    ei: Object.keys(EiPatt).length,
    eit: Object.keys(EiTPatt).length,
    steen: Object.keys(STeenPatt).length
};

//how to weight rhythms to overall duration skill level
export const dur_rhywt: Record<DurType, number> = {
    qtr: 1./num_rhy.qtr,
    ei: 1./num_rhy.ei,
    eit: 1./num_rhy.eit,
    steen: 1./num_rhy.steen
};

export function get_score_weight(pos: boolean, dur: DurType, focus: boolean): number {
    // gives inverse of number of rhythms
    // ie proportion of rhythm exercises to total dur exercises
    let cur_durwt:number  = dur_rhywt[dur];
    // if answering 1 question for each rhythm, will max out skill meter
    let cur_prop: number = cur_durwt * pskill_max;
    // but really want to answer x questions to max out skill meter
    // so divide by number of question to master particular rhythm skill
    cur_prop = cur_prop/num_to_master;
    // now want to weight based on if focus of lesson or not
    let ans_wt: number = 1.;
    if(pos == true) {
       if(focus == true) {
          ans_wt = focuswt.pos;  
       }
       else {
            ans_wt = unfocuswt.pos;
       };
    }
    else {
        if(focus == true) {
            ans_wt = focuswt.neg;
        }
        else {
            ans_wt = unfocuswt.neg;
        };
    };
    cur_prop = cur_prop * ans_wt;
    return cur_prop;
}


export const qtr_p2k: Record<QtrPType, QtrKType> = {
    p1: "o0",
    p0: "o0"
}

export const qtr_k2p: Record<QtrKType, QtrPType[]> = revrec(qtr_p2k);

export const qtr_p4knum: Record<QtrKType, number> = revrec_num(qtr_k2p);
export const qtr_p4kwt: Record<QtrKType, number> = revrec_wt(qtr_k2p);
export const qtr_pnum: number = Object.keys(qtr_p2k).length;
export const qtr_pwt: number = 1./qtr_pnum;
export const qtr_knum: number = Object.keys(QtrKind).length;
export const qtr_kwt: number = 1./qtr_knum;

export const qtr_hardrev: Record<QtrPType, number> = {
    p1: 0,
    p0: 0
}

export const qtr_hardmax: number = get_durhardmax<QtrPType>(qtr_hardrev);
export const qtr_hard: Record<number, QtrPType[]> = revrec(qtr_hardrev);

// categorizing specific rhythms by type
export const ei_p2k: Record<EiPType, EiKType> = {
    p11: "o0",
    p01: "o1"
};


export const ei_k2p: Record<EiKType, EiPType[]> = revrec(ei_p2k);


export const ei_p4knum: Record<EiKType, number> = revrec_num(ei_k2p);
export const ei_p4kwt: Record<EiKType, number> = revrec_wt(ei_k2p);
export const ei_pnum: number = Object.keys(ei_p2k).length;
export const ei_pwt: number = 1./ei_pnum;
export const ei_knum: number = Object.keys(EiKind).length;
export const ei_kwt: number = 1./ei_knum;

// difficulties with bigger number = harder
// these are relative to the duration
export const ei_hardrev: Record<EiPType, number> = {
    p11: 0,
    p01: 1
};

export const ei_hardmax: number = get_durhardmax<EiPType>(ei_hardrev);
export const ei_hard: Record<number, EiPType[]> = revrec(ei_hardrev);

export const eit_p2k: Record<EiTPType, EiTKType> =  {
    p110: "o0",
    p111: "o0",
    p010: "o1",
    p011: "o1",
    p001: "o2",
    p101: "o0"
};

export const eit_k2p: Record<EiTKType, EiTPType[]> = revrec(eit_p2k);


export const eit_p4knum: Record<EiTKType, number> = revrec_num(eit_k2p);
export const eit_p4kwt: Record<EiTKType, number> = revrec_wt(eit_k2p);
export const eit_pnum: number = Object.keys(eit_p2k).length;
export const eit_pwt: number = 1./eit_pnum;
export const eit_knum: number = Object.keys(EiTKind).length;
export const eit_kwt: number = 1./eit_knum;


export const eit_hardrev: Record<EiTPType, number> = {
    p110: 2,
    p111: 0,
    p010: 4,
    p011: 3,
    p001: 3,
    p101: 1,

};

export const eit_hardmax: number = get_durhardmax<EiTPType>(eit_hardrev);
export const eit_hard: Record<number, EiTPType[]> = revrec(eit_hardrev);

export const steen_p2k: Record<STeenPType, STeenKType> = {
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


export const steen_k2p: Record<STeenKType, STeenPType[]> = revrec(steen_p2k);


export const steen_p4knum: Record<STeenKType, number> = revrec_num(steen_k2p);
export const steen_p4kwt: Record<STeenKType, number> = revrec_wt(steen_k2p);
export const steen_pnum: number = Object.keys(steen_p2k).length;
export const steen_pwt: number = 1./steen_pnum;
export const steen_knum: number = Object.keys(STeenKind).length;
export const steen_kwt: number = 1./steen_knum;

export const overall_pnum = qtr_pnum + ei_pnum + eit_pnum + steen_pnum;
export const overall_pwt = 1./overall_pnum;

export const steen_hardrev: Record<STeenPType, number> = {
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

export const steen_hardmax: number = get_durhardmax<STeenPType>(steen_hardrev);
export const steen_hard: Record<number, STeenPType[]> = revrec(steen_hardrev);

//console.log(qtr_hardmax, ei_hardmax, eit_hardmax, steen_hardmax);

// use for overall knowledge and also in meter

export interface IDurKnow<U extends PropertyKey, T extends PropertyKey> {
    val: number,
    lvl_bthresh: number,
    lvl_bmax: number,
    lvl_max: number,
    all_thresh: boolean,
    all_max: boolean,
    patt: Record<U, number>,
    kind: Record<T, number>
}

export class QtrKnow implements IDurKnow<QtrPType, QtrKType> {
    val: number;
    lvl_bthresh: number;
    lvl_bmax: number;
    lvl_max: number;
    all_thresh: boolean;
    all_max: boolean;
    patt: Record<QtrPType, number>;
    kind: Record<QtrKType, number>;

    constructor() {
        let x = Object.keys(QtrPatt).reduce<{[key: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let x1 = (x as Record<QtrPType, number>);
        let y = Object.keys(QtrKind).reduce<{[key: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let y1 = (y as Record<QtrKType, number>);

        this.patt = x1;
        this.kind = y1;
        this.lvl_bthresh =  lowestlvl;
        this.lvl_bmax =  lowestlvl;
        this.lvl_max = qtr_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.val = initval;
    }
};


export class EiKnow implements IDurKnow<EiPType, EiKType> {
    val: number;
    lvl_bthresh: number;
    lvl_bmax: number;
    lvl_max: number;
    all_thresh: boolean;
    all_max: boolean;
    patt: Record<EiPType, number>;
    kind: Record<EiKType, number>;

    constructor() {
        let x = Object.keys(EiPatt).reduce<{[z: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let x1 = (x as Record<EiPType, number>);
        let y = Object.keys(EiKind).reduce<{[z: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let y1 = (y as Record<EiKType, number>);

        this.patt = x1;
        this.lvl_bthresh =  lowestlvl;
        this.lvl_bmax =  lowestlvl;
        this.lvl_max = ei_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.kind = y1;
        this.val = initval;
    }
};


export class EiTKnow implements IDurKnow<EiTPType, EiTKType> {
    val: number;
    lvl_bthresh: number;
    lvl_bmax: number;
    lvl_max: number;
    all_thresh: boolean;
    all_max: boolean;
    patt: Record<EiTPType, number>;
    kind: Record<EiTKType, number>;

    constructor() {
        let x = Object.keys(EiTPatt).reduce<{[z: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let x1 = (x as Record<EiTPType, number>);
        let y = Object.keys(EiTKind).reduce<{[z: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let y1 = (y as Record<EiTKType, number>);

        this.patt = x1;
        this.lvl_bthresh =  lowestlvl;
        this.lvl_bmax =  lowestlvl;
        this.lvl_max = eit_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.kind = y1;
        this.val = initval;
    }
};


export class STeenKnow implements IDurKnow<STeenPType, STeenKType> {
    val: number;
    lvl_bthresh: number;
    lvl_bmax: number;
    lvl_max: number;
    all_thresh: boolean;
    all_max: boolean;
    patt: Record<STeenPType, number>;
    kind: Record<STeenKType, number>;

    constructor() {
        let x = Object.keys(STeenPatt).reduce<{[z: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let x1 = (x as Record<STeenPType, number>);
        let y = Object.keys(STeenKind).reduce<{[z: string]: number}>((prev,cur) => {prev[cur] = initval; return prev}, {});
        let y1 = (y as Record<STeenKType, number>);

        this.patt = x1;
        this.lvl_bthresh =  lowestlvl;
        this.lvl_bmax =  lowestlvl;
        this.lvl_max = steen_hardmax;
        this.all_thresh = false;
        this.all_max = false;
        this.kind = y1;
        this.val = initval;
    }
};




export interface IDursKnow {
    qtr: QtrKnow,
    ei: EiKnow,
    eit: EiTKnow,
    steen: STeenKnow
}

export class DursKnow implements IDursKnow {
    qtr: QtrKnow;
    ei: EiKnow;
    eit: EiTKnow;
    steen: STeenKnow;

    constructor() {
        this.qtr = new QtrKnow();
        this.ei = new EiKnow();
        this.eit = new EiTKnow();
        this.steen = new STeenKnow();
    }
}


export interface IMeterKnow {
    val: number,
    durs: DursKnow,
}

export class MeterKnow implements IMeterKnow {
    val: number;
    durs: DursKnow;
    constructor() {
        this.val = initval;
        this.durs = new DursKnow();
    }
}

/*
// should center around 0 where 0 is on time, negative indicates early, positive indicates late
export interface ITimingKnow {
    val: number,
    durs: Record<DurType, number>
}

export class TimingKnow implements ITimingKnow {
    val: number;
    durs: Record<DurType, number>;
    constructor() {
        this.val = 0.;

        let x = Object.keys(DurKind).reduce<{[x: string]: number}>((prev,cur) => {prev[cur] = 0.; return prev}, {});
        this.durs = (x as Record<DurType, number>);
    }
}
*/

export interface ITimingKnow {
    val: number,
    durs: DursKnow
}

export class TimingKnow implements TimingKnow {
    val: number;
    durs: DursKnow;

    constructor() {
        this.val = 0.;
        this.durs = new DursKnow();
    }
}

export function revrec<U extends PropertyKey,T extends PropertyKey>(x: Record<U,T>) : Record<T,U[]> {

    let arr: string[] = Object.keys(x);
    let ret: {[z in T]: U[]} = {} as {[z in T]: U[]};


    for(let i: number = 0; i < arr.length; i++) {
        let a: U = arr[i] as U;
        let b: T = x[a];
        if(!(b in ret)){
            ret[b] = [];
        };
        ret[b].push(a);
    };

    return (ret as Record<T,U[]>);

}

export function revrec_num<T extends PropertyKey, U extends PropertyKey>(x: Record<T, U[]>) : Record<T, number> {
    let ret: {[key in T]: number} = {} as {[key in T]: number}; 
    let arr: string[] = Object.keys(x);

    for(let i: number = 0; i < arr.length; i++) {
        let k: T = arr[i] as T;
        ret[k] = x[k].length;
    };

    return (ret as Record<T,number>);

}

export function revrec_wt<T extends PropertyKey, U extends PropertyKey>(x: Record<T, U[]>) : Record<T, number> {
    let ret: {[z in T]: number} = {} as {[z in T]: number}; 
    let arr: string[] = Object.keys(x);

    for(let i: number = 0; i < arr.length; i++) {
        let k: T = arr[i] as T;
        ret[k] = 1./x[k].length;
    };

    return (ret as Record<T,number>);

}

export function pattstr_to_key(x:string) : string {
    return "p".concat(x);
}

export function get_rhy_kind(x:string) : any {
    let cur_dur: DurKind;
    let rstr_len: number = x.length;
    let aug_str = "p".concat(x);
    let cur_kind: string = "";
    if (rstr_len == 2) {
        cur_dur = DurKind.ei;
        cur_kind = ei_p2k[aug_str];
    }
    else if (rstr_len == 3) {
        cur_dur = DurKind.eit;
        cur_kind = eit_p2k[aug_str];
    }
    else if (rstr_len == 4) {
        cur_dur = DurKind.steen;
        cur_kind = steen_p2k[aug_str];
    }
    else {
        cur_dur = DurKind.qtr;
        cur_kind = qtr_p2k[aug_str];
    };

    let ret = {dur: cur_dur, kind: cur_kind};
    return ret;
}


export  function get_durhardmax<U extends PropertyKey> (x: Record<U, number>) : number {
    let ckeys: string[] = Object.keys(x);
    let cmax: number = -Infinity;
    for(let i: number = 0; i < ckeys.length; i++) {
        let ckey: string = ckeys[i];
        let cval: number = x[ckey];
        cmax = Math.max(cmax, cval);
    };
    return cmax;
}

export const dur_hardrev: Record<DurType, number> = {
    qtr: 1,
    ei: 2,
    eit: 3,
    steen: 4
};

export const dur_hard: Record<number, DurType[]> = revrec(dur_hardrev);

// measure, beat, number
export type NoteRef = [number, number, number];

export interface NoteEvent {
    time: number;
    val: number;
}

export interface ExampleEvent {
    nevt: NoteEvent;
    ref: NoteRef;
}

export type RhythmMeter = [number, number];
export interface RhythmNote {
    val: number;
    subdiv: number;
    tuplet: number;
    mult: number;
    dot: boolean;
    qval: number;
}

export type RhythmBeat = RhythmNote[];
export type RhythmBar = RhythmBeat[];

//0 = rest, 1 = hit
export interface RhythmCat {
    rstr: string;
    dur: DurKind;
    kind: string;
    mult: number;
}

export interface RhythmEx {
    meter: RhythmMeter;
    example: RhythmBar[];
    cats: RhythmCat[][];
    qdur: number;
}

export type RhythmEquivDict = {
   [name: string]: RhythmCat;
}

export const rstr_eq: RhythmEquivDict = {
    "p1010": {rstr: "11", mult: 2, dur: DurKind.ei, kind: "o0"},
    "p0010": {rstr: "01", mult: 2, dur: DurKind.ei, kind: "o1"},
    "p10": {rstr: "1", mult: 2, dur: DurKind.qtr, kind: ""},
    "p1000": {rstr: "1", mult: 4, dur:DurKind.qtr, kind: ""},
};

export const dur_prettylong: Record<DurKind, string> = {
    qtr: "Quarter Notes",
    ei: "Eighth Notes",
    eit: "Eighth-Note Triplets",
    steen: "Sixteenth Notes"
}

export interface ILearnerKnow {
    val: number,
    overall: DursKnow,
    m24: MeterKnow,
    m34: MeterKnow,
}

export class LearnerKnow implements ILearnerKnow {
    val: number;
    overall: DursKnow;
    m24: MeterKnow;
    m34: MeterKnow;
    needs_update: boolean;
    constructor() {
        this.val = initval;
        this.overall = new DursKnow();
        this.m24 = new MeterKnow();   
        this.m34 = new MeterKnow();   
        this.needs_update = false;
    }

    load_from_ilk(x: ILearnerKnow) {
        this.val = x.val;
        this.overall = x.overall;
        this.m24 = x.m24;
        this.m34 = x.m34;
        this.needs_update = true;
        this.update_totals();
    }

    randomize(lo: number, hi: number) {
        //start with meter dur patts
        //use meter dur patts for meter dur kind and meter dur overall (val)
        //compute meter overall val from meter dur patts

        //use meter dur patts for overall dur patts
        //use meter dur kinds for overall dur kinds
        //use meter dur patts for overall dur val
        //use meter overall val for val

        let cm: MeterKnow[] = [this.m24, this.m34];
        let cnum: number = cm.length;
        let cwt: number = 1./cnum;
        let crange: number = Math.abs(hi - lo);
        //reset val overall
        this.val = 0.;

        for(let i: number = 0; i < cnum; i++) {
            //iterating over METER
            let cur_mk: MeterKnow = cm[i];
            let cur_mkdur: DursKnow = cur_mk.durs;
            let avail_durs = Object.keys(cur_mkdur);
            let dnum: number = avail_durs.length;

            //reset old meter overall val
            cur_mk.val = 0.;

            for(let j: number = 0; j < dnum; j++) {
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
                for(let k: number = 0; k < num_kinds; k++) {
                    let kind_key: string = cur_kinds[k];
                    cdur_k[kind_key] = 0.;
                    odur_k[kind_key] = 0.;

                };
                for(let k: number = 0; k < num_patts; k++){
                    // add meter patt to meter kind
                    let patt_key: string = cur_patts[k];
                    let patt_val = cdur_p[patt_key];
                    cdur_p[patt_key] = Math.min(Math.floor((Math.random() * crange * 1.01) + lo), 100); 
                };

            };
        };
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

        let cm: MeterKnow[] = [this.m24, this.m34];
        let cnum: number = cm.length;
        let cwt: number = 1./cnum;
        //reset val overall
        this.val = 0.;

        for(let i: number = 0; i < cnum; i++) {
            //iterating over METER
            let cur_mk: MeterKnow = cm[i];
            let cur_mkdur: DursKnow = cur_mk.durs;
            let avail_durs = Object.keys(cur_mkdur);
            let dnum: number = avail_durs.length;

            //reset old meter overall val
            cur_mk.val = 0.;

            for(let j: number = 0; j < dnum; j++) {
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
                if(i == 0) {
                    odur.val = 0;
                };
                cdur.lvl_bthresh = Infinity;
                odur.lvl_bthresh = Infinity;
                cdur.lvl_bmax = Infinity;
                odur.lvl_bmax = Infinity;
                for(let k: number = 0; k < num_kinds; k++) {
                    let kind_key: string = cur_kinds[k];
                    cdur_k[kind_key] = 0.;
                    if(i == 0) {
                        odur_k[kind_key] = 0.;
                    };

                };
                let drec_p2k;
                let drec_p4knum;
                let drec_p4kwt;
                let d_hardrev;
                let d_pnum: number;
                let d_pwt: number;
                let d_knum: number;
                let d_kwt: number;

                let cur_allthresh: boolean = true;
                let cur_allmax: boolean = true;
                if (cdurkey == "qtr") {
                    cdur.lvl_bthresh = qtr_hardmax;
                    odur.lvl_bthresh = qtr_hardmax;
                    cdur.lvl_bmax = qtr_hardmax;
                    odur.lvl_bmax = qtr_hardmax;
                    drec_p2k = qtr_p2k;
                    drec_p4knum = qtr_p4knum;
                    drec_p4kwt = qtr_p4kwt;
                    d_pnum = qtr_pnum;
                    d_pwt = qtr_pwt;
                    d_knum = qtr_knum;
                    d_kwt = qtr_kwt;
                    d_hardrev = qtr_hardrev;
                }
                else if (cdurkey == "ei") {
                    cdur.lvl_bthresh = ei_hardmax;
                    odur.lvl_bthresh = ei_hardmax;
                    cdur.lvl_bmax = ei_hardmax;
                    odur.lvl_bmax = ei_hardmax;
                    drec_p2k = ei_p2k;
                    drec_p4knum = ei_p4knum;
                    drec_p4kwt = ei_p4kwt;
                    d_pnum = ei_pnum;
                    d_pwt = ei_pwt;
                    d_knum = ei_knum;
                    d_kwt = ei_kwt;
                    d_hardrev = ei_hardrev;
                }
                else if (cdurkey == "eit") {
                    cdur.lvl_bthresh = eit_hardmax;
                    odur.lvl_bthresh = eit_hardmax;
                    cdur.lvl_bmax = eit_hardmax;
                    odur.lvl_bmax = eit_hardmax;
                    drec_p2k = eit_p2k;
                    drec_p4knum = eit_p4knum;
                    drec_p4kwt = eit_p4kwt;
                    d_pnum = eit_pnum;
                    d_pwt = eit_pwt;
                    d_knum = eit_knum;
                    d_kwt = eit_kwt;
                    d_hardrev = eit_hardrev;
                }
                else {
                    cdur.lvl_bthresh = steen_hardmax;
                    odur.lvl_bthresh = steen_hardmax;
                    cdur.lvl_bmax = steen_hardmax;
                    odur.lvl_bmax = steen_hardmax;
                    drec_p2k = steen_p2k;
                    drec_p4knum = steen_p4knum;
                    drec_p4kwt = steen_p4kwt;
                    d_pnum = steen_pnum;
                    d_pwt = steen_pwt;
                    d_knum = steen_knum;
                    d_kwt = steen_kwt;
                    d_hardrev = steen_hardrev;
                };

                //now accumulate
                for(let k: number = 0; k < num_patts; k++){
                    // add meter patt to meter kind
                    let patt_key: string = cur_patts[k];
                    let patt_val = cdur_p[patt_key];
                    let patt_kind = drec_p2k[patt_key];
                    let curp4k_wt: number = drec_p4kwt[patt_kind];
                    let d_lvl: number = d_hardrev[patt_key];
                    //console.log(patt_key, patt_val, cdurkey, patt_kind, curp4k_wt);
                    //update level to keep track of lowest belowthresh level
                    if (patt_val < skill_thresh) {
                        cdur.lvl_bthresh = Math.min(d_lvl, cdur.lvl_bthresh);
                        odur.lvl_bthresh = Math.min(d_lvl, odur.lvl_bthresh);
                        cur_allthresh = false;
                    };
                    
                    //update level to keep track of lowest belowmax level
                    if (patt_val < pskill_max) {
                        cdur.lvl_bmax = Math.min(d_lvl, cdur.lvl_bmax);
                        odur.lvl_bmax = Math.min(d_lvl, odur.lvl_bmax);
                        cur_allmax = false;
                    };


                    let skill_prop = (patt_val - pskill_min)/pskill_rng;
                    //console.log("skill prop", skill_prop);
                    // direct mapping, no need to worry about num_to_master
                    // but do need to map to 100
                    let kind_wtd: number = skill_max * curp4k_wt * skill_prop;
                    cdur_k[patt_kind] += kind_wtd;

                    //and overall kind
                    odur_k[patt_kind] += (cwt * kind_wtd);

                    // add meter patt to meter dur overall
                    let dur_wtd: number = skill_max * d_pwt * skill_prop;
                    cdur.val += dur_wtd;
                    // and overall dur overall
                    odur.val += (dur_wtd * cwt);

                    // add meter patt to meter overall
                    let overall_wtd: number = skill_max * overall_pwt * skill_prop;
                    cur_mk.val += overall_wtd;

                    // and to overall value
                    this.val += (cwt * overall_wtd);
                    
                    if(i == 0) {
                        odur_p[patt_key] = 0;
                    };
                    //meter patt to overall patt
                    odur_p[patt_key] += (patt_val * cwt);
                };

                cdur.all_thresh = cur_allthresh;
                cdur.all_max = cur_allmax;
            };
        };
        this.needs_update = false;
    }
    //strategy, update skills in patts, then worry about updating skills 
    // in kind and overall in separate function
    update_by_patt(ex: RhythmEx, good_beats: boolean[][], cur_focus: DurType) {
        let cmeter: RhythmMeter = ex.meter;
        let cex: RhythmBar[] = ex.example;
        let ccat: RhythmCat[][] = ex.cats;
        let cqdur: number = ex.qdur;
        let cur_mkdur: DursKnow;
        if (cmeter[0] == 2) {
            cur_mkdur = this.m24.durs;
        }
        else {
            cur_mkdur = this.m34.durs;
        };
        //console.log(cur_focus);
        for(let i=0; i < good_beats.length; i++) {
            let bool_bar: boolean[] = good_beats[i];
            for(let j=0; j < bool_bar.length; j++) {
                let bool_beat: boolean = bool_bar[j];
                let cur_cat: RhythmCat = ex.cats[i][j];
                let cur_dur: DurType = cur_cat.dur;
                let is_focused: boolean = cur_dur == cur_focus;
                let ans_wt: number = 1.;
                if(is_focused == true && bool_beat == true) {
                    ans_wt = focuswt.pos;
                }
                else if (is_focused == true && bool_beat == false) {
                    ans_wt = focuswt.neg;
                }
                else if (is_focused == false && bool_beat == true) {
                    ans_wt = unfocuswt.pos;
                }
                else if (is_focused == false && bool_beat == false) {
                    ans_wt = unfocuswt.neg;
                };

                let cur_wt: number = ans_wt * qscale;
                let know_type: any = cur_mkdur[cur_dur];
                let pstr: string = cur_cat.rstr;
                know_type.patt[pstr] += cur_wt;
                if (know_type.patt[pstr] > pskill_max) {
                    know_type.patt[pstr] = pskill_max;
                } else if (know_type.patt[pstr] < pskill_min) {
                    know_type.patt[pstr] = pskill_min;
                };
                //console.log(pstr, know_type.patt[pstr]);
            };
        };
        
    this.needs_update = true;
    }
}


export function change_rstr(x: string): string {
    let ret: string = "";
    for(let i = 0; i < x.length; i++) {
        if(x[i] == "1") {
            ret = ret.concat("x");
        }
        else if(x[i] == "0") {
            ret = ret.concat("-");
        };
    };
    return ret;
}


