import {Pd} from './sound';
import * as Rhy from './rhythm';
import * as RK from './rhythm_knowledge';
const elc = require('electron');
const apath = require('path');
const afs = require('fs');
const eapp = elc.app;
const emain = elc.ipcMain;


//BEGIN CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename
let homepage : string = apath.join(__dirname, "index.html");
let prefile : string = apath.join(__dirname, "preload.js");
let hjs : string = apath.join(__dirname, "index.js");
let savedir: string = apath.resolve(__dirname, "save");
//END CODE FROM https://stackoverflow.com/questions/40426378/webpack-ts-loader-change-tsconfig-filename

let appdebug: boolean = false;
let bw: number = 800;
let bh: number = 700;
let pd: Pd;
let lk: RK.LearnerKnow;
let cur_exevt: RK.ExampleEvent[];
let cur_focus: RK.DurType;
let cur_ex: RK.RhythmEx;
let cur_exs: RK.RhythmEx[];
let cur_gbeats: boolean[][] = []; 
let ex_idx: number = 0;
let cur_countin: number = 0;
let cur_bpm: number = 120;

function save_lk(x: string, br: typeof elc.BrowserWindow ) {
    let cur_str: string = JSON.stringify(lk);
    let curpath: string = get_save_path(x);
    // BEGIN CODE FROM https://nodejs.dev/learn/writing-files-with-nodejs
    afs.writeFile(curpath, cur_str, (e2) => {
        if(e2) {
            console.log("error writing file");
            br.webContents.send('status', "Can't create save file!");
        }
        else {

            lk.update_totals();
            //br.webContents.send('lk', lk);
            br.webContents.send('lk', lk);
            br.webContents.send('status', "File saved!");
            //br.webContents.send('lkstatus', [lk, "File saved!"]);
        };
    });
    
    // END CODE FROM https://nodejs.dev/learn/writing-files-with-nodejs
}

function get_save_path(x: string) : string {
    
    let savepath: string = apath.resolve(__dirname, "save", `${x}.txt`);
    return savepath;
}

function get_countin(cur:RK.RhythmMeter): number {
    let ret: number = 4;
    let num: number = cur[0];
    let denom: number = cur[1];
    if ((num == 2 && denom == 4) || (num == 4 && denom == 4)) {
lk;
    }
    else if ((num == 3 && denom == 4)) {
        ret = 3;
    };

    return ret;
}

const make_win : typeof elc.BrowserWindow = () => {
    // BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
    const win = new elc.BrowserWindow({
        webPreferences: {
            preload: prefile
        },
        width: bw,
        height: bh,
    });

    // END CODE FROM https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
    win.loadFile(homepage);
    return win;
};


// val, subdiv, tuple, mult, dot
let ex1: RK.RhythmEx = Rhy.make_rex([
    [[1,4,1], [1,4,1], [1,4,1], [1,4,1], [1,2,3], [1,2,3], [1,2,3]],
    [[1,4,1], [1,4,1], [1,4,1], [1,4,1], [1,2,1], [1,2,1]],
    [[1,4,1], [1,4,1], [1,4,1], [1,4,1], [1,2,3], [1,2,3], [1,2,3]],
    [[1, 1, 1], [0, 1, 1]]
], [2,4]);

let ex2: RK.RhythmEx = Rhy.make_rex([
    [[1,1,1], [1,2,1], [1,2,1]],
    [[1,1,1], [1,2,3], [1,2,3], [1,2,3]],
    [[1,1,1], [1,2,3], [1,2,3], [1,2,3]],
    [[0, 2, 1], [1, 2, 1], [1, 1, 1]]
], [2,4]);


let ex3: RK.RhythmEx = Rhy.make_rex([
    [[1,2,1], [1,4,1], [1,4,1], [1,2,1], [1,4,1], [1,4,1]],
    [[1,1,1], [1,4,1], [1,4,1], [1,4,1], [1,4,1]],
    [[0, 2,1], [1,2,1], [1,2,1], [1,4,1], [1,4,1]],
    [[0,4,1], [1,4,1], [1,4,1], [1,4,1], [1,1,1]]
], [2,4]);


