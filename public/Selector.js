/// <reference path="./global.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from 'react';
import * as Misc from './misc';
export function MeterBank(props) {
    const [cur_st, use_st] = useState(props.prefs);
    let meter_str = `${props.meter[0]}-${props.meter[1]}`;
    let meter_title = `${props.meter[0]}/${props.meter[1]} Meter`;
    let cur_id = `${meter_str}-bank`;
    let lkdurs = props.lk.durs;
    let durkeys = Object.keys(lkdurs);
    let dropdurs = [];
    let durvals = {};
    let duravail = {};
    for (let i = 0; i < durkeys.length; i++) {
        let ckey = durkeys[i];
        let cval = lkdurs[ckey].val;
        durvals[ckey] = cval;
    }
    ;
    for (let i = 0; i < Misc.dur_ordered.length; i++) {
        let ckey = Misc.dur_ordered[i];
        let cur_bool = false;
        if (ckey == Misc.dur_ordered[0]) {
            cur_bool = true;
        }
        else if (i > 0) {
            let prevkey = Misc.dur_ordered[i - 1];
            if (durvals[prevkey] >= Misc.skill_thresh) {
                cur_bool = true;
            }
            else {
                cur_bool = false;
            }
            ;
        }
        ;
        if (cur_bool == true) {
            duravail[ckey] = true;
            dropdurs.push([ckey, Misc.dur_prettylong[ckey]]);
        }
        else {
            let ctype = ckey;
            duravail[ckey] = false;
            cur_st.active[ctype] = false;
            if (cur_st.focus == ctype) {
                cur_st.focus = Misc.DurKind.qtr;
                cur_st.active['qtr'] = true;
            }
            ;
        }
        ;
    }
    ;
    const onchy_sel = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.value;
        cur_st.focus = mv;
        let newdict;
        if (props.meter[0] == 2) {
            newdict = { m24_ex: cur_st };
        }
        else {
            newdict = { m34_ex: cur_st };
        }
        ;
        props.sfn(newdict);
        set_active(mv, true);
        //console.log(ret);
        use_st(cur_st);
    };
    const dursel_render = () => {
        let cstr = `${meter_str}-sel`;
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
        return (React.createElement("div", { key: cstr, id: cstr },
            React.createElement("label", { htmlFor: cstr }, " Select focus:"),
            React.createElement("select", { id: cstr, value: cur_st.focus, onChange: onchy_sel }, dropdurs.map((x, y) => {
                let sval = x[0];
                let sname = x[1];
                return (React.createElement("option", { key: `${meter_str}-sname`, value: sval }, sname));
            }))));
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
    };
    const set_active = (x, y) => {
        cur_st.active[x] = y;
        let newdict;
        if (props.meter[0] == 2) {
            newdict = { m24_ex: cur_st };
        }
        else {
            newdict = { m34_ex: cur_st };
        }
        ;
        props.sfn(newdict);
        //console.log(ret);
        use_st(cur_st);
    };
    const onchy_tgl = (x, y, evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.checked;
        if (y == false) {
            set_active(x, false);
            cur_elt.checked = false;
        }
        else {
            set_active(x, mv);
        }
        ;
    };
    const durtgl_render = (x) => {
        let cur_id = `${meter_str}-${x}-tgl`;
        let cur_avail = duravail[x];
        let cur_val = cur_st.active[x];
        let is_focus = x == cur_st.focus;
        return (React.createElement("input", { key: cur_id, type: "checkbox", id: cur_id, onChange: (evt) => onchy_tgl(x, cur_avail, evt), checked: cur_avail && (cur_val || is_focus), disabled: (!cur_avail) || is_focus }));
    };
    const durlistentry_render = (x) => {
        let pstr = Misc.dur_prettylong[x];
        let cur_id = `${meter_str}-${x}`;
        let cval = durvals[x];
        return (React.createElement("div", { key: cur_id, id: cur_id },
            durtgl_render(x),
            " ",
            pstr,
            ": ",
            React.createElement("span", { className: get_bg(cval) },
                cval.toFixed(1),
                "%"),
            React.createElement("br", null),
            React.createElement("progress", { max: "100", value: cval })));
    };
    const onchy_sl = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.valueAsNumber;
        cur_st.num_ex = mv;
        let newdict;
        if (props.meter[0] == 2) {
            newdict = { m24_ex: cur_st };
        }
        else {
            newdict = { m34_ex: cur_st };
        }
        ;
        props.sfn(newdict);
        use_st(cur_st);
    };
    const numex_render = () => {
        let cur_id = `${meter_str}-numex`;
        let cur_id2 = `${meter_str}-numexsl`;
        return (React.createElement("div", { key: cur_id },
            "Number of Exercises : ",
            cur_st.num_ex,
            React.createElement("br", null),
            React.createElement("input", { key: cur_id2, type: "range", onChange: onchy_sl, min: "1", max: Misc.max_exercises, value: cur_st.num_ex })));
    };
    const getrhybtn_click = () => __awaiter(this, void 0, void 0, function* () {
        let cm = props.meter;
        let df = cur_st.focus;
        let _wd = {};
        let _dkeys = Object.keys(duravail);
        for (let i = 0; i < _dkeys.length; i++) {
            let ckey = _dkeys[i];
            let cavail = duravail[ckey];
            let ctype = ckey;
            let is_focus = df == ctype;
            let cactive = cur_st.active[ctype];
            _wd[ctype] = (cavail && cactive) || is_focus;
        }
        ;
        //let wd: Record<DurType, boolean> = cur_st.active;
        let wd = _wd;
        let has_active = false;
        let num_ex = cur_st.num_ex;
        for (let i = 0; i < durkeys.length; i++) {
            let ck = durkeys[i];
            let cb = cur_st.active[ck];
            if (cb == true) {
                has_active = true;
                break;
            }
            ;
        }
        ;
        if (has_active == true) {
            let did_load = yield window.eApi.gen_rhythm(cm, df, wd, num_ex);
            if (did_load == true) {
                props.sfn({ ex_idx: 0 });
                props.sfn({ view: Misc.ItsViewType.Perform });
            }
            ;
        }
        else {
            props.statfn("Please select a duration to include");
        }
        ;
        //console.log("clicked");
    });
    const btn_render = () => {
        let cur_id = `${meter_str}-getrhybtn`;
        return (React.createElement("button", { className: "actbtn", type: "button", id: cur_id, onClick: getrhybtn_click }, "Get Exercises"));
    };
    const get_bg = (x) => {
        let ret = "belowthresh";
        if (x < Misc.skill_thresh) {
            ret = "belowthresh";
        }
        else if (x < 99.9) {
            ret = "abovethresh";
        }
        else {
            ret = "atmax";
        }
        ;
        return ret;
    };
    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect(() => {
        //let duravail: {[z in string]: boolean} = {} as {[z in string]: boolean};
        let ckeys = Object.keys(duravail);
        for (let i = 0; i < ckeys.length; i++) {
            let ckey = ckeys[i];
            let cur_avail = duravail[ckey];
            let ctype = ckey;
            if (cur_avail == false) {
                cur_st.active[ctype] = false;
                if (cur_st.focus == ctype) {
                    cur_st.focus = Misc.DurKind.qtr;
                    cur_st.active['qtr'] = true;
                }
                ;
                let newdict;
                if (props.meter[0] == 2) {
                    newdict = { m24_ex: cur_st };
                }
                else {
                    newdict = { m34_ex: cur_st };
                }
                ;
                props.sfn(newdict);
                use_st(cur_st);
            }
            ;
        }
        ;
        set_active(cur_st.focus, true);
    }, []);
    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (React.createElement("div", { key: cur_id, id: cur_id, className: "mtrsel_durbank" },
        React.createElement("span", { className: "seltitle" }, meter_title),
        " : ",
        React.createElement("span", { className: get_bg(props.lk.val) },
            props.lk.val.toFixed(1),
            "%"),
        React.createElement("br", null),
        React.createElement("progress", { max: "100", value: props.lk.val }),
        React.createElement("br", null),
        dursel_render(),
        React.createElement("br", null),
        React.createElement("span", null, "Select durations to include:"),
        React.createElement("br", null),
        Misc.dur_ordered.map((x) => durlistentry_render(x)),
        React.createElement("br", null),
        numex_render(),
        React.createElement("br", null),
        btn_render()));
}
export function SelBank(props) {
    const avail_durs = Object.values(Misc.DurKind);
    return (React.createElement("div", { id: "selbank" },
        React.createElement(MeterBank, { key: "m24-sel", statfn: props.statfn, meter: [2, 4], prefs: props.m24, lk: props.lk.m24, sfn: props.sfn }),
        React.createElement(MeterBank, { key: "m34-sel", statfn: props.statfn, meter: [3, 4], prefs: props.m34, lk: props.lk.m34, sfn: props.sfn }),
        React.createElement("br", null),
        React.createElement("div", { id: "instructions" },
            React.createElement("span", null,
                "See ",
                React.createElement("b", null, "Settings"),
                " to adjust settings"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("span", null,
                "See ",
                React.createElement("b", null, "Progress"),
                " to view overall progress"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("span", null,
                "See ",
                React.createElement("b", null, "Info"),
                " screen for help"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("span", null,
                "Skill threshold: ",
                Misc.skill_thresh,
                "%"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("span", null,
                "Number of pattern instances to mastery: ",
                Misc.num_to_master))));
}
