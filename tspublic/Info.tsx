/// <reference path="./global.d.ts" />

import React, {useState,Component} from 'react';
import * as Misc from './misc';

enum InfoViewType {
    app_intro = "app_intro",
    app_ex = "app_ex",
    app_progress = "app_progress",
    app_settings = "app_settings",
    music_bm = "music_bm",
    music_nr = "music_nr",
    music_nd = "music_nd",
    refs = "refs"
}

// BEGIN CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html
type InfoView = keyof typeof InfoViewType;
// END CODE FROM https://www.typescriptlang.org/docs/handbook/enums.html


interface InfoState {
   view: InfoViewType; 
}


const view_str: any = {app_intro: "Intro/Selection (app)", app_ex: "Exercise (app)", app_progress: "Progress (app)", app_settings: "Header/Settings (app)", music_nd: "Note Durations (music)", music_nr: "Notes/Rests (music)", music_bm: "Beats/Meter (music)", refs: "(references)"};



export function IntroInfoView(props: any) : React.ReactElement {
    return (
        <div key="introinfo" id="introinfo">
        <h1>Basic Information</h1>
        <span>The tutoring system teaches you how to <b>read and understand rhythm</b>. It tests your understanding of rhythm through <b>recording your performances of rhythm (through tapping, clapping, etc.) via microphone</b> (or <b>optionally keyboard input</b> although microphone input is preferred). If you are using the microphone input, it is recommended to <b>use headphones</b>. Rhythms are shown usually through <b>music notation</b> but are also shown in <b>shorthand</b> in various places using <b>-</b> for rests and <b>x</b> for notes.</span>
        <h1>Exercise Selection</h1>
        <span>You can access rhythms to practice using the <b>Selection screen</b>. You can choose what note durations in rhythms you want to focus on using the <b>Select Focus</b> dropdown. You can also select what note durations you want to include in your exercises using the <b>toggle boxes</b> next to each note duration. You can also select the number of exercises you want to tackle at each time using the <b>Number of Exercises</b> slider (and click <b>Get Exercises</b> to actually get them). The exercises are separated by <b>meter</b> and the progress bars tell you <b>how much progress</b> you've made overall and with respect to each duration. Some options <b>might not be available</b> to you (in both the dropdown and the toggle boxes) because you have not made enough progress in the immediately preceding note duration skill (with quarter notes being the "easiest" and always available and the note durations getting more difficult as you glance down the column). The <b>skill threshold</b> to open up new options is <span>{Misc.skill_thresh}%</span> and the <b>number of instances to master</b> a rhythm pattern is <span>{Misc.num_to_master}</span>. Progress percentages for skills below a threshold are highlighted in <span className="belowthresh">red</span>, percentages below the maxmimum but above the threshold are highlighted in <span className="abovethresh">yellow/orange</span>, and percentages that are at a maxmium are highlithed in <span className="atmax">green</span>.</span>
        </div>
    );
}
export function ExerciseInfoView(props: any) : React.ReactElement {
    return (
        <div key="exerciseinfo" id="exerciseinfo">
        <h1>Features</h1>
        <span>Here is where you can <b>read</b> and <b>perform</b> rhythm exercises. This tutoring system detects how you play rhythms through detecting attacks (taps, claps, clicks, etc.) from the <b>microphone</b> input (or through keyboard input if so desired). The <b>Detected Input</b> field shows how your attack is and flashes green when it detects attacks. How sensitive the system is to your taps can be adjusted by the <b>Input Sensitivity</b> slider so if the number is changing too often (even when you don't tap), adjust the value higher. The <b>bpm</b> slider affects how fast playback or recording goes so if things are too fast, adjust the slider to a lower value. Toggling the <b>Use Shift Keys Instead of Microphone</b> checkbox enables keyboard input and gates the attack information (the microphone input is still being detected, just not used). If you are using the microphone input, it is recommended to <b>use headphones</b> (or else the microphone will pick up what is being played by the speakers). To get an understanding of what the rhythm sounds like, check the <b>Play Back Rhythm</b> toggle. You will notice that there are beeps before the playback actually starts. This happens with recording too and this <b>count-in</b> (specified in number of beats) lets you know how fast the rhythm is going before actually listening to it or playing it. The <b>beeps</b> are the <b>metronome</b> (with high beeps on beginnings of measures, low beeps on other beats, and an additional chime when the rhythm example starts) helps you keep track of the beat and can be disabled for more of a challenge. The <b>Current Count</b> gives you the beat visually for extra help.</span>

        <h1>Rhythm Grading</h1>
        <span>The tutoring system allows for you to record your rhythm performances using the <b>Record Performance</b> toggle. The tutoring system keeps tracks of which beats you play correctly and which you do not play correctly and notifies you of the mistakes in <b>Current Beat Mistakes</b> and <b>Number of Beats Wrong</b>, giving you the exact beats where mistakes occur and the rhythmic patterns in those beats. These won't affect your overall skill progress until you progress to the next example (or go back to the selction screen if no more examples left) by clicking the <b>Accept Performance and Progress</b> button (note that until you record a performance, all beats count as a mistake). The number of tries you have left is given by the <b>Number of Tries Left</b> field (note that toggling the Record Performance box uses up a try even if you don't finish a performance. <b>Exercises Left</b> gives the number of exercises left (not counting the current exercise).</span>

        </div>
    );
}



export function ProgressInfoView(props: any) : React.ReactElement {
    return (
        <div key="progressinfo" id="progressinfo">
        <span>Here is where you can find the progress you've made with the tutor overall or in specific meters. The actual progress actively being tracked is with respect to individual rhythms (labeled with -'s and x's), but the tutor collates this information for you into larger categories. The categories such as <span className="o0">"Downbeat"</span>, <span className="o1">"Second Subdivision</span>, <span className="o2">"Third Subdivision"</span>, and <span className="o3">"Fourth Subdivision"</span> refer to where actual notes (not rests) of rhythms begin with respect to the beat (and are color-coded with their individual rhythms for clarity). <b>Downbeat</b> refers to rhythms that begin on the beat, <b>Second Subdivision</b> refers to patterns that begin on the second subdivision of the beat (see Note Durations), and so on. The tutor also provides an overall view of progress with respect to meters and collates the information from each meter into an <b>overall</b> view of progress over both meters.</span>
        </div>
    );
}


export function SettingsInfoView(props: any) : React.ReactElement {
    return (
        <div key="settingsinfo" id="settingsinfo">
        <h1>Header</h1>
        <span>At the top of the screen is where you can load and save user files. You can enter your username (no spaces please) and clicking the "Save User" file will save your progress as a text file in "public/save" as "(user).txt." Entering a username and clicking "Load User" will attempt to load from "(user).txt" in the same folder.</span>
        <h1>Settings</h1>
        <span>Here you can adjust the volumes of various things that you will encounter at the <b>exercise</b> screen such as the overall volume, volume of the metronome, and volume of the rhythm playback</span>
        </div>
    );
}

export function RefsInfoView(props: any) : React.ReactElement {
    const lrhy: string = "London, J. (2001a). Rhythm. Grove Music Online. Retrieved 5 Jun. 2022, from https://www.oxfordmusiconline.com/grovemusic/view/10.1093/gmo/9781561592630.001.0001/omo-9781561592630-e-0000045963.";

    const lm: string = "Lerdahl, F. and Jackendoff, R. (1981). On the Theory of Grouping and Meter. The Musical Quarterly, 67, 479–506.";

    const refs: string[] = [lm, lrhy];
    return (
        <div id="refsinfo">
        <ul>
        {refs.map( x => {return (<li>{x}</li>);})}
        </ul>
        </div>

    );
}

export function NoteDurView(props: any): React.ReactElement {
    return (
    <div id="notedurinfo" key="notedurinfo">
        <h1>Note Durations</h1>
        <h2>Quarter Notes</h2>
        <span>A <b>quarter note</b> in a x/4 meter has a duration of <b>one</b> beat. In the following image is a quarter <b>note</b> on the <b>left</b> and a quarter-note <b>rest</b> on the right.</span>
        <br />
        <img className="note_ex" src="img/olmits_qtr.png" alt="quarter note and quarter rest" />
        <h2>Eighth Notes</h2>
        <span>An <b>eighth note</b> in a x/4 meter has a duration of <b>one-half</b> of a beat and <b>subdivides</b> a beat into <b>two</b>. It has <b>one</b> line in its <b>beam</b>. In the following image are <b>two eighth notes</b> beamed (linked) together on the <b>left</b> and an <b>eighth-note rest followed by an eighth-note</b> on the right.</span>
        <br />

        <img className="note_ex" src="img/olmits_ei.png" alt="eighth-notes and an eighth-note rest" />

        <h2>Eighth-note Triplets</h2>
        <span>An <b>eighth-note triplet</b> in a x/4 meter has a duration of <b>one-third</b> of a beat and <b>subdivides</b> a beat into <b>two</b>. They look like eighth notes (it has <b>one</b> line in its <b>beam</b>) but has a <b>3 next to the beam</b> indicating that is a triplet. In the following image are <b>three eighth-note triplets</b> beamed (linked) together on the <b>left</b> and an <b>eighth-note triplet rest surrounded by eighth-note triplets</b> on the right (the rest being grouped with the triplet figure indicates that is it a triplet).</span>
        
        <br />
        <img className="note_ex" src="img/olmits_eit.png" alt="eighth-note triplets and an eighth-note triplet rest" />

        <h2>Sixteenth Notes</h2>
        <span>A <b>sixteenth-note</b> in a x/4 meter has a duration of <b>one-fourth</b> of a beat and <b>subdivides</b> a beat into <b>four</b>. It has <b>two</b> lines in its <b>beam</b>. In the following image are <b>four sixteenth notes</b> beamed (linked) together on the <b>left</b> and a <b>sixteenth note followed by a sixteenth-note rest followed by two sixteenth notes</b> on the right.</span>
        <br />

        <img className="note_ex" src="img/olmits_steen.png" alt="sixteenth notes and an sixteenth-note" />
        </div>
    );

}


export function NotesRView(props: any) : React.ReactElement {
    return (
            <div key="notesrestsinfo" id="notesrestsinfo">
               <h1>Notes and Rests</h1>
            <span><b>Notes</b> and <b>note rests</b> (or just rests) take up a <b>duration</b> of time. <b>Notes</b> are drawn as large dots with a stem (or line) pointing up or down coming out of one side. They indicate where you <b>play</b> or make noise. Notes sometimes have <b>beams</b> or <b>flags</b> attached to the side or top of a stem and are made up of one or more lines. <b>Note rests</b> look different (squiggles or small slanted lines with protuding thick bulbs) and indicate where you <b>do not play</b> (stay silent).</span>
            </div>
    );
}

export function BMeterView(props: any) : React.ReactElement {
    return (
       <div key="bmeterinfo" id="bmeterinfo"> 
            <h1>Beat</h1>
            <span>The <b>beat</b> in music refers to a perceptible duration of time that is more-or-less regular. Some authors refer to the beat as a sense of pulse (London, 2001a).</span>
           <h1>Meter</h1>
<span>Meter <b>groups beats</b> together into <b>measures</b> or <b>bars</b> (the "periodic alternation of strong and weak beats" to be specific (Lerdahl and Jackendoff, 1981)). Meter is indicated by <b>two numbers</b> on top of each other at the start of a stave (rows of lines where music notes are put) where the <b>top number</b> tellls <b>how many beats</b> per measure and the <b>bottom number</b> tells <b>which note duration</b> is the beat, where <b>4</b> means the <b>quarter note</b> is the beat (see below). In the following images are 2/4 meter and 3/4 meter indicators.</span>
           <br />
        <img className="note_ex" src="img/olmits_24.png" alt="2/4 meter" />
        <img className="note_ex" src="img/olmits_34.png" alt="3/4 meter" />
        <h1>Metronome</h1>
        <span>A metronome makes beeps or clicks on every beat and is a helpful tool for musicians to keep a steady sense of pulse. Here, the metronome beeps high on beginnings of measures and low for every other beat.</span>
    </div>

    );

}


export function Info(props:any) : React.ReactElement {    
    let info_st = {view: InfoViewType.app_intro};
    const [cur_info, use_info] = useState<InfoState>(info_st);

    const info_views = Object.values(InfoViewType);

    const infoview_click = (x: InfoViewType) => {
        let newview = {view: x};
        use_info(newview);
    };


    const info_viewselect = (x: InfoViewType, idx: number) => {
        let ckey: string = `${x}-btn`;
        return (
            <button className="subviewsel" key={ckey} type="button" id={ckey} onClick={() => infoview_click(x)}>
                {view_str[x]}
                </button>
        );
    };


    const info_visibility = (x: InfoViewType) => {
        let ret: string;
        if(cur_info.view == x) {
            ret = 'bigview2';
        }
        else {
        ret = 'noview';
        };

        return ret;
    };


        return (
            <div className="info_main">

            <div className="subheader" id="info_header">
                <span className="subtitle">{view_str[cur_info.view]}</span>
                <br/ >
                { info_views.map(
                (x: InfoViewType, y: number) => info_viewselect(x,y))}
            </div>


                {(cur_info.view == InfoViewType.app_intro) ? 
                (<div id="app_intro_div"
                    className={info_visibility(InfoViewType.app_intro)}>

                    <IntroInfoView />
                    </div> ) : null}



                {(cur_info.view == InfoViewType.app_ex) ? 
                (<div id="app_ex_div"
                    className={info_visibility(InfoViewType.app_ex)}>

                    <ExerciseInfoView />
                    </div> ) : null}

                {(cur_info.view == InfoViewType.app_progress) ? 
                (<div id="app_progress_div"
                    className={info_visibility(InfoViewType.app_progress)}>

                    <ProgressInfoView />
                    </div> ) : null}


                {(cur_info.view == InfoViewType.app_settings) ? 
                (<div id="app_settings_div"
                    className={info_visibility(InfoViewType.app_settings)}>

                    <SettingsInfoView />
                    </div> ) : null}



                {(cur_info.view == InfoViewType.music_bm) ? 
                (<div id="music_bm_div"
                    className={info_visibility(InfoViewType.music_bm)}>

                    <BMeterView />
                    </div> ) : null}


                {(cur_info.view == InfoViewType.music_nr) ? 
                (<div id="music_nr_div"
                    className={info_visibility(InfoViewType.music_nr)}>

                    <NotesRView />
                    </div> ) : null}

                {(cur_info.view == InfoViewType.music_nd) ? 
                (<div id="music_nd_div"
                    className={info_visibility(InfoViewType.music_nd)}>

                    <NoteDurView />
                    </div> ) : null}






                {(cur_info.view == InfoViewType.refs) ? 
                (<div id="refs_div"
                    className={info_visibility(InfoViewType.refs)}>

                    <RefsInfoView />
                    </div> ) : null}




            </div>
            
        );

}

