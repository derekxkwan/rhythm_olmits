/// <reference path="./global.d.ts" />

import React, {useEffect, useState} from 'react';
//import ReactDOM from 'react-dom';
import {KeyedSliders, SliderProps, SliderBank} from './SliderBank';

import * as Misc from './misc';
import * as Selector from './Selector';
import * as Perf from './Perf';
import * as Olm from './Olm';
import * as Info from './Info';
//props = immutable, state = mutable

const lk_id: string = "lk";
const status_id: string = "status";
const lkstatus_id: string = "lkstatus";
const clearpref_id: string = "clearpref";
let inited: boolean = false;
const init_view = Misc.ItsViewType.Selector;
const default_user = "default";

export function Its(props:any) : React.ReactElement {    
    const [cur_txt, use_txt] = useState<string>("");
    const [cur_lk, use_lk] = useState<LearnerKnow>(null);
    const [cur_st, use_st] = useState<Misc.ItsState>({
        view: init_view, 
        m24_ex: new Misc.MeterPref(), m34_ex: new Misc.MeterPref(),
        init: false,
        cur_ex: [] as RhythmEx[],
        ex_idx: 0,
        kybd: false,
        debug: false,
        mainvol: 100, clickvol: 100, drumvol: 100, maxvel: 50, bpm: 120, user: default_user});
        
    let viewable = Object.values(Misc.ItsViewType);
    let avail_views = [];
    for (let i = 0; i < viewable.length; i++) {
        if(viewable[i] != Misc.ItsViewType.Perform) {
            avail_views.push(viewable[i]);
        };
    };

    let settings_bank: KeyedSliders = {
        mainvol: {
            id: "mainvol",
            name: "Main Volume",
            val: cur_st.mainvol,
            lo: 0,
            hi: 100,
            fn: window.eApi.set_mainvol
            },
        clickvol: {
            id: "clickvol",
            name: "Metronome Volume",
            val: cur_st.clickvol,
            lo: 0,
            hi: 100,
            fn: window.eApi.set_clickvol
            },
        drumvol: {
            id: "drumvol",
            name: "Rhythm Volume",
            val: cur_st.drumvol,
            lo: 0,
            hi: 100,
            fn: window.eApi.set_drumvol
            }
        };

    let perf_sliders: KeyedSliders = {
        maxvel: {
            id: "maxvel",
            name: "Input Sensitivity (lower = more sensitive)",
            val: cur_st.maxvel,
            lo: 1,
            hi: 150,
            fn: window.eApi.set_maxvel
        },
       tempo: {
            id: "bpm",
            name: "Tempo (BPM)",
            val: cur_st.bpm,
            lo: 40,
            hi: 200,
            fn: window.eApi.set_bpm
       }
    };

    const perf_numidc: Perf.KeyedNumIdc = {
         onvel: {
            id: "vel",
            name: "Detected Input",
            value: 0,
            fn:  window.eApi.on_vel,
            bclr: Misc.bclr,
            flashdur: 75,
            bclr1: Misc.bclr,
            bclr2: Misc.flashclr
         },

         oncount: {
            id: "count",
            name: "Current Count",
            value: 0,
            fn: window.eApi.on_count,
            bclr: Misc.bclr,
            flashdur: 0
         },

         countin: {
            id: "countin",
            name: "Current Count-in",
            value: 0,
            fn: window.eApi.on_countin,
            bclr: Misc.bclr,
            flashdur: 0
         },
         num_mistakes: {
            id: "num_mistakes",
            name: "Number of Beats Wrong",
            value: 0,
            fn: window.eApi.num_mistakes,
            bclr: Misc.bclr,
            flashdur: 0
         }

    };
    const perf_exleft: Perf.NumIndicator = {
            id: "exleft",
            name: "Exercises Left",
            value: 0,
            fn: window.eApi.on_exleft,
            bclr: Misc.bclr,
            flashdur: 0
         };
    const perf_perfidc: Perf.NumListIndicator = {
        id: "perf_list",
        name: "Performance Display",
        value: "",
        fn: window.eApi.perf_list
    };

    const perf_strlidc: Perf.StrListIndicator = {
        id: "cur_mistakes",
        name: "Current Beat Mistakes",
        value: "",
        fn: window.eApi.cur_mistakes
    };


    const viewselect_visibility = (x: Misc.ItsViewType) => {
        let ret: string;
        if(cur_st.view == x) {
            ret = "hidden";
        }
        else {
            ret = "visible";
        };

        return {visibility: ret};
    };

    const view_click = (x: Misc.ItsViewType) => {
        let newview = {view: x};
        if(x == Misc.ItsViewType.Olm) {

                window.eApi.inited(true);
        };
        set_state(newview);
    };

    const render_viewselect = (x: Misc.ItsViewType, idx: number) => {
        let cstr: string = `${x}-btn`;
        return (
            <button className="viewsel" key={cstr} type="button" id={cstr} onClick={() => view_click(x)}>
                {x}
                </button>
        );
    };


    const panel_visibility = (x: Misc.ItsViewType) => {
        let ret: string;
        if(cur_st.view == x) {
            ret = 'bigview';
        }
        else {
        ret = 'noview';
        };

        return ret;
    };
    const debug_tgl: Perf.BoolSender = {
       name: "Debug",
       value: cur_st.debug,
       send_fn: window.eApi.send_debug
    };


    const md_tgl: Perf.BoolSender = {
       name: "Metronome During Playback/Recording",
       value: true,
       send_fn: window.eApi.send_metroduring
    };


    const kybd_tgl: Perf.BoolSender = {
       name: "Use Shift Keys Instead of Microphone",
       value: cur_st.kybd,
       send_fn: window.eApi.send_kybd_tgl
    };


    const play_tgl: Perf.BoolSender = {
       name: "Play Back Rhythm",
       value: false,
       send_fn: window.eApi.send_start,
       send_fn2: window.eApi.send_playrec,
       recv_fn: window.eApi.get_start,
       send_val2: true,
       id: "start"
    };


    const rec_tgl: Perf.BoolSender = {
       name: "Record Rhythm Performance",
       value: false,
       send_fn: window.eApi.send_start,
       send_fn2: window.eApi.send_playrec,
       recv_fn: window.eApi.get_start,
       send_val2: false,
       id: "start"
    };

    const set_state = (x: any) => {

        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = {...cur_st, ...x};
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_st(ret);
    };

  const debug_onchy: React.ChangeEventHandler<HTMLInputElement>  =  (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: boolean = cur_elt.checked;
        debug_tgl.send_fn(mv);
        
        let newdict1 = {debug: mv};
        set_state(newdict1);
    };



    const userchange : React.ChangeEventHandler<HTMLInputElement>  =  (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: string = cur_elt.value;
        let newdict = {user: mv};
        set_state(newdict);
        }
     
    const render_lkuserfield = () => {
        // BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
        return (
                <div id="lkuser">
                <label htmlFor="userlk">User (no spaces):</label>
                <input type="text" id="userlk" onChange={userchange} value={cur_st.user}/>
                </div>
                );
        // END CODE FROM https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
    }
    
    const save_lk = () => {

        window.eApi.save_lk(cur_st.user);
    };
    
    const load_lk = () => {

        window.eApi.load_lk(cur_st.user);
    };


    const render_lkmanage = () => {
        return (
            <div id="lk-manage">
                {render_lkuserfield()}
                <div id="lk-btn">
                <button className="minactbtn" type="button" id="loadlk-btn" onClick={load_lk}> Load User 
                </button>

                <button className="minactbtn" type="button" id="savelk-btn" onClick={save_lk}> Save User 
                </button>
                </div>
                </div>
                    );

    };
   
   const set_status = (x: string) => {
        use_txt(x);
   };

    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect( () => {
        if(cur_st.init == false) {
            window.eApi.lk((event: Event, val: LearnerKnow) => {
                        if(val != null) {
                            use_lk(val);
                        };
                });
            window.eApi.on_status((event: Event, val: string) => {
                        use_txt(val);
                        //let newdict = {status: val};
                        //set_state(newdict);
                });

            window.eApi.lkstatus((event: Event, val: [LearnerKnow, string]) => {
                    let cur_lk = val[0];
                    let cur_status = val[1];
                        //let newdict = {status: cur_status};
                        use_txt(cur_status);
                        //set_state(newdict);
                        use_lk(cur_lk);
                });
            window.eApi.on_clearpref((event: Event, val: boolean) => {
                let nd1 = {m24_ex: new Misc.MeterPref()};
                set_state(nd1);
                let nd2 = {m34_ex: new Misc.MeterPref()};
                set_state(nd2);
            });

                let newdict1 = {init: true};
                //console.log("effecting");
                window.eApi.inited(true);
                set_state(newdict1);
      

        };
        return () => {
            //console.log("closing");
            window.eApi.remove_channel(clearpref_id);
            window.eApi.remove_channel(lk_id);
            window.eApi.remove_channel(status_id);
            window.eApi.remove_channel(lkstatus_id);
        };
        
    },[]);

    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
        return (
            <div className="its">

            <div id="header">
                <span className="title">{cur_st.view}</span>
                <br/ >
                { avail_views.map(
                (x: Misc.ItsViewType, y: number) => render_viewselect(x,y))}
            {((cur_st.view == Misc.ItsViewType.Selector) || (cur_st.view == Misc.ItsViewType.Olm) || (cur_st.view == Misc.ItsViewType.Info)
                || (cur_st.view == Misc.ItsViewType.Settings)) ? 
                    render_lkmanage()   : null}

            <div id="sbar">
            {cur_txt}
            </div>
            </div>
                {(cur_st.view == Misc.ItsViewType.Selector) && cur_lk != null ? 
                (<div id="selector"
                    className={panel_visibility(Misc.ItsViewType.Selector)}>
                    <Selector.SelBank 
                    m24={cur_st.m24_ex}
                    lk={cur_lk}
                    m34={cur_st.m34_ex}
                    sfn={set_state}
                    statfn={set_status}
                    />
                    </div> ) : null}

                {(cur_st.view == Misc.ItsViewType.Perform) ? 
                ( <div id="perf" 
                    className={panel_visibility(Misc.ItsViewType.Perform)}>
                    <Perf.PerfEx sliders={perf_sliders}
                            sfn={set_state}
                            cur_ex={cur_st.cur_ex}
                            ex_idx={cur_st.ex_idx}
                            exleft = {perf_exleft}
                            numidcs={perf_numidc}
                            strlidc={perf_strlidc}
                            mdtgl={md_tgl}
                            playtgl={play_tgl}
                            kybdtgl={kybd_tgl}
                            rectgl={rec_tgl}
                            debug={cur_st.debug}

                            />
                    </div> ) : null}

                { (cur_st.view == Misc.ItsViewType.Settings) ? 
                ( <div id="settings" 
                        className={panel_visibility(Misc.ItsViewType.Settings)}
                        >
                    <SliderBank sliders={settings_bank}
                                sfn={set_state}
                    />

                 {debug_tgl.name}: <input key={debug_tgl.name} type="checkbox" id="mdebugtgl" onChange={debug_onchy} checked={cur_st.debug}/>
                    </div>
                    ) : null}

                { (cur_st.view == Misc.ItsViewType.Olm) && cur_lk != null ? 
                ( <div id="olm" 
                    className={panel_visibility(Misc.ItsViewType.Olm)}>
                    <Olm.Olm lk={cur_lk} />
                    </div>
                    ) : null} 

         { (cur_st.view == Misc.ItsViewType.Info) && cur_lk != null ? 
                ( <div id="info" 
                    className={panel_visibility(Misc.ItsViewType.Info)}>
                    <Info.Info/>
                    </div>
                    ) : null} 




            </div>
            
        );
}


