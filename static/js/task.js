/*

Full javascript/jspsych file for running complete experiment.

It's all in one file for easy copy/pasting into cognition.run.

It's sectioned into major headings with ========== for each of
====== Main Intro/Outro
====== Surveys (LUSK, FFMQ, etc.)
====== Breath Counting Task
====== N-Back Task

Each of the main tasks have subheadings marked with ********* for each of
*** variables
*** instructions
*** practice
*** test

*/

// ============================= CONSENT

/* INFORMATION SHEET */
var consent_form = {
  type: "external-html",
  url: "consent_form.html",
  cont_btn: "consent-pass",
  execute_script: true,
  css_classes: ["consent-form"]
};



// ============================= MAIN INTRO/OUTRO CONTENT

var fullscreen_off = {
  type: "fullscreen",
  fullscreen_mode: false,
  data: {"phase":"outro"}
};

var welcome_screen = {
  type: "html-button-response",
  choices: ["Continue"],
  data: {"phase":"intro"},
  timeline: [
    {"stimulus": welcome_msg1},
    {"stimulus": welcome_msg2},
  ]
};

var fullscreen_on = {
  type: "fullscreen",
  fullscreen_mode: true,
  button_label: "Continue",
  message: fullscreen_warning,
  data: {"phase":"intro"}
};

var closing_screen = {
  type: "html-button-response",
  choices: ["Close experiment"],
  stimulus: closing_msg,
  data: {"phase":"outro"}
};

// ============================ SURVEY CONTENT

// ***** variables

// ****** jspsych survey items

var madre_survey = {
  type: "survey-multi-choice",
  data: {phase:"madre"},
  questions: [
    {
      name: "MADRE1",
      required: true,
      prompt: "How often have you recalled your dreams recently (in the past several months)?",
      options: [
        "never",
        "less than once a month",
        "about once a month",
        "two or three times a month",
        "about once a week",
        "several times a week",
        "almost every morning"
      ]
    },
    {
      name: "MADRE2",
      required: true,
      prompt: `How often have you experienced nightmares recently (in the past several months)?<br>
        <i>Definition: Nightmares are dreams with strong negative emotion that result in awakening from the dreams. The dream plot can be recalled very vividly upon awakening.</i>`,
      options: [
        "never",
        "less than once a year",
        "about once a year",
        "about two to four times a year",
        "about once a month",
        "two to three times a month",
        "about once a week",
        "several times a week"
      ]
    },
    {
      name: "MADRE3",
      required: true,
      prompt: `How often do you experience so-called lucid dreams?<br>
        <i>Definition: In a lucid dream, one is aware that one is dreaming during the dream.</i>`,
      options: [
        "never",
        "less than once a year",
        "about once a year",
        "about two to four times a year",
        "about once a month",
        "two to three times a month",
        "about once a week",
        "several times a week"
      ]
    }
  ]
};

var lusk_survey = {
  type: "survey-html-form",
  preamble: lusk.preamble,
  html: generate_table_html(lusk.left_header,
    lusk.responses, lusk.prompts, lusk.acronym),
  data: {phase:"lusk"}
};

// this MUST be placed after the MADRE
var lusk_survey_conditional = {
  timeline: [lusk_survey],
  conditional_function: function() {
    var data = jsPsych.data.getLastTrialData().values()[0];
    // show if MADRE3/lucidity is NOT never
    return (data.response.MADRE3 !== "never");
  }
};

var ffmq_survey = {
  type: "survey-html-form",
  preamble: ffmq.preamble,
  html: generate_table_html(ffmq.left_header,
    ffmq.responses, ffmq.prompts, ffmq.acronym),
  data: {phase:"ffmq"}
};

var demographics = {
  type: "survey-html-form",
  html: demographics_html,
  data: {phase:"demographics"}
}

