/// <reference path="./global.d.ts" />
import React, { useState } from 'react';
import * as Misc from './misc';
var InfoViewType;
(function (InfoViewType) {
    InfoViewType["app_intro"] = "app_intro";
    InfoViewType["app_ex"] = "app_ex";
    InfoViewType["app_progress"] = "app_progress";
    InfoViewType["app_settings"] = "app_settings";
    InfoViewType["music_bm"] = "music_bm";
    InfoViewType["music_nr"] = "music_nr";
    InfoViewType["music_nd"] = "music_nd";
    InfoViewType["refs"] = "refs";
})(InfoViewType || (InfoViewType = {}));
const view_str = { app_intro: "Intro/Selection (app)", app_ex: "Exercise (app)", app_progress: "Progress (app)", app_settings: "Header/Settings (app)", music_nd: "Note Durations (music)", music_nr: "Notes/Rests (music)", music_bm: "Beats/Meter (music)", refs: "(references)" };
export function IntroInfoView(props) {
    return (React.createElement("div", { key: "introinfo", id: "introinfo" },
        React.createElement("h1", null, "Basic Information"),
        React.createElement("span", null,
            "The tutoring system teaches you how to ",
            React.createElement("b", null, "read and understand rhythm"),
            ". It tests your understanding of rhythm through ",
            React.createElement("b", null, "recording your performances of rhythm (through tapping, clapping, etc.) via microphone"),
            " (or ",
            React.createElement("b", null, "optionally keyboard input"),
            " although microphone input is preferred). If you are using the microphone input, it is recommended to ",
            React.createElement("b", null, "use headphones"),
            ". Rhythms are shown usually through ",
            React.createElement("b", null, "music notation"),
            " but are also shown in ",
            React.createElement("b", null, "shorthand"),
            " in various places using ",
            React.createElement("b", null, "-"),
            " for rests and ",
            React.createElement("b", null, "x"),
            " for notes."),
        React.createElement("h1", null, "Exercise Selection"),
        React.createElement("span", null,
            "You can access rhythms to practice using the ",
            React.createElement("b", null, "Selection screen"),
            ". You can choose what note durations in rhythms you want to focus on using the ",
            React.createElement("b", null, "Select Focus"),
            " dropdown. You can also select what note durations you want to include in your exercises using the ",
            React.createElement("b", null, "toggle boxes"),
            " next to each note duration. You can also select the number of exercises you want to tackle at each time using the ",
            React.createElement("b", null, "Number of Exercises"),
            " slider (and click ",
            React.createElement("b", null, "Get Exercises"),
            " to actually get them). The exercises are separated by ",
            React.createElement("b", null, "meter"),
            " and the progress bars tell you ",
            React.createElement("b", null, "how much progress"),
            " you've made overall and with respect to each duration. Some options ",
            React.createElement("b", null, "might not be available"),
            " to you (in both the dropdown and the toggle boxes) because you have not made enough progress in the immediately preceding note duration skill (with quarter notes being the \"easiest\" and always available and the note durations getting more difficult as you glance down the column). The ",
            React.createElement("b", null, "skill threshold"),
            " to open up new options is ",
            React.createElement("span", null,
                Misc.skill_thresh,
                "%"),
            " and the ",
            React.createElement("b", null, "number of instances to master"),
            " a rhythm pattern is ",
            React.createElement("span", null, Misc.num_to_master),
            ". Progress percentages for skills below a threshold are highlighted in ",
            React.createElement("span", { className: "belowthresh" }, "red"),
            ", percentages below the maxmimum but above the threshold are highlighted in ",
            React.createElement("span", { className: "abovethresh" }, "yellow/orange"),
            ", and percentages that are at a maxmium are highlithed in ",
            React.createElement("span", { className: "atmax" }, "green"),
            ".")));
}
export function ExerciseInfoView(props) {
    return (React.createElement("div", { key: "exerciseinfo", id: "exerciseinfo" },
        React.createElement("h1", null, "Features"),
        React.createElement("span", null,
            "Here is where you can ",
            React.createElement("b", null, "read"),
            " and ",
            React.createElement("b", null, "perform"),
            " rhythm exercises. This tutoring system detects how you play rhythms through detecting attacks (taps, claps, clicks, etc.) from the ",
            React.createElement("b", null, "microphone"),
            " input (or through keyboard input if so desired). The ",
            React.createElement("b", null, "Detected Input"),
            " field shows how your attack is and flashes green when it detects attacks. How sensitive the system is to your taps can be adjusted by the ",
            React.createElement("b", null, "Input Sensitivity"),
            " slider so if the number is changing too often (even when you don't tap), adjust the value higher. The ",
            React.createElement("b", null, "bpm"),
            " slider affects how fast playback or recording goes so if things are too fast, adjust the slider to a lower value. Toggling the ",
            React.createElement("b", null, "Use Shift Keys Instead of Microphone"),
            " checkbox enables keyboard input and gates the attack information (the microphone input is still being detected, just not used). If you are using the microphone input, it is recommended to ",
            React.createElement("b", null, "use headphones"),
            " (or else the microphone will pick up what is being played by the speakers). To get an understanding of what the rhythm sounds like, check the ",
            React.createElement("b", null, "Play Back Rhythm"),
            " toggle. You will notice that there are beeps before the playback actually starts. This happens with recording too and this ",
            React.createElement("b", null, "count-in"),
            " (specified in number of beats) lets you know how fast the rhythm is going before actually listening to it or playing it. The ",
            React.createElement("b", null, "beeps"),
            " are the ",
            React.createElement("b", null, "metronome"),
            " (with high beeps on beginnings of measures, low beeps on other beats, and an additional chime when the rhythm example starts) helps you keep track of the beat and can be disabled for more of a challenge. The ",
            React.createElement("b", null, "Current Count"),
            " gives you the beat visually for extra help."),
        React.createElement("h1", null, "Rhythm Grading"),
        React.createElement("span", null,
            "The tutoring system allows for you to record your rhythm performances using the ",
            React.createElement("b", null, "Record Performance"),
            " toggle. The tutoring system keeps tracks of which beats you play correctly and which you do not play correctly and notifies you of the mistakes in ",
            React.createElement("b", null, "Current Beat Mistakes"),
            " and ",
            React.createElement("b", null, "Number of Beats Wrong"),
            ", giving you the exact beats where mistakes occur and the rhythmic patterns in those beats. These won't affect your overall skill progress until you progress to the next example (or go back to the selction screen if no more examples left) by clicking the ",
            React.createElement("b", null, "Accept Performance and Progress"),
            " button (note that until you record a performance, all beats count as a mistake). The number of tries you have left is given by the ",
            React.createElement("b", null, "Number of Tries Left"),
            " field (note that toggling the Record Performance box uses up a try even if you don't finish a performance. ",
            React.createElement("b", null, "Exercises Left"),
            " gives the number of exercises left (not counting the current exercise).")));
}
export function ProgressInfoView(props) {
    return (React.createElement("div", { key: "progressinfo", id: "progressinfo" },
        React.createElement("span", null,
            "Here is where you can find the progress you've made with the tutor overall or in specific meters. The actual progress actively being tracked is with respect to individual rhythms (labeled with -'s and x's), but the tutor collates this information for you into larger categories. The categories such as ",
            React.createElement("span", { className: "o0" }, "\"Downbeat\""),
            ", ",
            React.createElement("span", { className: "o1" }, "\"Second Subdivision"),
            ", ",
            React.createElement("span", { className: "o2" }, "\"Third Subdivision\""),
            ", and ",
            React.createElement("span", { className: "o3" }, "\"Fourth Subdivision\""),
            " refer to where actual notes (not rests) of rhythms begin with respect to the beat (and are color-coded with their individual rhythms for clarity). ",
            React.createElement("b", null, "Downbeat"),
            " refers to rhythms that begin on the beat, ",
            React.createElement("b", null, "Second Subdivision"),
            " refers to patterns that begin on the second subdivision of the beat (see Note Durations), and so on. The tutor also provides an overall view of progress with respect to meters and collates the information from each meter into an ",
            React.createElement("b", null, "overall"),
            " view of progress over both meters.")));
}
export function SettingsInfoView(props) {
    return (React.createElement("div", { key: "settingsinfo", id: "settingsinfo" },
        React.createElement("h1", null, "Header"),
        React.createElement("span", null, "At the top of the screen is where you can load and save user files. You can enter your username (no spaces please) and clicking the \"Save User\" file will save your progress as a text file in \"public/save\" as \"(user).txt.\" Entering a username and clicking \"Load User\" will attempt to load from \"(user).txt\" in the same folder."),
        React.createElement("h1", null, "Settings"),
        React.createElement("span", null,
            "Here you can adjust the volumes of various things that you will encounter at the ",
            React.createElement("b", null, "exercise"),
            " screen such as the overall volume, volume of the metronome, and volume of the rhythm playback")));
}
export function RefsInfoView(props) {
    const lrhy = "London, J. (2001a). Rhythm. Grove Music Online. Retrieved 5 Jun. 2022, from https://www.oxfordmusiconline.com/grovemusic/view/10.1093/gmo/9781561592630.001.0001/omo-9781561592630-e-0000045963.";
    const lm = "Lerdahl, F. and Jackendoff, R. (1981). On the Theory of Grouping and Meter. The Musical Quarterly, 67, 479–506.";
    const refs = [lm, lrhy];
    return (React.createElement("div", { id: "refsinfo" },
        React.createElement("ul", null, refs.map(x => { return (React.createElement("li", null, x)); }))));
}
export function NoteDurView(props) {
    return (React.createElement("div", { id: "notedurinfo", key: "notedurinfo" },
        React.createElement("h1", null, "Note Durations"),
        React.createElement("h2", null, "Quarter Notes"),
        React.createElement("span", null,
            "A ",
            React.createElement("b", null, "quarter note"),
            " in a x/4 meter has a duration of ",
            React.createElement("b", null, "one"),
            " beat. In the following image is a quarter ",
            React.createElement("b", null, "note"),
            " on the ",
            React.createElement("b", null, "left"),
            " and a quarter-note ",
            React.createElement("b", null, "rest"),
            " on the right."),
        React.createElement("br", null),
        React.createElement("img", { className: "note_ex", src: "img/olmits_qtr.png", alt: "quarter note and quarter rest" }),
        React.createElement("h2", null, "Eighth Notes"),
        React.createElement("span", null,
            "An ",
            React.createElement("b", null, "eighth note"),
            " in a x/4 meter has a duration of ",
            React.createElement("b", null, "one-half"),
            " of a beat and ",
            React.createElement("b", null, "subdivides"),
            " a beat into ",
            React.createElement("b", null, "two"),
            ". It has ",
            React.createElement("b", null, "one"),
            " line in its ",
            React.createElement("b", null, "beam"),
            ". In the following image are ",
            React.createElement("b", null, "two eighth notes"),
            " beamed (linked) together on the ",
            React.createElement("b", null, "left"),
            " and an ",
            React.createElement("b", null, "eighth-note rest followed by an eighth-note"),
            " on the right."),
        React.createElement("br", null),
        React.createElement("img", { className: "note_ex", src: "img/olmits_ei.png", alt: "eighth-notes and an eighth-note rest" }),
        React.createElement("h2", null, "Eighth-note Triplets"),
        React.createElement("span", null,
            "An ",
            React.createElement("b", null, "eighth-note triplet"),
            " in a x/4 meter has a duration of ",
            React.createElement("b", null, "one-third"),
            " of a beat and ",
            React.createElement("b", null, "subdivides"),
            " a beat into ",
            React.createElement("b", null, "two"),
            ". They look like eighth notes (it has ",
            React.createElement("b", null, "one"),
            " line in its ",
            React.createElement("b", null, "beam"),
            ") but has a ",
            React.createElement("b", null, "3 next to the beam"),
            " indicating that is a triplet. In the following image are ",
            React.createElement("b", null, "three eighth-note triplets"),
            " beamed (linked) together on the ",
            React.createElement("b", null, "left"),
            " and an ",
            React.createElement("b", null, "eighth-note triplet rest surrounded by eighth-note triplets"),
            " on the right (the rest being grouped with the triplet figure indicates that is it a triplet)."),
        React.createElement("br", null),
        React.createElement("img", { className: "note_ex", src: "img/olmits_eit.png", alt: "eighth-note triplets and an eighth-note triplet rest" }),
        React.createElement("h2", null, "Sixteenth Notes"),
        React.createElement("span", null,
            "A ",
            React.createElement("b", null, "sixteenth-note"),
            " in a x/4 meter has a duration of ",
            React.createElement("b", null, "one-fourth"),
            " of a beat and ",
            React.createElement("b", null, "subdivides"),
            " a beat into ",
            React.createElement("b", null, "four"),
            ". It has ",
            React.createElement("b", null, "two"),
            " lines in its ",
            React.createElement("b", null, "beam"),
            ". In the following image are ",
            React.createElement("b", null, "four sixteenth notes"),
            " beamed (linked) together on the ",
            React.createElement("b", null, "left"),
            " and a ",
            React.createElement("b", null, "sixteenth note followed by a sixteenth-note rest followed by two sixteenth notes"),
            " on the right."),
        React.createElement("br", null),
        React.createElement("img", { className: "note_ex", src: "img/olmits_steen.png", alt: "sixteenth notes and an sixteenth-note" })));
}
export function NotesRView(props) {
    return (React.createElement("div", { key: "notesrestsinfo", id: "notesrestsinfo" },
        React.createElement("h1", null, "Notes and Rests"),
        React.createElement("span", null,
            React.createElement("b", null, "Notes"),
            " and ",
            React.createElement("b", null, "note rests"),
            " (or just rests) take up a ",
            React.createElement("b", null, "duration"),
            " of time. ",
            React.createElement("b", null, "Notes"),
            " are drawn as large dots with a stem (or line) pointing up or down coming out of one side. They indicate where you ",
            React.createElement("b", null, "play"),
            " or make noise. Notes sometimes have ",
            React.createElement("b", null, "beams"),
            " or ",
            React.createElement("b", null, "flags"),
            " attached to the side or top of a stem and are made up of one or more lines. ",
            React.createElement("b", null, "Note rests"),
            " look different (squiggles or small slanted lines with protuding thick bulbs) and indicate where you ",
            React.createElement("b", null, "do not play"),
            " (stay silent).")));
}
export function BMeterView(props) {
    return (React.createElement("div", { key: "bmeterinfo", id: "bmeterinfo" },
        React.createElement("h1", null, "Beat"),
        React.createElement("span", null,
            "The ",
            React.createElement("b", null, "beat"),
            " in music refers to a perceptible duration of time that is more-or-less regular. Some authors refer to the beat as a sense of pulse (London, 2001a)."),
        React.createElement("h1", null, "Meter"),
        React.createElement("span", null,
            "Meter ",
            React.createElement("b", null, "groups beats"),
            " together into ",
            React.createElement("b", null, "measures"),
            " or ",
            React.createElement("b", null, "bars"),
            " (the \"periodic alternation of strong and weak beats\" to be specific (Lerdahl and Jackendoff, 1981)). Meter is indicated by ",
            React.createElement("b", null, "two numbers"),
            " on top of each other at the start of a stave (rows of lines where music notes are put) where the ",
            React.createElement("b", null, "top number"),
            " tellls ",
            React.createElement("b", null, "how many beats"),
            " per measure and the ",
            React.createElement("b", null, "bottom number"),
            " tells ",
            React.createElement("b", null, "which note duration"),
            " is the beat, where ",
            React.createElement("b", null, "4"),
            " means the ",
            React.createElement("b", null, "quarter note"),
            " is the beat (see below). In the following images are 2/4 meter and 3/4 meter indicators."),
        React.createElement("br", null),
        React.createElement("img", { className: "note_ex", src: "img/olmits_24.png", alt: "2/4 meter" }),
        React.createElement("img", { className: "note_ex", src: "img/olmits_34.png", alt: "3/4 meter" }),
        React.createElement("h1", null, "Metronome"),
        React.createElement("span", null, "A metronome makes beeps or clicks on every beat and is a helpful tool for musicians to keep a steady sense of pulse. Here, the metronome beeps high on beginnings of measures and low for every other beat.")));
}
export function Info(props) {
    let info_st = { view: InfoViewType.app_intro };
    const [cur_info, use_info] = useState(info_st);
    const info_views = Object.values(InfoViewType);
    const infoview_click = (x) => {
        let newview = { view: x };
        use_info(newview);
    };
    const info_viewselect = (x, idx) => {
        let ckey = `${x}-btn`;
        return (React.createElement("button", { className: "subviewsel", key: ckey, type: "button", id: ckey, onClick: () => infoview_click(x) }, view_str[x]));
    };
    const info_visibility = (x) => {
        let ret;
        if (cur_info.view == x) {
            ret = 'bigview2';
        }
        else {
            ret = 'noview';
        }
        ;
        return ret;
    };
    return (React.createElement("div", { className: "info_main" },
        React.createElement("div", { className: "subheader", id: "info_header" },
            React.createElement("span", { className: "subtitle" }, view_str[cur_info.view]),
            React.createElement("br", null),
            info_views.map((x, y) => info_viewselect(x, y))),
        (cur_info.view == InfoViewType.app_intro) ?
            (React.createElement("div", { id: "app_intro_div", className: info_visibility(InfoViewType.app_intro) },
                React.createElement(IntroInfoView, null))) : null,
        (cur_info.view == InfoViewType.app_ex) ?
            (React.createElement("div", { id: "app_ex_div", className: info_visibility(InfoViewType.app_ex) },
                React.createElement(ExerciseInfoView, null))) : null,
        (cur_info.view == InfoViewType.app_progress) ?
            (React.createElement("div", { id: "app_progress_div", className: info_visibility(InfoViewType.app_progress) },
                React.createElement(ProgressInfoView, null))) : null,
        (cur_info.view == InfoViewType.app_settings) ?
            (React.createElement("div", { id: "app_settings_div", className: info_visibility(InfoViewType.app_settings) },
                React.createElement(SettingsInfoView, null))) : null,
        (cur_info.view == InfoViewType.music_bm) ?
            (React.createElement("div", { id: "music_bm_div", className: info_visibility(InfoViewType.music_bm) },
                React.createElement(BMeterView, null))) : null,
        (cur_info.view == InfoViewType.music_nr) ?
            (React.createElement("div", { id: "music_nr_div", className: info_visibility(InfoViewType.music_nr) },
                React.createElement(NotesRView, null))) : null,
        (cur_info.view == InfoViewType.music_nd) ?
            (React.createElement("div", { id: "music_nd_div", className: info_visibility(InfoViewType.music_nd) },
                React.createElement(NoteDurView, null))) : null,
        (cur_info.view == InfoViewType.refs) ?
            (React.createElement("div", { id: "refs_div", className: info_visibility(InfoViewType.refs) },
                React.createElement(RefsInfoView, null))) : null));
}
