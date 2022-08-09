import * as RK from './rhythm_knowledge';
import * as Rhy from './rhythm';

//BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('eApi', {
    gen_rhythm: (cm: RK.RhythmMeter, df:RK.DurType, wd: Record<RK.DurType, boolean>, num_ex: number) => ipcRenderer.invoke('gen-rhythm', cm, df, wd, num_ex),
    get_rhythm: (x: number) => ipcRenderer.invoke('get-rhythm', x),
    set_maxvel: (x: number) => ipcRenderer.send('set-maxvel', x),
    set_mainvol: (x: number) => ipcRenderer.send('set-mainvol', x),
    set_clickvol: (x: number) => ipcRenderer.send('set-clickvol', x),
    set_drumvol: (x: number) => ipcRenderer.send('set-drumvol', x),
    set_bpm: (x: number) => ipcRenderer.send('set-bpm', x),
    set_countin: (x: number) => ipcRenderer.send('set-countin', x),
    send_start: (x: boolean) => ipcRenderer.send('send-start', x),
    send_kybd_tgl: (x: boolean) => ipcRenderer.send('send-kybd-tgl', x),
    send_key: (x: boolean) => ipcRenderer.send('send-key', x),
    send_dkey: (x: boolean) => ipcRenderer.send('send-dkey', x),
    send_debug: (x: boolean) => ipcRenderer.send('send-debug', x),
    send_playrec: (x: boolean) => ipcRenderer.send('send-playrec', x),
    send_metroduring: (x: boolean) => ipcRenderer.send('send-metroduring', x),
    save_lk: (x: string) => ipcRenderer.send('save-lk', x),
    load_lk: (x: string) => ipcRenderer.send('load-lk', x),
    inited: (x: boolean) => ipcRenderer.send('inited', x),
    on_vel: (callback: (event: Event, arg: number) => void) => ipcRenderer.on('vel', callback),
    on_count: (callback: (event: Event, arg: number) => void) => ipcRenderer.on('count', callback),
    on_exleft: (callback: (event: Event, arg: number) => void) => ipcRenderer.on('exleft', callback),
    on_countin: (callback: (event: Event, arg: number) => void) => ipcRenderer.on('countin', callback),
    get_start: (callback: (event: Event, arg: boolean) => void) => ipcRenderer.on('start', callback),
    perf_list: (callback: (event: Event, arg: number[]) => void) => ipcRenderer.on('perf_list', callback),
    num_mistakes: (callback: (event: Event, arg: number) => void) => ipcRenderer.on('num_mistakes', callback),
    cur_mistakes: (callback: (event: Event, arg: string[]) => void) => ipcRenderer.on('cur_mistakes', callback),
    lk: (callback: (event: Event, arg: RK.LearnerKnow) => void) => ipcRenderer.on('lk', callback),
    lkstatus: (callback: (event: Event, arg: [RK.LearnerKnow, string]) => void) => ipcRenderer.on('lkstatus', callback),
    on_status: (callback: (event: Event, arg: string) => void) => ipcRenderer.on('status', callback),
    on_clearpref: (callback: (event: Event, arg: boolean) => void) => ipcRenderer.on('clearpref', callback),
    remove_channel: (ch: string) => ipcRenderer.removeAllListeners(ch)
});

//END CODE FROM https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
