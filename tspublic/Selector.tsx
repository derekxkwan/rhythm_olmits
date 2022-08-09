/// <reference path="./global.d.ts" />

import React, {useEffect, useState,Component} from 'react';

import * as Misc from './misc';

export function MeterBank(props:any) : React.ReactElement {
    const [cur_st, use_st] = useState<Misc.MeterPref>(props.prefs);
    let meter_str: string = `${props.meter[0]}-${props.meter[1]}`;
    let meter_title: string = `${props.meter[0]}/${props.meter[1]} Meter`;
    let cur_id: string = `${meter_str}-bank`;

    let lkdurs = props.lk.durs;
    let durkeys: string[] = Object.keys(lkdurs);
    let dropdurs: [string, string][] = [];
    let durvals: {[z in string]: number} = {} as {[z in string]: number};
    let duravail: {[z in string]: boolean} = {} as {[z in string]: boolean};
    for(let i: number = 0; i < durkeys.length; i++) {
        let ckey: string = durkeys[i];
        let cval: number = lkdurs[ckey].val;
        durvals[ckey] = cval;
    };

    for(let i: number = 0; i < Misc.dur_ordered.length; i++) {
        let ckey: string = Misc.dur_ordered[i] as string;
        let cur_bool: boolean = false;
        if(ckey == Misc.dur_ordered[0]) {
            cur_bool = true;
        }
        else if (i > 0) {
            let prevkey: string = Misc.dur_ordered[i-1] as string;
            if(durvals[prevkey] >= Misc.skill_thresh) {
                cur_bool = true;
            }
            else {
                cur_bool = false;
            };
        };

        if(cur_bool == true) {
            duravail[ckey] = true;
            dropdurs.push([ckey, Misc.dur_prettylong[ckey]]);
        }
        else {
            let ctype: Misc.DurType = ckey as Misc.DurType;
            duravail[ckey] = false;
            cur_st.active[ctype] = false;
                if(cur_st.focus == ctype) {
                    cur_st.focus = Misc.DurKind.qtr;
                    cur_st.active['qtr'] = true;
                                       
                };
        };

    };
    

    const onchy_sel : React.ChangeEventHandler<HTMLSelectElement>  =  (evt: React.ChangeEvent) => {
        let cur_elt: HTMLSelectElement = evt.target as HTMLSelectElement;
        let mv: string = cur_elt.value;
        cur_st.focus = mv as Misc.DurType;
        let newdict;
        if(props.meter[0] == 2) {
            newdict = {m24_ex: cur_st};
        }
        else {
            newdict = {m34_ex: cur_st};
        };
        props.sfn(newdict);
        set_active(mv as Misc.DurType, true);
        //console.log(ret);
        use_st(cur_st);
    };
    const dursel_render = () => {
        let cstr: string = `${meter_str}-sel`;
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
    return(
        <div key={cstr} id={cstr}>
            <label htmlFor={cstr}> Select focus:</label>
            <select id={cstr} value={cur_st.focus} onChange={onchy_sel}>
            {dropdurs.map((x: [string, string], y: number) => {
                let sval = x[0];
                let sname = x[1];
                return (
                <option key={`${meter_str}-sname`} value={sval}>{sname}</option>
                );
            })
            }
            </select>
        </div>
        );
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
    }


    const set_active = (x: DurType, y: boolean) => {
        cur_st.active[x] = y;
        let newdict;
        if(props.meter[0] == 2) {
            newdict = {m24_ex: cur_st};
        }
        else {
            newdict = {m34_ex: cur_st};
        };
        props.sfn(newdict);
        //console.log(ret);
        use_st(cur_st);
    };

    const onchy_tgl =  (x: DurType, y: boolean, evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: boolean = cur_elt.checked;
        if (y == false) {
            set_active(x, false);
            cur_elt.checked = false;
        }
        else {
            set_active(x,mv);
        };
    };

    
    const durtgl_render = (x: DurType) => {
        
        let cur_id: string = `${meter_str}-${x}-tgl`;
        let cur_avail: boolean = duravail[x];
        let cur_val: boolean = cur_st.active[x];
        let is_focus: boolean = x == cur_st.focus;
        return (
             <input key={cur_id} type="checkbox" id={cur_id} onChange={(evt: React.ChangeEvent) => onchy_tgl(x, cur_avail, evt)} checked={cur_avail && (cur_val || is_focus)} disabled={(!cur_avail) || is_focus} />
             );

    };

    const durlistentry_render = (x: DurType) => {

        let pstr: string = Misc.dur_prettylong[x];
        let cur_id: string = `${meter_str}-${x}`;
        let cval: number = durvals[x];
        return(
            <div key={cur_id} id={cur_id}>

               {durtgl_render(x)} {pstr}: <span className={get_bg(cval)}>{cval.toFixed(1)}%</span>
                <br />
                <progress max="100" value={cval}></progress>
            </div>
        );
    
    };


    const onchy_sl : React.ChangeEventHandler<HTMLInputElement>  =  (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: number = cur_elt.valueAsNumber;
        cur_st.num_ex = mv;
        let newdict;
        if(props.meter[0] == 2) {
            newdict = {m24_ex: cur_st};
        }
        else {
            newdict = {m34_ex: cur_st};
        };
        props.sfn(newdict);
        use_st(cur_st);
        };



    const numex_render = () => {
        
        let cur_id: string = `${meter_str}-numex`;
        let cur_id2: string = `${meter_str}-numexsl`;
        return (
        <div key={cur_id}>
        Number of Exercises : {cur_st.num_ex}
        <br />
        <input key={cur_id2} type="range" onChange={onchy_sl} min="1" max={Misc.max_exercises} value={cur_st.num_ex} />
        </div>
        )

    };


    const getrhybtn_click = async () => {
        let cm: RhythmMeter = props.meter;
        let df: DurType = cur_st.focus;
        let _wd: {[z in DurType]: boolean} = {} as {[z in DurType]: boolean};
        let _dkeys = Object.keys(duravail);
        for(let i: number = 0; i < _dkeys.length; i++) {
            let ckey: string = _dkeys[i];
            let cavail: boolean = duravail[ckey];
            let ctype: DurType = ckey as DurType;
            let is_focus: boolean = df == ctype;
            let cactive: boolean = cur_st.active[ctype];
            _wd[ctype] = (cavail && cactive) || is_focus;
        };

        //let wd: Record<DurType, boolean> = cur_st.active;
        let wd: Record<DurType, boolean> = _wd as Record<DurType, boolean>;
        let has_active: boolean = false;
        let num_ex: number = cur_st.num_ex;
        for(let i: number = 0; i < durkeys.length; i++) {
            let ck = durkeys[i];
            let cb: boolean = cur_st.active[ck as DurType];
            if(cb == true) {
                has_active = true;
                break;
            };
        };
        if (has_active == true){
            let did_load: boolean = await window.eApi.gen_rhythm(cm, df, wd, num_ex);
            if(did_load == true) {
                props.sfn({ex_idx: 0});
                props.sfn({view: Misc.ItsViewType.Perform});
                };
        }
        else {
            props.statfn("Please select a duration to include");
        };
        //console.log("clicked");
    };

       const btn_render = () => {
        let cur_id: string = `${meter_str}-getrhybtn`;
        return (
            <button className="actbtn" type="button" id={cur_id} onClick={getrhybtn_click}>
                Get Exercises
                </button>
        );
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


    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect( () => {
        //let duravail: {[z in string]: boolean} = {} as {[z in string]: boolean};
        let ckeys: string[] = Object.keys(duravail);
        for(let i = 0; i < ckeys.length; i++) {
            let ckey: string = ckeys[i];
            let cur_avail: boolean = duravail[ckey];
            let ctype: Misc.DurType = ckey as Misc.DurType;
            if (cur_avail == false) {
                cur_st.active[ctype] = false;
                if(cur_st.focus == ctype) {
                    cur_st.focus = Misc.DurKind.qtr;
                    cur_st.active['qtr'] = true;
                                       
                };
              let newdict;
                if(props.meter[0] == 2) {
                    newdict = {m24_ex: cur_st};
                }
                else {
                    newdict = {m34_ex: cur_st};
                };
                props.sfn(newdict);
                use_st(cur_st);
            };
        };

        set_active(cur_st.focus, true);
                   }, []);

    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
    <div key={cur_id} id={cur_id} className="mtrsel_durbank" >
        <span className="seltitle">{meter_title}</span> : <span className={get_bg(props.lk.val)}>{props.lk.val.toFixed(1)}%</span>
        <br />
            <progress max="100" value={props.lk.val}></progress>
            <br />
            {
                dursel_render()
            }
            <br />
            <span>Select durations to include:</span>
            <br />
            {
                Misc.dur_ordered.map((x: DurType) => durlistentry_render(x))
            }
            <br />
            { numex_render() }
            <br />
            { btn_render() }
            </div>

 
    );
}

export function SelBank(props:any) : React.ReactElement { 
    const avail_durs = Object.values(Misc.DurKind);
    return (
        <div id="selbank">
        <MeterBank key="m24-sel" statfn={props.statfn} meter={[2,4]} prefs={props.m24} lk={props.lk.m24} sfn={props.sfn}/>
        <MeterBank key="m34-sel" statfn={props.statfn} meter={[3,4]} prefs={props.m34} lk={props.lk.m34} sfn={props.sfn}/>

        <br/>
        <div id="instructions">
        <span>See <b>Settings</b> to adjust settings</span>
        < br />
        < br />
        <span>See <b>Progress</b> to view overall progress</span>
        < br />
        < br />
        <span>See <b>Info</b> screen for help</span>
        < br />
        < br />
        <span>Skill threshold: {Misc.skill_thresh}%</span>
        < br />
        < br />
        <span>Number of pattern instances to mastery: {Misc.num_to_master}</span>
        </div>
        </div>
    );
}
