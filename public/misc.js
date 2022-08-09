export const pskill_max = 100; // maximum of dur skill meter
export const pskill_min = 0; // maximum of dur skill meter
export const skill_max = 100;
export const num_to_master = 15;
export const skill_min = 0;
export const lowestlvl = 1;
export const skill_thresh = 80;
export const bclr = "#d6f5ff";
export const flashclr = "#00ff00";
export const max_exercises = 10;
export var ItsViewType;
(function (ItsViewType) {
    ItsViewType["Selector"] = "Selector";
    ItsViewType["Settings"] = "Settings";
    ItsViewType["Perform"] = "Exercise";
    ItsViewType["Olm"] = "Progress";
    ItsViewType["Info"] = "Info";
})(ItsViewType || (ItsViewType = {}));
export class MeterPref {
    constructor() {
        this.focus = DurKind.qtr;
        this.active = { qtr: false, ei: false, eit: false, steen: false };
        this.num_ex = 1;
    }
}
export var QtrPatt;
(function (QtrPatt) {
    QtrPatt["p1"] = "1";
    QtrPatt["p0"] = "0";
})(QtrPatt || (QtrPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var QtrKind;
(function (QtrKind) {
    QtrKind["o0"] = "o0"; //not on an offbeat
})(QtrKind || (QtrKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var EiPatt;
(function (EiPatt) {
    EiPatt["p10"] = "10";
    EiPatt["p11"] = "11";
    EiPatt["p01"] = "01";
})(EiPatt || (EiPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
// defining rhythms based on where non-rest stasrts
export var EiKind;
(function (EiKind) {
    EiKind["o0"] = "o0";
    EiKind["o1"] = "o1"; //on the first offbeat
})(EiKind || (EiKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var EiTPatt;
(function (EiTPatt) {
    EiTPatt["p100"] = "100";
    EiTPatt["p110"] = "110";
    EiTPatt["p111"] = "111";
    EiTPatt["p010"] = "010";
    EiTPatt["p011"] = "011";
    EiTPatt["p001"] = "001";
    EiTPatt["p101"] = "101";
})(EiTPatt || (EiTPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var EiTKind;
(function (EiTKind) {
    EiTKind["o0"] = "o0";
    EiTKind["o1"] = "o1";
    EiTKind["o2"] = "o2"; //on second offbeat
})(EiTKind || (EiTKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var STeenPatt;
(function (STeenPatt) {
    STeenPatt["p1000"] = "1000";
    STeenPatt["p0100"] = "0100";
    STeenPatt["p0010"] = "0010";
    STeenPatt["p0001"] = "0001";
    STeenPatt["p1100"] = "1100";
    STeenPatt["p1010"] = "1010";
    STeenPatt["p1001"] = "1001";
    STeenPatt["p0110"] = "0110";
    STeenPatt["p0101"] = "0101";
    STeenPatt["p0011"] = "0011";
    STeenPatt["p1110"] = "1110";
    STeenPatt["p1101"] = "1101";
    STeenPatt["p0111"] = "0111";
    STeenPatt["p1011"] = "1011";
    STeenPatt["p1111"] = "1111";
})(STeenPatt || (STeenPatt = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var STeenKind;
(function (STeenKind) {
    STeenKind["o0"] = "o0";
    STeenKind["o1"] = "o1";
    STeenKind["o2"] = "o2";
    STeenKind["o3"] = "o3"; //third offbeat
})(STeenKind || (STeenKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export var DurKind;
(function (DurKind) {
    DurKind["qtr"] = "qtr";
    DurKind["ei"] = "ei";
    DurKind["eit"] = "eit";
    DurKind["steen"] = "steen";
})(DurKind || (DurKind = {}));
// END CODE FROM https://www.typescriptlang.org/docs/handbook/export enums.html
export const dur_prettylong = {
    qtr: "Quarter Notes",
    ei: "Eighth Notes",
    eit: "Eighth-Note Triplets",
    steen: "Sixteenth Notes"
};
export function get_pkind(x) {
    let first_one = 0;
    for (let i = 1; i < x.length; i++) {
        if (x[i] == "1") {
            first_one = Math.min(i - 1, 3);
            break;
        }
        ;
    }
    ;
    let ret = `o${first_one}`;
    return ret;
}
export function change_rstr(x) {
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
export const dur_ordered = ["qtr", "ei", "eit", "steen"];