var lucid_categorization_loop = {
  timeline: [
    {
      type: "html-button-response",
      stimulus: lucid_example,
      choices: ["Non-lucid", "Lucid"],
      data: {phase: "lucid_definition"},
      prompt: "<p>Is this a lucid dream?</p>",
      data: {
        answer: 1, // 1 for lucid, bc it's the second choice
      },
      on_finish: function(data){
        var correct = (data.response == data.answer);
        data.correct = correct;
      }
    },
    {
      type: "html-keyboard-response",
      stimulus: function() {
        var correct = jsPsych.data.getLastTrialData().values()[0].correct;
        if (correct) {
          return "<p>CORRECT</p>";
        } else {
          return "<p>NOT CORRECT</p>";
        };
      },
      choices: jsPsych.NO_KEYS,
      trial_duration: 2000,
      // carry over from prev trial
      data: {
        phase: "lucid_definition",
        correct: function() {
          return jsPsych.data.getLastTrialData().values()[0].correct;
        }
      }
    }
  ],
  loop_function: function() {
    // repeat if NOT correct
    return (!jsPsych.data.getLastTrialData().values()[0].correct);
  }
};

var lucid_definition_trial = {
  type: "html-button-response",
  stimulus: lucid_definition,
  choices: ["Continue"],
  data: {phase:"lucid_definition"}
};





// ============================ BREATH COUNTING TASK STUFF


// ******* variables


function play_audio() {
  var audio = new Audio(audio_filename);
  audio.play();
};


// **** intro/instructions


var sound_tester = {
  timeline: [
    {
      type: "html-button-response",
      stimulus: sound_tst_msg,
      choices: ["Play sound", "Continue"],
      data: {phase:"bct-intro"},
      on_finish: function(data){
        if (data.response == 0) {
          play_audio();
        };
      }
    }
  ],
  loop_function: function() {
    // if 1 (Continue), move on, if 0 (Play sound) repeat
    return (!jsPsych.data.getLastTrialData().values()[0].response);
  }
};


// var instructions = {
//   type: "html-button-response",
//   choices: ["Continue"],
//   timeline: [
//     // {stimulus: msg0, choices: ["Play sound"], on_finish: play_audio},
//     {stimulus: msg1},
//     {stimulus: msg2},
//     {stimulus: msg3},
//     {stimulus: msg4},
//     {stimulus: msg5},
//   ]
// };
var instructions = {
  type: "instructions",
  pages: [msg1, msg2, msg3, msg4, msg5],
  show_clickable_nav: true,
  allow_keys: false,
  data: {phase:"bct-intro"},
  button_label_previous: "Previous",
  button_label_next: "Continue"
};
var button_checks = {
  type: "html-keyboard-response",
  data: {phase:"bct-intro"},
  timeline: [
    // {stimulus: msg6, choices: ["arrowdown"]},
    {stimulus: msg7, choices: ["arrowright"], on_finish: play_audio},
    // {stimulus: msg8, choices: [" "]},
  ]
};

var pre_bct_countdown = {
  type: "html-button-response",
  stimulus: msg9, //+ "<div id='clockstatement'>You may begin the task in <span id='clock'>0:05</span></div>",
  choices: ["Begin"],
  data: {phase:"bct-intro"},
  post_trial_gap: 1000,
  // on_load: function(){
  //   var wait_time = 5 * 1000; // in milliseconds
  //   var start_time = performance.now();
  //   document.querySelector("button").disabled = true;
  //   var interval = setInterval(function(){
  //     var time_left = wait_time - (performance.now() - start_time);
  //     var minutes = Math.floor(time_left / 1000 / 60);
  //     var seconds = Math.floor((time_left - minutes*1000*60)/1000);
  //     var seconds_str = seconds.toString().padStart(2,"0");
  //     document.querySelector("#clock").innerHTML = minutes + ":" + seconds_str;
  //     // document.querySelector("#clock").style.opacity = 1-(seconds/5);
  //     if(time_left <= 0){
  //       document.querySelector("#clockstatement").style.visibility = "hidden";
  //       document.querySelector("button").disabled = false;
  //       clearInterval(interval);
  //     };
  //   }, 250);
  // }
};

// var test_trial = {
//   type: "html-keyboard-response",
//   stimulus: '<p>You pressed <span id="arrow">left</span></p>',
//   choices: ["arrowleft"],
//   on_load: function(){
//     var wait_time = 5 * 1000; // in milliseconds
//     var start_time = performance.now();
//     var interval = setInterval(function(){
//       var time_left = wait_time - (performance.now() - start_time);
//       var minutes = Math.floor(time_left / 1000 / 60);
//       var seconds = Math.floor((time_left - minutes*1000*60)/1000);
//       document.querySelector("#arrow").style.opacity = seconds/5;
//       if(time_left <= 0){
//         clearInterval(interval);
//       };
//     }, 250);
//   }
// };

