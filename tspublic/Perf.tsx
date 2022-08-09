/// <reference path="./global.d.ts" />

import React,{ReactElement, useCallback, useRef, useState, useEffect} from 'react';
//import ReactDOM from 'react-dom';
import * as Misc from './misc';
import {SliderBank} from './SliderBank';
import {ScoreDisplay} from './RhythmNotation';

const cw = 775;
const ch = 150;
const num_tries: number = 3;
export interface NumIndicator {
    id: string;
    name: string;
    value: number;
    fn: (callback: (event: Event, arg: number) => void) => void;
    bclr: string;
    flashdur: number;
    bclr1?: string;
    bclr2?: string;
}

export interface BoolSender {
    name: string;
    value: boolean;
    send_fn: (x: boolean) => void;
    send_fn2?: (x: boolean) => void;
    recv_fn?: (callback: (event: Event, arg: boolean) => void) => void;
    send_val2?: boolean;
    id?: string;
}

export interface NumListIndicator {
    id: string;
    name: string;
    value: string;
    fn: (callback: (event: Event, arg: number[]) => void) => void;
}

export interface StrListIndicator {
    id: string;
    name: string;
    value: string;
    fn: (callback: (event: Event, arg: string[]) => void) => void;
}

export interface KeyedNumIdc {
    [z: string]: NumIndicator
}

function NumListIdc(props: any) : ReactElement {
    const [cur_nl, use_nl] = useState<NumListIndicator>(props.nlidc);
    const [cur_i, use_i] = useState({init: false});

    
    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect( () => {
        if(cur_i.init == false) {
            //window.eApi.remove_channel(cur_nl.id);
           cur_nl.fn( (event: Event, val: number[]) => {
                    let cur_str: string = "";
                    if (val.length > 0) {
                        let str_list: string[] = val.map(x => x.toString());
                        cur_str = str_list.join("; ");
                    };

                    let newdict = {value: cur_str};

                    //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    let ret: NumListIndicator = {...cur_nl, ...newdict};
                    //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    use_nl(ret);
                    
                });
                use_i({init: true});
            };
                return () => {
                        window.eApi.remove_channel(cur_nl.id);
                    };


            }, []);

            // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (
            <span key={cur_nl.id} id={cur_nl.id}>{cur_nl.name} : {cur_nl.value}</span>
        );
}


function StrListIdc(props: any) : ReactElement {
    const [cur_strl, use_strl] = useState<StrListIndicator>(props.strlidc);
    const [cur_i, use_i] = useState({init: false});

    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect( () => {
        if(cur_i.init == false) {
            //window.eApi.remove_channel(cur_strl.id);
           cur_strl.fn( (event: Event, val: string[]) => {
                    let cur_str: string = "";
                    if (val.length > 0) {
                        cur_str = val.join(", ");
                    };

                    let newdict = {value: cur_str};

                    //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    let ret: StrListIndicator = {...cur_strl, ...newdict};
                    //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                    use_strl(ret);
                    });
                    use_i({init: true});
                };
                    return () => {
                        window.eApi.remove_channel(cur_strl.id);
                    };

            }, []);

        // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (
            <span key={cur_strl.id} id={cur_strl.id}>{cur_strl.name} : {cur_strl.value}</span>
        );
}



function NumIdc(props: any) : ReactElement {
    const [cur_ni, use_ni] = useState<NumIndicator>(props.numidc);
    const [cur_i, use_i] = useState({init: false});

    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect( () => {

            if(cur_i.init == false) {
                //window.eApi.remove_channel(cur_ni.id);
               cur_ni.fn( (event: Event, val: number) => {
                //console.log(val);
                        let newdict = {value: val};

                        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                        let ret: NumIndicator = {...cur_ni, ...newdict};
                        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                        use_ni(ret);
                        //console.log("ok");
                        if(cur_ni.flashdur > 0) {
                            let newdict1 = {value: val, bclr: cur_ni.bclr2};

                            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                            let newret1: NumIndicator  = {...cur_ni, ...newdict1};

                            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                            use_ni(newret1);
                            setTimeout(() => {
                                let newdict2 = {value: val, bclr: cur_ni.bclr1};

                                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                                let newret2: NumIndicator  = {...cur_ni, ...newdict2};
                                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                                use_ni(newret2);
                            }, cur_ni.flashdur);
                        };
                    });
                    use_i({init: true});
                };
                    return () => {
                    use_i({init: false});
                       window.eApi.remove_channel(cur_ni.id);
                    };

            }, []);

    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (
            <span id={`${cur_ni.id}-name`}> {cur_ni.name} : 
            <span id={`${cur_ni.id}-val`}
                style={{backgroundColor: cur_ni.bclr}}
                > {cur_ni.value} </span>
                </span>
        );
}

