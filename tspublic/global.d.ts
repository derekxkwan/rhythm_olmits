
// BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/context-isolation
export interface IeApi {
    gen_rhythm: (cm: RhythmMeter, df:DurType, wd: Record<DurType, boolean>, num_ex: number) => Promise<boolean>,
    get_rhythm: (x: number) => Promise<RhythmEx[]>,
    set_maxvel: (x: number) => void,
    set_mainvol: (x: number) => void,
    set_clickvol: (x: number) => void,
    set_drumvol: (x: number) => void,
    set_bpm: (x: number) => void,
    set_countin: (x: number) => void,
    send_start: (x: boolean) => void,
    send_kybd_tgl: (x: boolean) => void,
    send_key: (x: boolean) => void,
    send_dkey: (x: boolean) => void,
    send_debug: (x: boolean) => void,
    send_playrec: (x: boolean) => void,
    send_metroduring: (x: boolean) => void,
    save_lk: (x: string) => void,
    load_lk: (x: string) => void,
    inited: (x: boolean) => void,
    on_vel: (callback: (event: Event, arg: number) => void) => void 
    on_count: (callback: (event: Event, arg: number) => void) => void,
    on_exleft: (callback: (event: Event, arg: number) => void) => void,
    on_countin: (callback: (event: Event, arg: number) => void) => void,
    get_start: (callback: (event: Event, arg: boolean) => void) => void,
    perf_list: (callback: (event: Event, arg: number[]) => void) => void,
    num_mistakes: (callback: (event: Event, arg: number) => void) => void,
    cur_mistakes: (callback: (event: Event, arg: string[]) => void) => void,
    lk: (callback: (event: Event, arg: LearnerKnow) => void) => void,
    lkstatus: (callback: (event: Event, arg: [LearnerKnow, string]) => void) => void,
    on_status: (callback: (event: Event, arg: string) => void) => void,
    on_clearpref: (callback: (event: Event, arg: boolean) => void) => void,
    remove_channel: (ch: string) => void
}

// END CODE FROM https://www.electronjs.org/docs/latest/tutorial/context-isolation
declare global {
    // BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/context-isolation
    interface Window {
        eApi: IeApi
    }

    // END CODE FROM https://www.electronjs.org/docs/latest/tutorial/context-isolation
    



    enum QtrPatt {
        p1 = "1",
        p0 = "0"
    }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type QtrPType = keyof typeof QtrPatt;
    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

    enum QtrKind {
        o0 = "o0" //not on an offbeat
    }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type QtrKType = keyof typeof QtrKind;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    enum EiPatt {
        p11 = "11",
        p01 = "01"
    }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type EiPType = keyof typeof EiPatt;
    
    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

    // defining rhythms based on where non-rest stasrts
    enum EiKind {
        o0 = "o0", //not on an offbeat (downbeat)
        o1 = "o1" //on the first offbeat
    }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type EiKType = keyof typeof EiKind;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

    enum EiTPatt {
        p110 = "110",
        p111 = "111",
        p010 = "010",
        p011 = "011",
        p001 = "001",
        p101 = "101"
    }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type EiTPType = keyof typeof EiTPatt;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    enum EiTKind {
        o0 = "o0", //not on offbeat (downbeat)
        o1 = "o1", //on first offbeat
        o2 = "o2" //on second offbeat
    }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type EiTKType = keyof typeof EiTKind;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

    enum STeenPatt {
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

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type STeenPType = keyof typeof STeenPatt;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    enum STeenKind {
        o0 = "o0", //not on offbeat (downbeat)
        o1 = "o1", // first offbeat
        o2 = "o2", //second offbeat
        o3 = "o3" //third offbeat
    }

    
    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type STeenKType = keyof typeof STeenKind;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    enum DurKind {
            qtr = "qtr",
            ei = "ei",
            eit = "eit",
            steen = "steen"
            }

    // BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
    type DurType = keyof typeof DurKind;

    // END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

    // measure, beat, number
    type NoteRef = [number, number, number];


    interface NoteEvent {
        time: number;
        val: number;
    }
    
    interface ExampleEvent {
        nevt: NoteEvent;
        ref: NoteRef;
    }



    interface RhythmNote  {
        val: number;
        subdiv: number;
        tuplet: number;
        mult: number;
        dot: boolean;
        qval: number;
    }
    
    interface RhythmCat {
        rstr: string;
        dur: DurKind;
        kind: string;
        mult: number;
    }



    type RhythmMeter = [number, number];
    type RhythmBeat = RhythmNote[];
    type RhythmBar = RhythmBeat[];
    interface RhythmEx  {
        meter: RhythmMeter;
        example: RhythmBar[];
        cats: RhythmCat[][];
        qdur: number;
    }



    // use for overall knowledge and also in meter

    interface IDurKnow<U extends PropertyKey, T extends PropertyKey> {
        val: number,
        lvl_bthresh: number,
        lvl_bmax: number,
        lvl_max: number,
        all_thresh: boolean,
        all_max: boolean,
        patt: Record<U, number>,
        kind: Record<T, number>
    }

    class QtrKnow implements IDurKnow<QtrPType, QtrKType> {
        val: number;
        lvl_bthresh: number;
        lvl_bmax: number;
        lvl_max: number;
        all_thresh: boolean;
        all_max: boolean;
        patt: Record<QtrPType, number>;
        kind: Record<QtrKType, number>;
        constructor();
    }

    class EiKnow implements IDurKnow<EiPType, EiKType> {
        val: number;
        lvl_bthresh: number;
        lvl_bmax: number;
        lvl_max: number;
        all_thresh: boolean;
        all_max: boolean;
        patt: Record<EiPType, number>;
        kind: Record<EiKType, number>;
        constructor();
    }

    class EiTKnow implements IDurKnow<EiTPType, EiTKType> {
        val: number;
        lvl_bthresh: number;
        lvl_bmax: number;
        lvl_max: number;
        all_thresh: boolean;
        all_max: boolean;
        patt: Record<EiTPType, number>;
        kind: Record<EiTKType, number>;
        constructor();
    }

    class STeenKnow implements IDurKnow<STeenPType, STeenKType> {
        val: number;
        lvl_bthresh: number;
        lvl_bmax: number;
        lvl_max: number;
        all_thresh: boolean;
        all_max: boolean;
        patt: Record<STeenPType, number>;
        kind: Record<STeenKType, number>;
        constructor();
    }




    interface IDursKnow {
        qtr: QtrKnow,
        ei: EiKnow,
        eit: EiTKnow,
        steen: STeenKnow
    }

    class DursKnow implements IDursKnow {
        qtr: QtrKnow;
        ei: EiKnow;
        eit: EiTKnow;
        steen: STeenKnow;

        constructor();
    }


    interface IMeterKnow {
        val: number,
        durs: DursKnow,
    }
    
    class MeterKnow implements IMeterKnow {
        val: number;
        durs: DursKnow;
        constructor();
    }
 
    interface ITimingKnow {
        val: number,
        durs: DursKnow
    }

    class TimingKnow implements ITimingKnow {
        val: number;
        durs: DursKnow;
        constructor();
    }
    interface ILearnerKnow {
        val: number,
        overall: DursKnow,
        m24: MeterKnow,
        m34: MeterKnow,
    }

    class LearnerKnow implements ILearnerKnow {
        val: number;
        overall: DursKnow;
        m24: MeterKnow;
        m34: MeterKnow;
        needs_update: boolean;
        constructor();
        randomize();
        update_totals();
        update_by_patt(ex: RhythmEx, good_beats: boolean[][], cur_focus: DurType);
    }
    
    
}