// *******************************


// var soundstims = [{sound:"audio/fly.wav"}];
// var soundtest = {
//   type: "html-keyboard-response",
//   stimulus: '<tr style="line-height:0"><th> <audio autoplay> <source src=' + soundstims[0].sound + '></audio></th></tr>',
//   choices: ["enter"] //jsPsych.ALL_KEYS
// };

var breath_count = 0;

function response_handler(data) {
  // after each button-press of the BCT
  // we need to do a few things.
  // 1. increment global breath counter (used to determine accuracy)
  // 2. get a *press-specific* accuracy (for practice feedback)
  //    - this is triggered if response is TOO FAST as well
  // 3. play (or don't play) audio

  // set correct to true and then adjust later if false
  var correct = true;

  if (data.response) { //null in the one case of a trial being cutoff at the end
    if (jsPsych.pluginAPI.compareKeys(data.response, " ")) {
      // if spacebar
      // reset counter and change correct to false
      breath_count = 0;
      correct = false;

    } else if (jsPsych.pluginAPI.compareKeys(data.response, "arrowdown")) {
      // if down arrow
      // increment counter and check the press is prior to 9
      breath_count++;
      if (breath_count >= 9) {
        correct = false;
      };

    } else if (jsPsych.pluginAPI.compareKeys(data.response, "arrowright")) {
      // if right arrow
      // play audio, check press is exactly 9 (ie, 8), and *then* reset counter
      play_audio();
      if (breath_count != 8) {
        correct = false;
      };
      breath_count = 0;
    };
    // final check to see if RT is too fast, but not on first breath
    if ((data.rt < min_breath_gap) & (breath_count > 1)) {
      correct = false;
    };

    // if it's practice and incorrect
    // reset the counter for display purposes
    if ((data.phase=="bct-practice") & (!correct)) {
      breath_count = 0;
    };        

    // add accuracy to the trial data structure so it gets saved
    data.correct = correct;

  };
};


var arrow_rows = [
  "<pre style='opacity:0.5;'>&downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &rightarrow;</pre>",
  "<pre>&downarrow;<span style='opacity:0.5;'> &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow;<span style='opacity:0.5;'> &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow;<span style='opacity:0.5;'> &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow; &downarrow;<span style='opacity:0.5;'> &downarrow; &downarrow; &downarrow; &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow; &downarrow; &downarrow;<span style='opacity:0.5;'> &downarrow; &downarrow; &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow;<span style='opacity:0.5;'> &downarrow; &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow;<span style='opacity:0.5;'> &downarrow; &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow;<span style='opacity:0.5;'> &rightarrow;</span></pre>",
  "<pre>&downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &downarrow; &rightarrow;</pre>",
];

function generate_prompt_html() {
  var arrows = arrow_rows[breath_count];
  if (breath_count == 0) {
    // a space just so the fixation doesn't bounce around
    var count_str = "<pre> </pre>";
  } else {
    var count_str = "<pre>" + breath_count.toString() + "</pre>";
  };
  return arrows + count_str
};

// set up a few different BCT press collection thingies
// they differ only in the amount of feedback/info provided
// practice_resp1 - resets if wrong and displays feedback
// practice_resp2 - resets if wrong
// experiment_resp - none of the above (just a fixation)
// (all are currently playing sound)
var conditional_feedback_display = {
  timeline: [
    {
      type: "html-button-response",
      data: {phase:"bct-practice"},
      stimulus: feedback_html,
      choices: ["Restart"],
    }
  ],
  conditional_function: function() {
    var data = jsPsych.data.getLastTrialData().values()[0];
    // show if NOT correct, unless they pressed spacebar
    return (!(data.correct) & !(jsPsych.pluginAPI.compareKeys(data.response, " ")));
  },
};