export function NumIdcBank(props: any) : ReactElement {
    return (
        <div className="numidcbank">
        {Object.keys(props.numidcs).map(
        (k: string) => {
            let ckey: string = `${k}-nidc`;
            return (
                <div key={ckey} className="numidc">
                <NumIdc key={ckey} numidc={props.numidcs[k]} />
                <br />
                </div>
                );
            })}
            </div>
        );
}


export function PerfEx(props: any) : ReactElement {
    
    const [cur_rtgl, use_rtgl] = useState<BoolSender>(props.rectgl);
    const [cur_ptgl, use_ptgl] = useState<BoolSender>(props.playtgl);
    const [cur_mtgl, use_mtgl] = useState<BoolSender>(props.mdtgl);
    const [cur_ktgl, use_ktgl] = useState<BoolSender>(props.kybdtgl);
    const [cur_kclr, use_kclr] = useState<string>(Misc.bclr);
    const [cur_try, use_try] = useState<number>(num_tries);
    const [cur_ren, use_ren] = useState<boolean>(true);
    const [cur_sd, use_sd] = useState({init: false, sd: null});
    const cref = useRef(null);



    const kybd_key = useCallback((evt: KeyboardEvent) => {
    // BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        if(evt.key=="Shift" || evt.code == "ShiftLeft" || evt.code == "ShiftRight") {
            use_kclr(Misc.flashclr);
            window.eApi.send_key(true);
            setTimeout(() => {
                use_kclr(Misc.bclr);
            }, 75);

        }
        else if (evt.key=="\\" || evt.code=="Backslash") {
            window.eApi.send_dkey(true);
        };
        // END CODE FROM https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    },[]);

    const k_onchy: React.ChangeEventHandler<HTMLInputElement> = (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: boolean = cur_elt.checked;
        if (mv == true) {
            window.addEventListener("keydown", kybd_key);
        }
        else {
            window.removeEventListener("keydown", kybd_key);
        };
        props.sfn({kybd: mv});
        cur_ktgl.send_fn(mv);
        let newdict = {value: mv};

        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = {... cur_ktgl, ...newdict};
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_ktgl(ret);

    };

    const kybd_evtclean = () => {
        if(true == true) {
            console.log("remove key");
            window.removeEventListener("keydown", kybd_key);
        };
    };

    const kybd_evtest = () => {
        if(cur_ktgl.value == true) {
            console.log("add key");
            window.addEventListener("keydown", kybd_key);
        };

    };

    const draw_ex = (x: RhythmEx) => {
        if(cref.current != null) {
                
                let new_dict = {sd: null};
                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret = { ...cur_sd, ...new_dict};
                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                use_sd(ret);
                let cnv: HTMLCanvasElement = cref.current;
                let cur_disp = new ScoreDisplay(cnv, cw, ch);
                cur_disp.display_rhythm(x);
                let new_dict1 = {sd: cur_disp};
                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret1 = { ...cur_sd, ...new_dict1};
                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                use_sd(ret1);
            };


    };

    const get_rhythm = async (x: number) => {
        console.log("getting rhythm", x);
        let cur_rhy: RhythmEx[] = await window.eApi.get_rhythm(x);
        if(cur_rhy.length > 0) {
            console.log("drawing rhythm");
            props.sfn({cur_ex: cur_rhy});
            props.sfn({ex_idx: x});
            draw_ex(cur_rhy[0]);
        }
        else {
            console.log("exiting perf mode");
            window.eApi.inited(true);
            props.sfn({ex_idx: 0});
            props.sfn({cur_ex: [] as RhythmEx[]});
            let new_dict = {sd: null};
            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            let ret = {...cur_sd, ...new_dict};
            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            use_sd(ret);
            props.sfn({view: Misc.ItsViewType.Selector});
        };
    };

    const next_rhythm = async () => {
        let next_idx = props.ex_idx + 1;
        get_rhythm(next_idx);
        use_try(num_tries);
    };

    const p_onchy: React.ChangeEventHandler<HTMLInputElement> = (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: boolean = cur_elt.checked;

        cur_ptgl.send_fn2(cur_ptgl.send_val2);
        cur_ptgl.send_fn(mv);
        let newdict1 = {value: mv};
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret: BoolSender = {...cur_ptgl, ...newdict1};
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_ptgl(ret);
    };

    const r_onchy: React.ChangeEventHandler<HTMLInputElement> = (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: boolean = cur_elt.checked;

        cur_rtgl.send_fn2(cur_rtgl.send_val2);
        cur_rtgl.send_fn(mv);
        
        let newdict1 = {value: mv};

        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret: BoolSender = {...cur_rtgl, ...newdict1};
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        if(mv == true) {
            use_try(cur_try - 1);
        };
        use_rtgl(ret);
    };
    
    const m_onchy: React.ChangeEventHandler<HTMLInputElement>  =  (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: boolean = cur_elt.checked;
        cur_mtgl.send_fn(mv);
        
        let newdict1 = {value: mv};

        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret: BoolSender = {...cur_mtgl, ...newdict1};
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        use_mtgl(ret);
    };

    // BEGIN CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    // basic useeffect framework
    useEffect( () => {
        if(cur_sd.init == false) {
            cur_ptgl.recv_fn((event: Event, val: boolean) => {
            if(val == false){
                let newdict1 = {value: val};

                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret: BoolSender = {...cur_ptgl, ...newdict1};
                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let newdict2 = {value: val};

                //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                let ret2: BoolSender = {...cur_rtgl, ...newdict2};

                //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                use_ptgl(ret);
                use_rtgl(ret2);
                };
                });
            kybd_evtest();
            let newdict3 = {init: true};

            //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            let ret3 = { ...cur_sd, ...newdict3};

            //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            use_sd(ret3);
            get_rhythm(0);
        };
        return () => {
            use_sd({init: false, sd: null});
            //console.log("cleanup");
            kybd_evtclean();
            window.eApi.remove_channel(cur_ptgl.id);
        };
    }, []);

    // END CODE FROM https://reactjs.org/docs/hooks-reference.html#useeffect
    return (
            <div className="perfex">
            <button className="actbtn" type="button" id="getbtn" onClick={next_rhythm}>Accept Performance and Progress</button>
            <br />

             {cur_mtgl.name}: <input key={cur_mtgl.name} type="checkbox" id="mtgl" onChange={m_onchy} checked={cur_mtgl.value}/>
            <br />
             {cur_ptgl.name}: <input key={cur_ptgl.name} type="checkbox" id="ptgl" onChange={p_onchy} checked={cur_ptgl.value}/>
            <br />


            {cur_rtgl.name}: <input key={cur_rtgl.name} type="checkbox" id="rtgl" onChange={r_onchy} checked={cur_rtgl.value} disabled={(cur_try <= 0)}/>
            <br />
            <span>Number of Tries Left: {cur_try}</span>

                <br />
            <NumIdc key={props.exleft.id} numidc={props.exleft} />
            <canvas className="scoredisp" ref={cref} width={cw} height={ch} />

            {cur_ktgl.name}: <input key={cur_ktgl.name} type="checkbox" id="ktgl" onChange={k_onchy} checked={cur_ktgl.value} />  <span style={{backgroundColor: cur_kclr}}>(flashes with key send)</span>
            <NumIdcBank numidcs={props.numidcs} />
            <StrListIdc strlidc={props.strlidc} />
            <SliderBank sfn={props.sfn} sliders={props.sliders} />
            <br />
            <span>(If using microphone input, <b>use headphones</b>)</span> 
            </div>
            );
}


