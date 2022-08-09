/// <reference path="./global.d.ts" />
import React, { useState } from 'react';
import * as Misc from './misc';
var OlmViewType;
(function (OlmViewType) {
    OlmViewType["overview"] = "overview";
    OlmViewType["m24"] = "m24";
    OlmViewType["m34"] = "m34";
})(OlmViewType || (OlmViewType = {}));
const view_str = { overview: "Overall", timing: "Timing", m24: "2/4 Meter", m34: "3/4 Meter", m44: "4/4 Meter" };
const offbeat_str = { o0: "Downbeat", o1: "Second Subdivision", o2: "Third Subdivision", o3: "Fourth Subdivision" };
const durname_str = { qtr: "Quarter Notes", ei: "Eighth Notes", eit: "Eighth-note Triplets", steen: "Sixteenth Notes" };
export function OlmMeter(props) {
    return (React.createElement("div", { id: `olm-${props.curmeter}` },
        React.createElement(OlmSkillView, { min: "0", max: "100", key: `${props.curmeter}-overall`, name: "Overall Progress", val: props.cur.val }),
        React.createElement("br", null),
        React.createElement(DursView, { key: `${props.curmeter}-durs`, par: props.curmeter, durs: props.cur.durs })));
}
export function OlmOverall(props) {
    return (React.createElement("div", { id: "olm-overall" },
        React.createElement(OlmSkillView, { min: "0", max: "100", key: "olm-overall-val", name: "Overall Progress", val: props.val }),
        React.createElement("br", null),
        React.createElement(DursView, { key: "overall-durs", par: "Overall", durs: props.durs })));
}
export function DursView(props) {
    const dur_types = Object.keys(props.durs);
    const par = props.par;
    const render_dur = (k, y) => {
        const ckey = `${par}-${k}`;
        let cur = props.durs[k];
        let cname = durname_str[k];
        let ckind = cur.kind;
        let cpatt = cur.patt;
        let cval = cur.val;
        return (React.createElement("div", { key: ckey, className: "durtype_view" },
            React.createElement("span", { className: "olmdurtitle" }, cname),
            React.createElement("br", null),
            React.createElement(DurView, { par: par, key: ckey, val: cval, name: cname, kind: ckind, patt: cpatt })));
    };
    return (React.createElement("div", { className: "durbank_view" }, dur_types.map((x, y) => render_dur(x, y))));
}
export function DurView(props) {
    const dur_kinds = Object.keys(props.kind);
    const dur_patts = Object.keys(props.patt);
    const par = props.par;
    const render_kind = (k, y) => {
        let cval = props.kind[k];
        let cname = offbeat_str[k];
        let ckey = `${par}-${props.name}-${cname}`;
        return (React.createElement("div", { key: ckey, className: "durkind_iter" },
            React.createElement(OlmSkillView, { min: "0", max: "100", key: ckey, kind: k, name: cname, val: cval }),
            React.createElement("br", null)));
    };
    const render_patt = (k, y) => {
        let cval = props.patt[k];
        let cname = Misc.change_rstr(k);
        let ckind = Misc.get_pkind(k);
        let ckey = `${par}-${props.name}-${cname}`;
        return (React.createElement("div", { key: ckey, className: "durpatt_iter" },
            React.createElement(OlmSkillView, { min: "0", max: "100", kind: ckind, key: ckey, name: cname, val: cval }),
            React.createElement("br", null)));
    };
    let ckey = `${par}-${props.kind}-${props.patt}`;
    return (React.createElement("div", { key: ckey, className: "olmdurview" },
        React.createElement(OlmSkillView, { min: "0", max: "100", key: `${par}-${props.name}-overall`, name: "Overall", val: props.val }),
        React.createElement("br", null),
        dur_kinds.map((x, y) => render_kind(x, y)),
        React.createElement("br", null),
        dur_patts.map((x, y) => render_patt(x, y))));
}
export function OlmSkillView(props) {
    const get_val = (x) => {
        let cmin = props.min;
        let cmax = props.max;
        let mapped = (x - cmin) * (100. / (cmax - cmin));
        return mapped;
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
    return (React.createElement("div", { className: "olmskillview" },
        React.createElement("span", { className: props.kind }, props.name),
        " : ",
        React.createElement("span", { className: get_bg(props.val) },
            " ",
            props.val.toFixed(1),
            "% "),
        React.createElement("br", null),
        React.createElement("progress", { max: "100", value: get_val(props.val) })));
}
export function Olm(props) {
    let olm_st = { view: OlmViewType.overview };
    const [cur_olm, use_olm] = useState(olm_st);
    const olm_views = Object.values(OlmViewType);
    const olmview_click = (x) => {
        let newview = { view: x };
        use_olm(newview);
    };
    const olm_viewselect = (x, idx) => {
        let cstr = `${x}-btn`;
        return (React.createElement("button", { className: "subviewsel", key: cstr, type: "button", id: cstr, onClick: () => olmview_click(x) }, view_str[x]));
    };
    const olm_visibility = (x) => {
        let ret;
        if (cur_olm.view == x) {
            ret = 'bigview2';
        }
        else {
            ret = 'noview';
        }
        ;
        return ret;
    };
    return (React.createElement("div", { className: "olm_main" },
        React.createElement("div", { className: "subheader", id: "olm_header" },
            React.createElement("span", { className: "subtitle" }, view_str[cur_olm.view]),
            React.createElement("br", null),
            olm_views.map((x, y) => olm_viewselect(x, y))),
        (cur_olm.view == OlmViewType.m24) ?
            (React.createElement("div", { id: "m24", className: olm_visibility(OlmViewType.m24) },
                React.createElement(OlmMeter, { curmeter: "m24", cur: props.lk.m24 }))) : null,
        (cur_olm.view == OlmViewType.m34) ?
            (React.createElement("div", { id: "m34", className: olm_visibility(OlmViewType.m34) },
                React.createElement(OlmMeter, { curmeter: "m34", cur: props.lk.m34 }))) : null,
        (cur_olm.view == OlmViewType.overview) ?
            (React.createElement("div", { id: "olm_overview", className: olm_visibility(OlmViewType.overview) },
                React.createElement(OlmOverall, { val: props.lk.val, durs: props.lk.overall }))) : null));
}
