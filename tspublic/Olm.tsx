/// <reference path="./global.d.ts" />

import React, {useState,Component} from 'react';
import * as Misc from './misc';

enum OlmViewType {
    overview = "overview",
    m24 = "m24",
    m34 = "m34",
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
type OlmView = keyof typeof OlmViewType;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html


interface OlmState {
   view: OlmViewType; 
}

const view_str: any = {overview: "Overall", timing: "Timing", m24: "2/4 Meter", m34: "3/4 Meter", m44: "4/4 Meter"};
const offbeat_str: any = {o0: "Downbeat", o1: "Second Subdivision", o2: "Third Subdivision", o3: "Fourth Subdivision"};

const durname_str: any = {qtr: "Quarter Notes", ei: "Eighth Notes", eit: "Eighth-note Triplets", steen: "Sixteenth Notes"};



export function OlmMeter(props: any) : React.ReactElement {
    return (

        <div id={`olm-${props.curmeter}`}>
            <OlmSkillView min="0" max="100" key={`${props.curmeter}-overall`} name="Overall Progress" val={props.cur.val} />
            <br />
        <DursView key={`${props.curmeter}-durs`} par={props.curmeter} durs={props.cur.durs} />
        </div>
    );
}



export function OlmOverall(props: any) : React.ReactElement {
    return (
    <div id="olm-overall">
            <OlmSkillView min="0" max="100" key="olm-overall-val" name="Overall Progress" val={props.val} />
            <br />

        <DursView key="overall-durs" par="Overall" durs={props.durs} />
        </div>
    );
}

export function DursView(props: any) : React.ReactElement {
    const dur_types: string[] = Object.keys(props.durs);
    const par = props.par;
    const render_dur = (k: string, y: number) => {
        const ckey: string = `${par}-${k}`;
        let cur = props.durs[k];
        let cname: string = durname_str[k];
        let ckind = cur.kind;
        let cpatt = cur.patt;
        let cval = cur.val;
        return(
            <div key={ckey} className="durtype_view">
            <span className="olmdurtitle">{cname}</span>
            <br />
            <DurView par={par} key={ckey} val={cval} name={cname} kind={ckind} patt={cpatt} />
            </div>
        );
    };

    return (
        <div className="durbank_view">
        {

        dur_types.map(
                (x: string, y: number) => render_dur(x,y))
        }
        </div>
    );
}

export function DurView(props:any) : React.ReactElement {
    const dur_kinds: string[]  = Object.keys(props.kind);
    const dur_patts: string[]  = Object.keys(props.patt);
    const par: string = props.par;

    const render_kind = (k: string, y: number) => {
        let cval: number = props.kind[k];
        let cname: string = offbeat_str[k];
        let ckey: string = `${par}-${props.name}-${cname}`;
        return (
            <div key={ckey} className="durkind_iter">
            <OlmSkillView min="0" max="100" key={ckey} kind={k} name={cname} val={cval} />
            <br />
            </div>
        );
    };


    const render_patt = (k: string, y: number) => {
        let cval: number = props.patt[k];
        let cname: string = Misc.change_rstr(k);
        let ckind: string = Misc.get_pkind(k);
        let ckey: string = `${par}-${props.name}-${cname}`;
        return (
            <div key={ckey} className="durpatt_iter">
            <OlmSkillView min="0" max="100" kind={ckind} key={ckey} name={cname} val={cval} />
            <br />
            </div>
        );
    };


    let ckey: string = `${par}-${props.kind}-${props.patt}`;
    return (
        <div key={ckey} className="olmdurview">
        <OlmSkillView min="0" max="100" key={`${par}-${props.name}-overall`}name="Overall" val={props.val} />
        <br />
        {
            
        dur_kinds.map(
                (x: string, y: number) => render_kind(x,y))
        }
        <br />
        {

        dur_patts.map(
                (x: string, y: number) => render_patt(x,y))
        }

        
        </div>
    );

}

export function OlmSkillView(props:any) : React.ReactElement {

    const get_val = (x: number) => {
        let cmin: number = props.min;
        let cmax: number = props.max;
    
        let mapped: number = (x-cmin) * (100./(cmax-cmin));
        return mapped;
    };

    const get_bg = (x: number) => {
        let ret: string = "belowthresh";
        if ( x < Misc.skill_thresh) {
            ret = "belowthresh";
        }
        else if (x < 99.9) {
            ret = "abovethresh";
        }
        else {
            ret = "atmax";
        };
        return ret
    };

    return (
        <div className="olmskillview">
            <span className={props.kind}>{props.name}</span> : <span className={get_bg(props.val)}> {props.val.toFixed(1)}% </span>
            <br />
            <progress max="100" value={get_val(props.val)}></progress>
        </div>
    )

}


export function Olm(props:any) : React.ReactElement {    
    let olm_st = {view: OlmViewType.overview};
    const [cur_olm, use_olm] = useState<OlmState>(olm_st);

    const olm_views = Object.values(OlmViewType);

    const olmview_click = (x: OlmViewType) => {
        let newview = {view: x};
        use_olm(newview);
    };


    const olm_viewselect = (x: OlmViewType, idx: number) => {
        let cstr: string = `${x}-btn`;
        return (
            <button className="subviewsel" key={cstr} type="button" id={cstr} onClick={() => olmview_click(x)}>
                {view_str[x]}
                </button>
        );
    };


    const olm_visibility = (x: OlmViewType) => {
        let ret: string;
        if(cur_olm.view == x) {
            ret = 'bigview2';
        }
        else {
        ret = 'noview';
        };

        return ret;
    };


        return (
            <div className="olm_main">

            <div className="subheader" id="olm_header">
                <span className="subtitle">{view_str[cur_olm.view]}</span>
                <br/ >
                { olm_views.map(
                (x: OlmViewType, y: number) => olm_viewselect(x,y))}
            </div>

                {(cur_olm.view == OlmViewType.m24) ? 
                (<div id="m24"
                    className={olm_visibility(OlmViewType.m24)}>

                    <OlmMeter curmeter="m24" cur={props.lk.m24} />
                    </div> ) : null}

                {(cur_olm.view == OlmViewType.m34) ? 
                (<div id="m34"
                    className={olm_visibility(OlmViewType.m34)}>

                    <OlmMeter curmeter="m34" cur={props.lk.m34} />
                    </div> ) : null}

   {(cur_olm.view == OlmViewType.overview) ? 
                (<div id="olm_overview"
                    className={olm_visibility(OlmViewType.overview)}>
                    <OlmOverall val={props.lk.val} durs={props.lk.overall} />
                    </div> ) : null}


            </div>
            
        );

}
