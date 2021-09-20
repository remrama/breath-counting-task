// *********************
// ** setup variables **

var timeline = [];

var bct_length_minutes = 10; // of the whole breathing task (not including instructions)
var length_ms = bct_length_minutes*60*1000;
var pbar_frac = .1; // fraction for progress bar (it will jump this pct)
var pbar_ms = pbar_frac * length_ms

var min_breath_gap = 1000; // ms between breaths for practice warning
var fixation_html = "<p style='font-size:60px'>+</p>";
var response_keys = ["arrowdown", "arrowright", " "];

var feedback_html = "<p>You responded either incorrectly or too fast.</p>"
  + "<p>Let's restart the counter.</p>"
  + "<p>Make sure you press <code>&downarrow;</code> only once for each exhale,"
  + "<br>and then press <code>&rightarrow;</code> on the 9th exhale.</p>"
  + "<br><br>";

function play_audio() {
  var audio = new Audio("sound.mp3");
  audio.play();
};

// *********************



// *******************************
// ** beginning messages/trials **
var msg1 = `<p>In this task, we would like you to be aware of your breath.<p>
  <p>Please be aware of the movement of breath in and out
  <br>in the space below your nose and above your upper lip.<p>
  <p>There's no need to control the breath.
  <br>Just breathe at a comfortable slow pace
  <br>and try to breathe through your nostrils if you can.</p>
  <br><br>`;
var msg2 = `<p>At some point, you may notice
  <br>your attention has wandered from the breath.</p>
  <p>That's okay. Just gently place it back on the breath.</p>
  <br><br>`;
var msg3 = `<p>To help attention stay with the breath,<br>
  you'll use a small part of your attention<br>
  to silently count breaths from 1 to 9, again and again.</p>
  <p>An in and out breath together makes one count.<br>
  Say the count softly in your mind so it only gets a little attention<br>
  while most of the attention is on feeling the breath.</p>
  <p>Please press the Down Arrow (<code>&downarrow;</code>) with breaths 1-8,<br>
  and the Right Arrow (<code>&rightarrow;</code>) with breath 9.</p>
  <p>This means you'll be pressing a button with each breath.</p><br><br>`;
var msg4 = "<p>If you find that you have forgotten the count,"
  + "<br>just press the spacebar and restart the count at 1 with the next breath.</p>"
  + "<p>Do not count the breaths using your fingers but only in your head.</p>"
  + "<br><br>";
var msg5 = "<p>We suggest you sit in an upright,"
  + "<br>relaxed posture that feels comfortable.</p>"
  + "<p>Please keep your eyes at least partly open"
  + "<br>and resting on the screen during the experiment.</p>"
  + "<p>The task will last about " + bct_length_minutes + " minutes after a brief practice.</p>"
  + "<br><br>";
var msg6 = `<p>Press the <code>&downarrow;</code> key.</p>
  <br><br>`;
var msg7 = `<p>On every <code>&rightarrow;</code> press, you will hear a sound.</p>
  <p>Press the <code>&rightarrow;</code> key.</p>
  <br><br>`;
var msg8 = `<p>Press the spacebar.</p>
  <br><br>`;
var msg9 = "<p>Great!</p>"
  + "<p>The task will begin now.</p>"
  + "<p>The progress bar at the top is only a " + bct_length_minutes + " minute timer"
  + "<br>and is not affected by your breathing pace or accuracy.</p>"
  + "<p>The experiment will end after " + bct_length_minutes + " minutes.</p>"
  + "<br><br>";

var sound_tst_msg = `<p>Before we begin the next task,<br>
  please make sure your sound is on.<br></p>
  <p><b>Use the <code>Play sound</code> button below to check your volume.</b></p>
  <p>Play the sound repeatedly until the ring plays<br>
  at an <b>audible but non-disruptive volume.</b></p>
  <p>Continue after you are satisfied with the volume.</p>
  <br><br>`;

var sound_tester = {
  timeline: [
    {
      type: "html-button-response",
      stimulus: sound_tst_msg,
      choices: ["Play sound", "Continue"],
      data: {"phase":"bct-intro"},
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
  data: {"phase":"bct-intro"},
  button_label_previous: "Previous",
  button_label_next: "Continue"
};
var button_checks = {
  type: "html-keyboard-response",
  data: {"phase":"bct-intro"},
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
  data: {"phase":"bct-intro"},
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
      data: {"phase":"bct-practice"},
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
      data: {"phase":"bct-practice"},
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
  data: {"phase":"bct-practice"},
  stimulus: `<p>Great!</p>
    <p>Now try repeating the same process without visual feedback.</p>
    <p>You will only see a cross in the center of the screen while
    <br>you count your breaths and press the buttons as before.</p>
    <br><br>`,
  choices: ["Begin"],
};

var reset_practice_trial_counter = {
  type: "call-function",
  data: {"phase":"bct-practice"},
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
      data: {"phase":"bct-practice"}
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
    "phase": "bct-task",
    "breath_count": function() {
      return breath_count;
    }
  }
};

function timer_init() {
  setTimeout(function(){
    jsPsych.endExperiment("Experiment over");
  }, length_ms);
  setInterval(function(){
    var cur_progress = jsPsych.getProgressBarCompleted();
    jsPsych.setProgressBar(cur_progress + pbar_frac);
  }, pbar_ms);
};

var timer_start = {
  type: "call-function",
  data: {"phase":"bct-practice"},
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
  repetitions: 10000 // an arbitrarily high number of trials
  // on_timeline_start: function() {
  //     console.log("Block started, breath count at ", breath_count);
  // },
  // on_timeline_finish: function() {
  //     console.log("Block ended, breath count at ", breath_count);
  // }
};