var correct_practice_counter = 0;
function check_if_repeat_practice() {
  // only move on if correct on the 9th right arrow press
  // for the SECOND time
  //
  // this is where the warning is coming from.
  // response is sometimes a 0 bc it comes from the button response
  // from Restarting after feedback. It's a deprecation warning
  // about comparing keycodes, safe to ignore.
  var response = jsPsych.data.getLastTrialData().values()[0].response;
  var correct = jsPsych.data.getLastTrialData().values()[0].correct;
  if (correct & (jsPsych.pluginAPI.compareKeys(response, "arrowright"))) {
    correct_practice_counter++;
  };
  if (correct_practice_counter == 2) {
    return false; // dont repeat
  } else {
    return true; // DO IT AGAINNNNN
  }
};

var practice1_procedure = {
  timeline: [
    { // BCT response collection, resets if wrong and displays feedback
      type: "html-keyboard-response",
      stimulus: "<p>Let's practice.</p>"
        + "<p>Breath at a comfortable slow pace through your nose"
        + "<br>while pressing <code>&downarrow;</code> on breaths 1-8 and <code>&rightarrow;</code> on 9.</p>"
        + "<p>Remember you can press the spacebar at any time to reset the counter.</p>"
        + fixation_html,
      choices: response_keys,
      response_ends_trial: true,
      on_finish: response_handler,
      data: {phase:"bct-practice"},
      // data: { //this stuff gets ADDED to the trial data structure
      //   "practice": true
      // },
      prompt: generate_prompt_html
    },
    conditional_feedback_display
  ],
  loop_function: check_if_repeat_practice
  // on_timeline_start: function() {
  //   trial_count++;
  //   console.log(trial_count);
  // },
  // on_timeline_finish: function() {
  //     console.log("Block ended, breath count at ", breath_count);
  // }
};

var mid_practice_msg = {
  type: "html-button-response",
  data: {phase:"bct-practice"},
  stimulus: `<p>Great!</p>
    <p>Now try repeating the same process without visual feedback.</p>
    <p>You will only see a cross in the center of the screen while
    <br>you count your breaths and press the buttons as before.</p>
    <br><br>`,
  choices: ["Begin"],
};

var reset_practice_trial_counter = {
  type: "call-function",
  data: {phase:"bct-practice"},
  func: function() {
  // reset this from the first practice round
  // (this means it takes the same amount of correct trials)
    correct_practice_counter = 0;
  },
};

var practice2_procedure = {
  timeline: [
    { // BCT response collection, resets if wrong
      // (same as practice1 but without prompt)
      type: "html-keyboard-response",
      stimulus: fixation_html,
      choices: response_keys,
      response_ends_trial: true,
      on_finish: response_handler,
      data: {phase:"bct-practice"}
    },
    conditional_feedback_display
  ],
  loop_function: check_if_repeat_practice
};

// var breath_counting_set = {
//   type: "bct-set",
//   // stimulus: "<p style='font-size:60px'>+</p>",
//   // choices: ["arrowdown", "arrowright", " ", "q"],
//   restrict_speed: true,
//   show_count: true,
//   // on_start: function(trial) {
//   //   console.log(trial);
//   // }
// };

var bct_response = {
  // BCT response collection, no feedback or anything
  type: "html-keyboard-response",
  stimulus: fixation_html,
  choices: response_keys,
  response_ends_trial: true,
  on_finish: response_handler,
  data: {
    phase: "bct-test",
    breath_count: function() {
      return breath_count;
    }
  }
};

// var timeout = false;
function timer_init() {
  setTimeout(function(){
    jsPsych.endCurrentTimeline();
    jsPsych.finishTrial();
    // timeout = true;
  }, length_ms);
  // setInterval(function(){
  //   var cur_progress = jsPsych.getProgressBarCompleted();
  //   jsPsych.setProgressBar(cur_progress + pbar_frac);
  // }, pbar_ms);
};

var timer_start = {
  type: "call-function",
  data: {phase:"bct-practice"},
  func: timer_init
  // func: function(){
  //     setTimeout(function(){ jsPsych.endExperiment("Experiment over"); }, length_ms);
  // }
  // jsPsych.finishTrial(data)
  // jsPsych.endCurrentTimeline()
  // jsPsych.endExperiment(end_message)
};

var infinite_loop = {
  timeline: [bct_response],
  repetitions: 10000, // an arbitrarily high number of trials
  // on_start: function(){return !(timeout);}
  // on_timeline_start: function() {
  //     console.log("Block started, breath count at ", breath_count);
  // },
  // on_timeline_finish: function() {
  //     console.log("Block ended, breath count at ", breath_count);
  // }
};