let ex4: RK.RhythmEx = Rhy.make_rex([
    [[1,2,1],[1,2,1],[1,2,1],[1,2,1]],
    [[1,4,1],[1,4,1],[1,4,1],[1,4,1],[0,2,1],[1,2,1]],
    [[1,4,1],[1,4,1],[1,4,1],[1,4,1],[0,2,1],[1,2,1]],
    [[0, 2, 1], [1, 2, 1], [1, 1, 1]]
], [2,4]);


let ex5: RK.RhythmEx = Rhy.make_rex([
    [[1,2,1], [1,2,1], [1,2,3], [1,2,3], [1,2,3]],
    [[0,2,1], [1,2,1], [1,2,3], [1,2,3], [1,2,3]],
    [[0,2,1], [1,2,1], [1,2,3], [1,2,3], [1,2,3]],
    [[1,1,1], [1,2,3], [1,2,3], [1,2,3]],
    [[0, 2, 1], [1, 2, 1], [0, 2,1], [1,2,1]]
], [2,4]);


let ex7: RK.RhythmEx = Rhy.make_rex([
    [[1,1,1],[0,2,1], [1,2,1], [0,2,1], [1,2,1] ],
    [[1,1,1], [0,1,1], [1,2,3], [1,2,3], [1,2,3]],
    [[0,1,1],[1,1,1],  [1,2,1], [1,2,1] ],
    [[1,1,1], [0,1,1], [0,1,1]]
], [3,4]);




let ex6: RK.RhythmEx = Rhy.make_rex([
    [[1,2,1],[1,2,1], [0,2,1], [1,2,1], [1,2,1], [0,2,1] ],
    [ [1,2,1], [1,2,1], [0, 2, 3], [1, 2,3], [1,2,3], [1,1,1] ]
], [3,4]);


let _ex3: RK.RhythmEx = Rhy.make_rex([
    [[1,2,1], [0,4,1], [1,4,1], [0,2,1], [1, 4,1], [1,4,1], [0,2,1], [1, 4,1], [1,4,1], [1, 2, 1], [1,2,1]],
   [[1,2,1], [1,2,1], [1,4,1], [1,4,1], [1,2,1], [0,4,1], [1,4,1], [1,2,1], [1,1,1]]
], [4,4]);


// val, subdiv, tuple, mult, dot
let _ex4: RK.RhythmEx = Rhy.make_rex([
    [[1,4,1], [0,4,1], [1,4,1], [0, 4,1], [1,2,1], [1,2,1], [0,4,1], [1,4,1], [1,2,1], [0,4,1],[1,4,1], [1,4,1], [0,4,1]],
    [ [1,4,1], [1,2,1], [1,4,1], [1,4,1], [1,4,1], [0,4,1], [1,4,1], [1,4,1], [1,4,1], [1,4,1], [1,4,1], [1,2,1], [0,2,1]]
], [4,4]);

