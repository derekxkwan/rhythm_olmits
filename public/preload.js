"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
const { ipcRenderer, contextBridge } = require('electron');
contextBridge.exposeInMainWorld('eApi', {
    gen_rhythm: (cm, df, wd, num_ex) => ipcRenderer.invoke('gen-rhythm', cm, df, wd, num_ex),
    get_rhythm: (x) => ipcRenderer.invoke('get-rhythm', x),
    set_maxvel: (x) => ipcRenderer.send('set-maxvel', x),
    set_mainvol: (x) => ipcRenderer.send('set-mainvol', x),
    set_clickvol: (x) => ipcRenderer.send('set-clickvol', x),
    set_drumvol: (x) => ipcRenderer.send('set-drumvol', x),
    set_bpm: (x) => ipcRenderer.send('set-bpm', x),
    set_countin: (x) => ipcRenderer.send('set-countin', x),
    send_start: (x) => ipcRenderer.send('send-start', x),
    send_kybd_tgl: (x) => ipcRenderer.send('send-kybd-tgl', x),
    send_key: (x) => ipcRenderer.send('send-key', x),
    send_dkey: (x) => ipcRenderer.send('send-dkey', x),
    send_debug: (x) => ipcRenderer.send('send-debug', x),
    send_playrec: (x) => ipcRenderer.send('send-playrec', x),
    send_metroduring: (x) => ipcRenderer.send('send-metroduring', x),
    save_lk: (x) => ipcRenderer.send('save-lk', x),
    load_lk: (x) => ipcRenderer.send('load-lk', x),
    inited: (x) => ipcRenderer.send('inited', x),
    on_vel: (callback) => ipcRenderer.on('vel', callback),
    on_count: (callback) => ipcRenderer.on('count', callback),
    on_exleft: (callback) => ipcRenderer.on('exleft', callback),
    on_countin: (callback) => ipcRenderer.on('countin', callback),
    get_start: (callback) => ipcRenderer.on('start', callback),
    perf_list: (callback) => ipcRenderer.on('perf_list', callback),
    num_mistakes: (callback) => ipcRenderer.on('num_mistakes', callback),
    cur_mistakes: (callback) => ipcRenderer.on('cur_mistakes', callback),
    lk: (callback) => ipcRenderer.on('lk', callback),
    lkstatus: (callback) => ipcRenderer.on('lkstatus', callback),
    on_status: (callback) => ipcRenderer.on('status', callback),
    on_clearpref: (callback) => ipcRenderer.on('clearpref', callback),
    remove_channel: (ch) => ipcRenderer.removeAllListeners(ch)
});
//END CODE FROM https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
