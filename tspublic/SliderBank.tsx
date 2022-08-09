import React,{ReactElement,useState} from 'react';
//import ReactDOM from 'react-dom';

export interface SliderProps {
    id: string;
    name: string;
    val: number;
    lo: number;
    hi: number;
    fn: (x: number) => void;
}

export type KeyedSliders = {
   [z: string]: SliderProps;
}


export function SliderBank(props: any) : ReactElement {
    return (
        <div className="sliderbank">
        {
        Object.keys(props.sliders).map((k: string) => {
            return (
                <SliderIdc sfn={props.sfn} did={props.sliders[k].id} key={`${k}-slidc`} slider={props.sliders[k]} />
            );
        })
        }
        </div>
        );             
}


export function SliderIdc(props: any) : ReactElement {
    const [cur_sl, use_sl] = useState<SliderProps>(props.slider);

    const onchy : React.ChangeEventHandler<HTMLInputElement>  =  (evt: React.ChangeEvent) => {
        let cur_elt: HTMLInputElement = evt.target as HTMLInputElement;
        let mv: number = cur_elt.valueAsNumber;
        let newdict1 = {val: mv};
        let newdict2 = {};
        newdict2[props.did] = mv;
        props.sfn(newdict2);

        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret: SliderProps = {...cur_sl, ...newdict1};
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        //console.log(ret);
        cur_sl.fn(mv);
        use_sl(ret);
    };

    return (
    <div className="slideridc">
        {cur_sl.name}: {cur_sl.val}
        <br />
        <input key={`${cur_sl.id}-ipt`} type="range" onChange={onchy} min={cur_sl.lo} max={cur_sl.hi} value={cur_sl.val} />
        </div>
    );

}
