export const pskill_max: number = 100; // maximum of dur skill meter
export const pskill_min: number = 0; // maximum of dur skill meter
export const skill_max = 100;
export const num_to_master = 15;
export const skill_min = 0;
export const lowestlvl = 1;
export const skill_thresh = 80;
export const bclr: string = "#d6f5ff";
export const flashclr: string = "#00ff00";

export const max_exercises: number = 10;
export enum ItsViewType {
    Selector = "Selector",
    Settings = "Settings",
    Perform = "Exercise",
    Olm = "Progress",
    Info = "Info",
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
export type ItsView = keyof typeof ItsViewType;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html


export interface ItsState {
   view: ItsViewType; 
   m24_ex: MeterPref;
   m34_ex: MeterPref;
   init: boolean;
   cur_ex: RhythmEx[];
   ex_idx: number;
   mainvol: number;
   clickvol: number;
   drumvol: number;
   maxvel: number;
   bpm: number;
   kybd: boolean;
   debug: boolean;
   //status: string;
   user: string;
}


export interface IMeterPref {
    focus: DurType,
    active: Record<DurType, boolean>,
    num_ex: number
}


export class MeterPref implements IMeterPref {
    focus: DurType;
    active: Record<DurType, boolean>;
    num_ex: number;

    constructor(){
        this.focus = DurKind.qtr;
        this.active = {qtr: false, ei: false, eit: false, steen: false} as Record<DurType, boolean>;
        this.num_ex = 1;

    }
}

export enum QtrPatt {
    p1 = "1",
    p0 = "0"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type QtrPType = keyof typeof QtrPatt;

// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export enum QtrKind {
    o0 = "o0" //not on an offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type QtrKType = keyof typeof QtrKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export enum EiPatt {
    p10 = "10",
    p11 = "11",
    p01 = "01"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type EiPType = keyof typeof EiPatt;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

// defining rhythms based on where non-rest stasrts
export enum EiKind {
    o0 = "o0", //not on an offbeat (downbeat)
    o1 = "o1" //on the first offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type EiKType = keyof typeof EiKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export enum EiTPatt {
    p100 = "100",
    p110 = "110",
    p111 = "111",
    p010 = "010",
    p011 = "011",
    p001 = "001",
    p101 = "101"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type EiTPType = keyof typeof EiTPatt;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export enum EiTKind {
    o0 = "o0", //not on offbeat (downbeat)
    o1 = "o1", //on first offbeat
    o2 = "o2" //on second offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type EiTKType = keyof typeof EiTKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export enum STeenPatt {
    p1000 = "1000",
    p0100 = "0100",
    p0010 = "0010",
    p0001 = "0001",
    p1100 = "1100",
    p1010 = "1010",
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
export type STeenPType = keyof typeof STeenPatt;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export enum STeenKind {
    o0 = "o0", //not on offbeat (downbeat)
    o1 = "o1", // first offbeat
    o2 = "o2", //second offbeat
    o3 = "o3" //third offbeat
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type STeenKType = keyof typeof STeenKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export enum DurKind {
        qtr = "qtr",
        ei = "ei",
        eit = "eit",
        steen = "steen"
        }

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export type DurType = keyof typeof DurKind;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html

export const dur_prettylong: Record<DurKind, string> = {
        qtr: "Quarter Notes",
        ei: "Eighth Notes",
        eit: "Eighth-Note Triplets",
        steen: "Sixteenth Notes"
    }


export function get_pkind(x: string) : string {
    let first_one: number = 0;
    for (let i =1; i < x.length; i++) {
        if(x[i] == "1") {
            first_one = Math.min(i-1,3);
            break;
        };
    };

    let ret: string = `o${first_one}`;
    return ret;
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

export const dur_ordered: DurType[] = ["qtr", "ei", "eit", "steen"];