/*************************************************
===========      N-BACK TASK       ===============
*************************************************/


// **** variables



// **** instructions

var nback_welcome_screen = {
  type: "html-button-response",
  stimulus: nback_welcome_msg,
  choices: ["Begin"]
};

var nback_instructions = {
  type: "instructions",
  pages: [nback_instructions_msg1, nback_instructions_msg2],
  show_clickable_nav: true,
  allow_keys: false,
  data: {phase:"nback-intro"},
  button_label_previous: "Previous",
  button_label_next: "Continue"
};

// var instructions_3 = {
//   type: 'html-button-response',
//   stimulus: ''+
//     '<p>Remember: press the M key if the letter on the screen matches the letter that appeared two letters ago.</p>'+
//   choices: ["I'm ready to start!"],
//   post_trial_gap: 1000
// }
// timeline.push(instructions_3);

/* feedback */
var nback_total_feedback = {
  type: "html-button-response",
  stimulus: function(){
    var test_trials = jsPsych.data.get().filter({phase: 'nback-test'}).last(nback_n_trials-how_many_back);
    var n_match = test_trials.filter({match: true}).count();
    var n_nonmatch = test_trials.filter({match: false}).count();
    var n_correct = test_trials.filter({match: true, correct: true}).count();
    var false_alarms = test_trials.filter({match: false, correct: false}).count();
    var html = `<p>All done!</p>
      <p>You correctly identified ${n_correct} of the ${n_match} matching items.</p><br><br>`;
    return html;
  },
  choices: ["End experiment"]
};



let letter = "";

var text_obj = {
  obj_type: "text",
  content: letter,
  font: "normal 60px sans-serif",
  startX: "center",
  startY: "center",
  origin_center: true,
  show_start_time: 0,
  show_end_time: nback_encoding_length,
  text_color: "black",
};


// var test_trials = jsPsych.data.get().filter({phase: 'nback-test'}).last(nback_n_trials-how_many_back);
// var n_match = test_trials.filter({match: true}).count();
// var n_nonmatch = test_trials.filter({match: false}).count();

let trial_counter = 1; // resets at each new block for getting new stims

function reset_nback_stimulus() {
  // pick the letter/stimulus
  var phase = jsPsych.timelineVariable("phase");
  if(trial_counter < how_many_back){
    letter = jsPsych.randomization.sampleWithoutReplacement(nback_stimuli, 1)[0]
  } else {
    var match_letter = jsPsych.data.get().filter({phase:phase}).last(how_many_back).values()[0].letter;
    if(jsPsych.timelineVariable("match", true) == true){
      letter = match_letter;
    } else {
      // grab 2 letters at random and make sure it's not the match letter :/
      var possible_letters = jsPsych.randomization.sampleWithoutReplacement(nback_stimuli, 2);
      if(possible_letters[0] != match_letter){
        letter = possible_letters[0];
      } else {
        letter = possible_letters[1];
      };
    };
  };
  // reset the jspsychophys stimulus
  text_obj.font = "normal 60px sans-serif";
  text_obj.text_color = "black";
  text_obj.content = letter;
  // var data = jsPsych.data.getLastTrialData().values()[0];
  // console.log(data);
  return text_obj;
};

var nback_trial = {
  type: "psychophysics",
  canvas_height: 500,
  trial_duration: nback_encoding_length+nback_iti,
  // prompt: '<p>Pressing the ArrowUp/ArrowDown key, the color of the circle will change. <br>Press the space key to finish the program.</p>',
  stimuli: [reset_nback_stimulus], // These can be referenced using the jsPsych.currentTrial().stimuli array.
  response_type: "key",
  choices: ["m"],
  response_start_time: 100,
  response_ends_trial: false,
  data: {
    phase: jsPsych.timelineVariable("phase"),
    // match: function(){return jsPsych.timelineVariable("match", true);},
    match: jsPsych.timelineVariable("match"),
    letter: function(){return letter;}, // could also pull this from sequence variable
  },
  key_down_func: function(event){ // The key_up_func is also available. In that case, the color of the circle changes when you release the key. 
    if (event.key === "m") {
      if (jsPsych.timelineVariable("match", true) == true) {
        jsPsych.currentTrial().stim_array[0].text_color = "green";
        jsPsych.currentTrial().stim_array[0].font = "bold 60px sans-serif";
      } else {
        jsPsych.currentTrial().stim_array[0].text_color = "red";
        jsPsych.currentTrial().stim_array[0].font = "bold 60px sans-serif";
      };
    };
  },
  on_finish: function(data) {
    if (data.match == true) {
      data.correct = (data.key_press != null);
    } else if (data.match == false) {
      data.correct = (data.key_press === null);
    };
    // console.log(data);
  }
};



