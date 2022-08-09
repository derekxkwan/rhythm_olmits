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
import React, { useCallback, useRef, useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import * as Misc from './misc';
import { SliderBank } from './SliderBank';
import { ScoreDisplay } from './RhythmNotation';
const cw = 775;
const ch = 150;
const num_tries = 3;
function NumListIdc(props) {
    const [cur_nl, use_nl] = useState(props.nlidc);
    const [cur_i, use_i] = useState({ init: false });
    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect(() => {
        if (cur_i.init == false) {
            //window.eApi.remove_channel(cur_nl.id);
            cur_nl.fn((event, val) => {
                let cur_str = "";
                if (val.length > 0) {
                    let str_list = val.map(x => x.toString());
                    cur_str = str_list.join("; ");
                }
                ;
                let newdict = { value: cur_str };
                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret = Object.assign(Object.assign({}, cur_nl), newdict);
                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                use_nl(ret);
            });
            use_i({ init: true });
        }
        ;
        return () => {
            window.eApi.remove_channel(cur_nl.id);
        };
    }, []);
    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (React.createElement("span", { key: cur_nl.id, id: cur_nl.id },
        cur_nl.name,
        " : ",
        cur_nl.value));
}
function StrListIdc(props) {
    const [cur_strl, use_strl] = useState(props.strlidc);
    const [cur_i, use_i] = useState({ init: false });
    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect(() => {
        if (cur_i.init == false) {
            //window.eApi.remove_channel(cur_strl.id);
            cur_strl.fn((event, val) => {
                let cur_str = "";
                if (val.length > 0) {
                    cur_str = val.join(", ");
                }
                ;
                let newdict = { value: cur_str };
                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret = Object.assign(Object.assign({}, cur_strl), newdict);
                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                use_strl(ret);
            });
            use_i({ init: true });
        }
        ;
        return () => {
            window.eApi.remove_channel(cur_strl.id);
        };
    }, []);
    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (React.createElement("span", { key: cur_strl.id, id: cur_strl.id },
        cur_strl.name,
        " : ",
        cur_strl.value));
}
function NumIdc(props) {
    const [cur_ni, use_ni] = useState(props.numidc);
    const [cur_i, use_i] = useState({ init: false });
    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect(() => {
        if (cur_i.init == false) {
            //window.eApi.remove_channel(cur_ni.id);
            cur_ni.fn((event, val) => {
                //console.log(val);
                let newdict = { value: val };
                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret = Object.assign(Object.assign({}, cur_ni), newdict);
                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                use_ni(ret);
                //console.log("ok");
                if (cur_ni.flashdur > 0) {
                    let newdict1 = { value: val, bclr: cur_ni.bclr2 };
                    //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    let newret1 = Object.assign(Object.assign({}, cur_ni), newdict1);
                    //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    use_ni(newret1);
                    setTimeout(() => {
                        let newdict2 = { value: val, bclr: cur_ni.bclr1 };
                        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                        let newret2 = Object.assign(Object.assign({}, cur_ni), newdict2);
                        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                        use_ni(newret2);
                    }, cur_ni.flashdur);
                }
                ;
            });
            use_i({ init: true });
        }
        ;
        return () => {
            use_i({ init: false });
            window.eApi.remove_channel(cur_ni.id);
        };
    }, []);
    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (React.createElement("span", { id: `${cur_ni.id}-name` },
        " ",
        cur_ni.name,
        " :",
        React.createElement("span", { id: `${cur_ni.id}-val`, style: { backgroundColor: cur_ni.bclr } },
            " ",
            cur_ni.value,
            " ")));
}
export function NumIdcBank(props) {
    return (React.createElement("div", { className: "numidcbank" }, Object.keys(props.numidcs).map((k) => {
        let ckey = `${k}-nidc`;
        return (React.createElement("div", { key: ckey, className: "numidc" },
            React.createElement(NumIdc, { key: ckey, numidc: props.numidcs[k] }),
            React.createElement("br", null)));
    })));
}
export function PerfEx(props) {
    const [cur_rtgl, use_rtgl] = useState(props.rectgl);
    const [cur_ptgl, use_ptgl] = useState(props.playtgl);
    const [cur_mtgl, use_mtgl] = useState(props.mdtgl);
    const [cur_ktgl, use_ktgl] = useState(props.kybdtgl);
    const [cur_kclr, use_kclr] = useState(Misc.bclr);
    const [cur_try, use_try] = useState(num_tries);
    const [cur_ren, use_ren] = useState(true);
    const [cur_sd, use_sd] = useState({ init: false, sd: null });
    const cref = useRef(null);
    const kybd_key = useCallback((evt) => {
        // BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        if (evt.key == "Shift" || evt.code == "ShiftLeft" || evt.code == "ShiftRight") {
            use_kclr(Misc.flashclr);
            window.eApi.send_key(true);
            setTimeout(() => {
                use_kclr(Misc.bclr);
            }, 75);
        }
        else if (evt.key == "\\" || evt.code == "Backslash") {
            window.eApi.send_dkey(true);
        }
        ;
        // END CODE FROM https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    }, []);
    const k_onchy = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.checked;
        if (mv == true) {
            window.addEventListener("keydown", kybd_key);
        }
        else {
            window.removeEventListener("keydown", kybd_key);
        }
        ;
        props.sfn({ kybd: mv });
        cur_ktgl.send_fn(mv);
        let newdict = { value: mv };
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = Object.assign(Object.assign({}, cur_ktgl), newdict);
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_ktgl(ret);
    };
    const kybd_evtclean = () => {
        if (true == true) {
            console.log("remove key");
            window.removeEventListener("keydown", kybd_key);
        }
        ;
    };
    const kybd_evtest = () => {
        if (cur_ktgl.value == true) {
            console.log("add key");
            window.addEventListener("keydown", kybd_key);
        }
        ;
    };
    const draw_ex = (x) => {
        if (cref.current != null) {
            let new_dict = { sd: null };
            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            let ret = Object.assign(Object.assign({}, cur_sd), new_dict);
            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            use_sd(ret);
            let cnv = cref.current;
            let cur_disp = new ScoreDisplay(cnv, cw, ch);
            cur_disp.display_rhythm(x);
            let new_dict1 = { sd: cur_disp };
            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            let ret1 = Object.assign(Object.assign({}, cur_sd), new_dict1);
            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            use_sd(ret1);
        }
        ;
    };
    const get_rhythm = (x) => __awaiter(this, void 0, void 0, function* () {
        console.log("getting rhythm", x);
        let cur_rhy = yield window.eApi.get_rhythm(x);
        if (cur_rhy.length > 0) {
            console.log("drawing rhythm");
            props.sfn({ cur_ex: cur_rhy });
            props.sfn({ ex_idx: x });
            draw_ex(cur_rhy[0]);
        }
        else {
            console.log("exiting perf mode");
            window.eApi.inited(true);
            props.sfn({ ex_idx: 0 });
            props.sfn({ cur_ex: [] });
            let new_dict = { sd: null };
            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            let ret = Object.assign(Object.assign({}, cur_sd), new_dict);
            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            use_sd(ret);
            props.sfn({ view: Misc.ItsViewType.Selector });
        }
        ;
    });
    const next_rhythm = () => __awaiter(this, void 0, void 0, function* () {
        let next_idx = props.ex_idx + 1;
        get_rhythm(next_idx);
        use_try(num_tries);
    });
    const p_onchy = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.checked;
        cur_ptgl.send_fn2(cur_ptgl.send_val2);
        cur_ptgl.send_fn(mv);
        let newdict1 = { value: mv };
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = Object.assign(Object.assign({}, cur_ptgl), newdict1);
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_ptgl(ret);
    };
    const r_onchy = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.checked;
        cur_rtgl.send_fn2(cur_rtgl.send_val2);
        cur_rtgl.send_fn(mv);
        let newdict1 = { value: mv };
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = Object.assign(Object.assign({}, cur_rtgl), newdict1);
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        if (mv == true) {
            use_try(cur_try - 1);
        }
        ;
        use_rtgl(ret);
    };
    const m_onchy = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.checked;
        cur_mtgl.send_fn(mv);
        let newdict1 = { value: mv };
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = Object.assign(Object.assign({}, cur_mtgl), newdict1);
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_mtgl(ret);
    };
    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect(() => {
        if (cur_sd.init == false) {
            cur_ptgl.recv_fn((event, val) => {
                if (val == false) {
                    let newdict1 = { value: val };
                    //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    let ret = Object.assign(Object.assign({}, cur_ptgl), newdict1);
                    //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    let newdict2 = { value: val };
                    //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    let ret2 = Object.assign(Object.assign({}, cur_rtgl), newdict2);
                    //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    use_ptgl(ret);
                    use_rtgl(ret2);
                }
                ;
            });
            kybd_evtest();
            let newdict3 = { init: true };
            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            let ret3 = Object.assign(Object.assign({}, cur_sd), newdict3);
            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            use_sd(ret3);
            get_rhythm(0);
        }
        ;
        return () => {
            use_sd({ init: false, sd: null });
            //console.log("cleanup");
            kybd_evtclean();
            window.eApi.remove_channel(cur_ptgl.id);
        };
    }, []);
    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (React.createElement("div", { className: "perfex" },
        React.createElement("button", { className: "actbtn", type: "button", id: "getbtn", onClick: next_rhythm }, "Accept Performance and Progress"),
        React.createElement("br", null),
        cur_mtgl.name,
        ": ",
        React.createElement("input", { key: cur_mtgl.name, type: "checkbox", id: "mtgl", onChange: m_onchy, checked: cur_mtgl.value }),
        React.createElement("br", null),
        cur_ptgl.name,
        ": ",
        React.createElement("input", { key: cur_ptgl.name, type: "checkbox", id: "ptgl", onChange: p_onchy, checked: cur_ptgl.value }),
        React.createElement("br", null),
        cur_rtgl.name,
        ": ",
        React.createElement("input", { key: cur_rtgl.name, type: "checkbox", id: "rtgl", onChange: r_onchy, checked: cur_rtgl.value, disabled: (cur_try <= 0) }),
        React.createElement("br", null),
        React.createElement("span", null,
            "Number of Tries Left: ",
            cur_try),
        React.createElement("br", null),
        React.createElement(NumIdc, { key: props.exleft.id, numidc: props.exleft }),
        React.createElement("canvas", { className: "scoredisp", ref: cref, width: cw, height: ch }),
        cur_ktgl.name,
        ": ",
        React.createElement("input", { key: cur_ktgl.name, type: "checkbox", id: "ktgl", onChange: k_onchy, checked: cur_ktgl.value }),
        "  ",
        React.createElement("span", { style: { backgroundColor: cur_kclr } }, "(flashes with key send)"),
        React.createElement(NumIdcBank, { numidcs: props.numidcs }),
        React.createElement(StrListIdc, { strlidc: props.strlidc }),
        React.createElement(SliderBank, { sfn: props.sfn, sliders: props.sliders }),
        React.createElement("br", null),
        React.createElement("span", null,
            "(If using microphone input, ",
            React.createElement("b", null, "use headphones"),
            ")")));
}