//Rhy.debug_ex(ex4);
let hardcode_exs: RK.RhythmEx[] = [ex1, ex2, ex3, ex4, ex5, ex6, ex7];
/*
for(let i: number = 0; i < hardcode_exs.length; i++) {
    Rhy.debug_ex(hardcode_exs[i]);
};
*/
eapp.whenReady().then(() => {
    let br = make_win();
    pd = new Pd();
    lk = new RK.LearnerKnow();
    //console.log(lk);
    //lk.randomize(45,55);
    //lk.randomize(90, 100);
    //lk.randomize(30, 50);
    //boilerplate
    //BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/quick-start
    eapp.on('activate', () => {
        if (elc.BrowserWindow.getAllWindows().length < 1) {
            br = make_win();
        };
    });
    //END CODE FROM https://www.electronjs.org/docs/latest/tutorial/quick-start
    //handle used with invoke

    emain.handle('gen-rhythm', async (evt: typeof elc.IpcMainEvent, cm: RK.RhythmMeter, df: RK.DurType, wd: Record<RK.DurType, boolean>, num_ex: number) => {
        cur_exs = [];
        cur_gbeats = [];
        ex_idx = 0;
        let loaded: boolean = false;
        for(let i: number = 0; i < num_ex; i++) {
            let ex_iter: RK.RhythmEx = Rhy.generate_exercise(lk, cm, df, wd);
            cur_exs.push(ex_iter);
            };

        if(cur_exs.length > 0) {
            loaded = true;
            cur_focus = df;
            br.webContents.send('status', "");
        }
        else {
            console.log("Could not generate rhythm exercises!");
            br.webContents.send('status', "Could not generate rhythm exercises!");
        };

    //console.log("loaded", loaded);
    return loaded;
    });

    emain.handle('get-rhythm', async (evt: typeof elc.IpcMainEvent, x: number) => {
        
        let ret: RK.RhythmEx[] = [];
        console.log("getting rhythm request", x, "out of", cur_exs.length);

        if(x > 0 && cur_ex != null && cur_gbeats.length > 0) {
            console.log("results:", cur_gbeats);
            //Rhy.debug_ex(cur_ex);
            lk.update_by_patt(cur_ex, cur_gbeats, cur_focus);
            lk.update_totals();
        };
        if(x < cur_exs.length) {
            ex_idx = x;
            cur_ex = cur_exs[ex_idx];
            cur_gbeats = Rhy.default_good_beats(cur_ex, false);
            let cur = Rhy.rex_to_list(cur_ex);
            let rexlist = cur.timeval;
            cur_exevt = cur.evts;
            let cur_meter: RK.RhythmMeter = cur_ex.meter;
            cur_countin = get_countin(cur_meter);
            pd.adjust_num('countin', cur_countin);
            pd.adjust_num('meter', cur_meter[0]);
            pd.adjust_num('seqlistclear', 1);

            let i: number = 0;
            while(i < rexlist.length) {
                pd.adjust_numlist('seqlist', rexlist.slice(i, i + 16));
                i = i + 16;
            };
            ex_idx = (ex_idx + 1) % cur_exs.length;
            br.webContents.send('countin', cur_countin);
            
            let blank_list: string[] = [];
            br.webContents.send('cur_mistakes', blank_list);
            br.webContents.send('num_mistakes', 0);
            br.webContents.send('exleft', cur_exs.length - x -1);
            //console.log("sending", x);
            ret.push(cur_ex);
        };

        return ret;
    });
    
    emain.on('send-start', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        let cur_start: number = 0;
        if (x == true) {
            cur_start = 1;
        };
        pd.adjust_num('start', cur_start);
    });




    emain.on('set-maxvel', async (evt: typeof elc.IpcMainEvent, x: number) => {
        pd.adjust_num('maxvel', x);
    });

    emain.on('set-mainvol', async (evt: typeof elc.IpcMainEvent, x: number) => {
        pd.adjust_num('mainvol', x * .01);
    });

    emain.on('set-clickvol', async (evt: typeof elc.IpcMainEvent, x: number) => {
        pd.adjust_num('clickvol', x * .01);
    });

    emain.on('set-drumvol', async (evt: typeof elc.IpcMainEvent, x: number) => {
        pd.adjust_num('drumvol', x * .01);
    });

    emain.on('set-bpm', async (evt: typeof elc.IpcMainEvent, x: number) => {
        cur_bpm = x;
        pd.adjust_num('bpm', x);
    });

    emain.on('set-countin', async (evt: typeof elc.IpcMainEvent, x: number) => {
        pd.adjust_num('countin', x);
    });

     emain.on('send-playrec', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        let to_send: number = 0;
        if (x == true) {
            to_send = 1;
        };
        pd.adjust_num('playrec', to_send);
    });


    emain.on('send-start', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        let to_send: number = 0;
        if (x == true) {
            to_send = 1;
        };
        pd.adjust_num('start', to_send);
    });

    
    emain.on('send-kybd-tgl', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        let to_send: number = 0;
        if (x == true) {
            to_send = 1;
        };
        pd.adjust_num('kybd-tgl', to_send);
    });

    emain.on('send-key', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        let to_send: number = 0;
        if (x == true) {
            to_send = 100;
        };
        pd.adjust_num('key', to_send);
    });

    emain.on('send-debug', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        appdebug = x;
        console.log("Debug", appdebug);
    });


  emain.on('send-dkey', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        if (x == true) {
            if(appdebug == true) {
                if(cur_exs.length > 0 && cur_ex != null) {

                    cur_gbeats = Rhy.default_good_beats(cur_ex, true);
                };
            };
        };
    });



    emain.on('send-metroduring', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        let to_send: number = 0;
        if (x == true) {
            to_send = 1;
        };
        pd.adjust_num('metroduring', to_send);
    });


    emain.on('inited', async (evt: typeof elc.IpcMainEvent, x: boolean) => {
        if (x == true) {
            br.webContents.send('lk', lk);
            console.log("sending lk");
        };
    });

    emain.on('save-lk', async (evt: typeof elc.IpcMainEvent, x: string) => {
        if (x.length > 0) {
            if(afs.existsSync(savedir) == false) {
                afs.mkdir(savedir, {}, async (e) => {

                    // BEGIN CODE FROM https://nodejs.org/api/fs.html#fsmkdirpath-options-callback
                    if(e) {
                        console.log("error creating save directory");
                        br.webContents.send('status', "Can't create save directory!");
                    // END CODE FROM https://nodejs.org/api/fs.html#fsmkdirpath-options-callback
                    }
                    else {
                        save_lk(x, br);
                    };
                });
            }
            else {
                save_lk(x, br);
            };

        };
    });

    emain.on('load-lk', async (evt: typeof elc.IpcMainEvent, x: string) => {
        if(x.length > 0) {
            // BEGIN CODE FROM https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/
            let curpath: string = get_save_path(x);
            afs.readFile(curpath, 'utf8', (e, stuff) => {
                if(e) {
                    let errstr: string = `Cannot load save file for ${x}!`;
                        br.webContents.send('status', errstr);
                        console.log(errstr);
                }
                else {

                    let goodstr: string = `Loaded save file for ${x}!`;
                    let goodstuff: any = JSON.parse(stuff);
                    let ilk: RK.ILearnerKnow = goodstuff as RK.ILearnerKnow;
                    lk = new RK.LearnerKnow();
                    lk.load_from_ilk(ilk);
                    br.webContents.send('clear_pref', true);
                    br.webContents.send('status', goodstr);
                    br.webContents.send('lk', lk);
                    //br.webContents.send('lkstatus', [lk, goodstr]);
                };
            });
            // END CODE FROM https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/
        };
    });


    pd.subscribe_num('outvel', (x: number) => {br.webContents.send('vel', x)});
    
    pd.subscribe_num('count', (x: number) => {br.webContents.send('count', x+1)});
    
    pd.subscribe_num('startout', (x: number) => {
        if (x > 0) {
            br.webContents.send('start', true);
        }
        else {
            br.webContents.send('start', false);
        };
    });
    
    pd.subscribe_numarray('perf',
        (x: number[]) => {
            let cur_perf = Rhy.cat_performance(cur_ex, cur_exevt, x, cur_countin, cur_bpm);
            cur_gbeats = cur_perf.good_beats;
            let ctimings: any = cur_perf.timings;
            let cmistakes: [RK.NoteRef, RK.RhythmCat][] = cur_perf.mistakes;
            let num_mistakes: number = cmistakes.length;

            let cur_mistakes: string[] = [];
            for (let i = 0; i < num_mistakes; i++) {
                let cref: RK.NoteRef = cmistakes[i][0];
                let cstr: string = RK.change_rstr(cmistakes[i][1].rstr);
                let cur_str: string = `(meas: ${cref[0]+1}, beat: ${cref[1] + 1}): ${cstr}`;
                cur_mistakes.push(cur_str);
            };
            br.webContents.send('num_mistakes', num_mistakes);
            br.webContents.send('cur_mistakes', cur_mistakes);
        });
    });

//boilerplate
//BEGIN CODE FROM https://www.electronjs.org/docs/latest/tutorial/quick-start
eapp.on('window-all-closed', () => {
    if (process.platform !== "darwin") {
                eapp.quit();
    };
});
//END CODE FROM https://www.electronjs.org/docs/latest/tutorial/quick-start

eapp.on('will-quit', () => {
if (typeof pd != "undefined") {
            pd.clean_up();
        };

});
