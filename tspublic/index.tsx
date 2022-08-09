import React from 'react';
import {createRoot} from 'react-dom/client';
import {Its} from './App'; 

// BEGIN CODE from https://reactjs.org/docs/hello-world.html
let main: HTMLElement = document.getElementById('main');
const rdr = createRoot(main);

rdr.render(<Its key="its0"/>);

// END CODE from https://reactjs.org/docs/hello-world.html