const nback_practice_trial_vars = [
  {match: true, phase: "nback-practice"},
  {match: false, phase: "nback-practice"}
]

const nback_trial_vars = [
  {match: true, phase: "nback-test"},
  {match: false, phase: "nback-test"}
]

var nback_sequence = {
  timeline: [nback_trial],
  timeline_variables: nback_trial_vars,
  on_start: function(){trial_counter++;},
  sample: {
    type: "with-replacement",
    size: nback_n_trials,
    weights: [1, 2]
  }
};

var nback_practice_sequence = {
  timeline: [nback_trial],
  timeline_variables: nback_practice_trial_vars,
  on_start: function(){trial_counter++;},
  sample: {
    type: "with-replacement",
    size: nback_n_practice_trials,
    weights: [1, 2]
  }
};

function check_pass_practice() {
  var test_trials = jsPsych.data.get().filter({phase: "nback-practice"}).last(nback_n_practice_trials-how_many_back);
  var n_match = test_trials.filter({match: true}).count();
  var n_nonmatch = test_trials.filter({match: false}).count();
  var n_correct = test_trials.filter({match: true, correct: true}).count();
  var n_false_alarms = test_trials.filter({match: false, correct: false}).count();
  if ((n_correct >= nback_correct2pass) & (n_false_alarms <= nback_max_FA2pass)) {
    return true;
  } else {
    return false;
  };
};

var nback_practice_feedback = {
  type: "html-button-response",
  choices: ["Okay"],
  post_trial_gap: 1000,
  stimulus: function(){
    if (check_pass_practice()) {
      return nback_pass_practice_feedback;
    } else {
      return nback_redo_practice_feedback;
    };
  }
};

var nback_practice_loop = {
  timeline: [nback_instructions,
    nback_practice_sequence,
    nback_practice_feedback],
  loop_function: function(){
    return !(check_pass_practice());
  },
  on_start: function(){trial_counter = 1;}
};





// ==============  BUILD TIMELINE  ==============

var timeline = [];

// intro stuff
timeline.push(consent_form);
timeline.push(welcome_screen);
timeline.push(fullscreen_on);

// survey info
timeline.push(demographics);
// timeline.push(lucid_definition_trial);
// timeline.push(lucid_categorization_loop);
timeline.push(madre_survey);
timeline.push(lusk_survey_conditional);
timeline.push(ffmq_survey);

// breath counting task
timeline.push(sound_tester);
timeline.push(instructions);
timeline.push(button_checks);
timeline.push(practice1_procedure);
timeline.push(mid_practice_msg);
timeline.push(reset_practice_trial_counter);
timeline.push(practice2_procedure);
timeline.push(pre_bct_countdown);
timeline.push(timer_start);
timeline.push(infinite_loop);

// nback
timeline.push(nback_welcome_screen);
timeline.push(nback_practice_loop);
timeline.push(nback_sequence);
timeline.push(nback_total_feedback);

// outro stuff
timeline.push(closing_screen);
// timeline.push(fullscreen_off);


// ====================== run it

jsPsych.init({
  timeline: timeline,
  exclusions: {
    audio: true
  },
  // use_webaudio: true,
  // override_safe_mode: false,
  // show_progress_bar: true,
  // auto_update_progress_bar: true,
  // message_progress_bar: "Time remaining",
  // timeline: [timeline, if_node],
  // on_interaction_data_update: function(data) {
  //   jsPsych.data.write(data);
  // },
  on_finish: function() {
    // jsPsych.setProgressBar(1);
    // jsPsych.data.displayData("json");
    // jsPsych.data.get().localSave("csv", "sample.csv");
    window.location = "https://pallerlab.psych.northwestern.edu/";
  }
});
