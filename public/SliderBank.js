import React, { useState } from 'react';
export function SliderBank(props) {
    return (React.createElement("div", { className: "sliderbank" }, Object.keys(props.sliders).map((k) => {
        return (React.createElement(SliderIdc, { sfn: props.sfn, did: props.sliders[k].id, key: `${k}-slidc`, slider: props.sliders[k] }));
    })));
}
export function SliderIdc(props) {
    const [cur_sl, use_sl] = useState(props.slider);
    const onchy = (evt) => {
        let cur_elt = evt.target;
        let mv = cur_elt.valueAsNumber;
        let newdict1 = { val: mv };
        let newdict2 = {};
        newdict2[props.did] = mv;
        props.sfn(newdict2);
        //BEGIN CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let ret = Object.assign(Object.assign({}, cur_sl), newdict1);
        //END CODE FROM https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        //console.log(ret);
        cur_sl.fn(mv);
        use_sl(ret);
    };
    return (React.createElement("div", { className: "slideridc" },
        cur_sl.name,
        ": ",
        cur_sl.val,
        React.createElement("br", null),
        React.createElement("input", { key: `${cur_sl.id}-ipt`, type: "range", onChange: onchy, min: cur_sl.lo, max: cur_sl.hi, value: cur_sl.val })));
}
