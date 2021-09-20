

// ============================= MAIN INTRO CONTENT

var fullscreen_off = {
  type: "fullscreen",
  fullscreen_mode: false,
  data: {"phase":"outro"}
};

var welcome_msg1 = `<p>Hello. &#128512;</p>
  <p>Welcome to the experiment.</p>
  <p>Before we begin, please<br>
  close all other browser windows,<br>
  turn off your cell phone,<br>
  and minimize potential distractions.</p><br><br>`;
var welcome_msg2 = `<p>This experiment will take<br>
  approximately 30 minutes to complete.</p>
  <p>After about 5 minutes of brief questionnaires,<br>
  you will be asked to complete a task that takes about 25 minutes.</p><br><br>`;
var welcome_msg3 = `<p>Next, the experiment will switch to fullscreen mode.<br>
  Please stay in fullscreen mode until the experiment is over.</p>
  <p>It's also important that you do not hit the <code>Back</code> button<br>
  of your browser at any point during the experiment.</p><br><br>`;
var closing_msg = `<p>&#128524;<br>The experiment is over.<br>
  Thank you for participating.</p>
  <p>&#129504;<br>We designed this experiment to better understand<br>
  the relationship between mindfulness and lucid dreaming.</p>
  <p>If you have any questions, please use the contact information<br>
  on our web page to reach out: <a href="https://pallerlab.psych.northwestern.edu/">https://pallerlab.psych.northwestern.edu/</a></p>
  <p>You may now close your browser.<br>
  Thanks again! &#128516;</p><br><br>`;

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
  message: welcome_msg3,
  data: {"phase":"intro"}
};

var closing_screen = {
  type: "html-button-response",
  choices: ["Close experiment"],
  stimulus: closing_msg,
  data: {"phase":"outro"}
};

// ============================ SURVEY CONTENT



function generate_table_html(left_column_header, response_options, prompts, scale_acronym) {
  // build html table
  var html = "";

  // open the table
  html += "<table class='mytable'>";

  // make the table header
  html += "<thead><tr>";
  // add the left column header if there is one
  html += "<th width=70% align=left>"+left_column_header+"</th>";
  // add a column head for each response option
  for (r in response_options) {
    html += "<th>"+response_options[r]+"</th>";
  };
  // close up the head
  html += "</tr></thead>";

  // add a row for each prompt
  html += "<tbody>";
  for (p in prompts) {
    html += "<tr>"
    // add the prompt in first cell
    html += "<td align=left>"+prompts[p]+"</td>";
    // add a radio button for each response option
    for (r in response_options) {
      html += "<td><input type='radio' name='"+scale_acronym+p.toString()+"' value='"+r.toString()+"' required></td>";
    };
    html += "</tr>";
  };
  // close the body
  html += "</tbody>";

  // close the table
  html += "</table>";

  // add a break so there's some space before the button
  html += "<br>";

  return html
}


// **************************************** //

var lusk = {

  acronym: "LUSK",
  left_header: "In how many of your lucid dreams...",
  preamble: null,

  responses: [
    "In none",
    "In a quarter",
    "In half",
    "In three quarters",
    "In all"
  ],

  prompts: [
    "...were you aware of differences to the waking state (e.g., bizarre incidents or settings)?",
    "...were you aware that your physical body was asleep?",
    "...were you aware that all dream objects were not real?",
    "...did you think about different options of what you can do in a dream?",
    "...were you able to keep your awareness for a satisfying period of time?",
    "...did you decide deliberately to observe the dream as a dream?",
    "...were you able to deliberately shape your environment (e.g., change landscapes/surroundings, let persons/characters appear or disappear)?",
    "...did you have full control of your dream body (movements, actions)?",
    "...did you choose deliberately a specific action?",
    "...were you able to perform specific actions (e.g., flying, floating, talking with dream characters, perform magic, engaging in sex)?",
  ]

};

// **************************************** //

var ffmq = {

  acronym: "FFMQ",
  left_header: "",
  preamble: null,

  responses: [
    "Never or very rarely true",
    "Rarely true",
    "Sometimes",
    "Often true",
    "Very often or always true"
  ],

  prompts: [
    "When I'm walking, I deliberately notice the sensations of my body moving.",
    "I'm good at finding words to describe my feelings.",
    "I criticize myself for having irrational or inappropriate emotions.",
    "I perceive my feelings and emotions without having to react to them.",
    "When I do things, my mind wanders off and I'm easily distracted.",
    "When I take a shower or bath, I stay alert to the sensations of water on my body.",
    "I can easily put my beliefs, opinions, and expectations into words.",
    "I don't pay attention to what I'm doing because I'm daydreaming, worrying, or otherwise distracted.",
    "I watch my feelings without getting lost in them.",
    "I tell myself I shouldn't be feeling the way I'm feeling.",
    "I notice how foods and drinks affect my thoughts, bodily sensations, and emotions.",
    "It's hard for me to find the words to describe what I'm thinking.",
    "I am easily distracted.",
    "I believe some of my thoughts are abnormal or bad and I shouldn't think that way.",
    "I pay attention to sensations, such as the wind in my hair or sun on my face.",
    "I have trouble thinking of the right words to express how I feel about things.",
    "I make judgments about whether my thoughts are good or bad.",
    "I find it difficult to stay focused on what's happening in the present.",
    'When I have distressing thoughts or images, I "step back" and am aware of the thought or image without getting taken over by it.',
    "I pay attention to sounds, such as clocks ticking, birds chirping, or cars passing.",
    "In difficult situations, I can pause without immediately reacting.",
    "When I have a sensation in my body, it's difficult for me to describe it because I can't find the right words.",
    'It seems I am "running on automatic" without much awareness of what I\'m doing.',
    "When I have distressing thoughts or images, I feel calm soon after.",
    'This is not a question, just select the "Often true" option.',
    "I tell myself that I shouldn't be thinking the way I'm thinking.",
    "I notice the smells and aromas of things.",
    "Even when I'm feeling terribly upset, I can find a way to put it into words.",
    "I rush through activities without being really attentive to them.",
    "When I have distressing thoughts or images I am able just to notice them without reacting.",
    "I think some of my emotions are bad or inappropriate and I shouldn't feel them.",
    "I notice visual elements in art or nature, such as colors, shapes, textures, or patterns of light and shadow.",
    "My natural tendency is to put my experiences into words.",
    "When I have distressing thoughts or images, I just notice them and let them go.",
    "I do jobs or tasks automatically without being aware of what I'm doing.",
    "When I have distressing thoughts or images, I judge myself as good or bad, depending what the thought/image is about.",
    "I pay attention to how my emotions affect my thoughts and behavior.",
    "I can usually describe how I feel at the moment in considerable detail.",
    "I find myself doing things without paying attention.",
    "I disapprove of myself when I have irrational ideas.",
  ]

}

// **************************************** //



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

// subset of the madre
var scale_1 = [
  "Strongly Disagree", 
  "Disagree", 
  "Neutral", 
  "Agree", 
  "Strongly Agree"
];
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
      prompt: "How often have you experienced nightmares recently (in the past several months)?",
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
      prompt: "How often do you experience so-called lucid dreams?",
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


// ***   define some other stuff   *** //

var demographics_html = `
  <p>
  <label for="age">Age:</label>
  <input type="number" name="age" min="0" max="99" required /> years
  <br><br>
  <label for="sex">Sex:</label>
  <select name="sex" required>
    <option value="">
    <option value="1">Female
    <option value="2">Male
    <option value="3">Intersex
    <option value="0">Prefer not to respond
  </select>
  <br><br>
  <label for="gender">Gender:</label>
  <select name="gender" required>
    <option value="">
    <option value="1">Woman
    <option value="2">Man
    <option value="3">Transgender
    <option value="4">Non-binary/non-conforming
    <option value="0">Prefer not to respond
  </select>
  <br><br>
  <label for="ethnicity">Ethnicity:</label>
  <select name="ethnicity" required>
    <option value="">
    <option value="1">American Indian or Alaska Native
    <option value="2">Asian
    <option value="3">Black or African American
    <option value="4">Hispanic or Latino
    <option value="5">Native Hawaiian or Other Pacific Islander
    <option value="6">White
    <option value="0">Prefer not to respond
  </select>
  <br><br>
  </p>
`;

var demographics = {
  type: "survey-html-form",
  html: demographics_html,
  data: {phase:"demographics"}
}

var lucid_categorization_loop = {
  timeline: [
    {
      type: "html-button-response",
      stimulus: "<p>I was dreaming of an open field, when"
        + "<br>all of a sudden I realized I was dreaming.</p>"
        + "<br><br>",
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

var lucid_def = `<p>Please read the following definition carefully.</p>
  <p>In a lucid dream, <em>one is aware that one is dreaming during the dream.</em></p>
  <p>Thus it is possible to wake up deliberately,
  <br>or to influence the action of the dream actively,
  <br>or to observe the course of the dream passively.</p>
  <br><br>`;

// var lucid_def = `
//   <p>Please read the following definition carefully.</p>
//   <p>In a lucid dream, <em>one is aware that one is dreaming during the dream.</em></p>
//   <p>Thus it is possible to wake up deliberately,
//   <br>or to influence the action of the dream actively,
//   <br>or to observe the course of the dream passively.</p>
//   <br><br>
// `;

var lucid_def_trial = {
  type: "html-button-response",
  stimulus: lucid_def,
  choices: ["Continue"],
  data: {phase:"lucid_definition"}
};





// ============================ BREATH COUNTING TASK STUFF


// *********************
// ** setup variables **

var timeline = [];

var bct_length_minutes = 20; // of the whole breathing task (not including instructions)
var length_ms = bct_length_minutes*60*1000;
var pbar_frac = .1; // fraction for progress bar (it will jump this pct)
var pbar_ms = pbar_frac * length_ms

var min_breath_gap = 1000; // ms between breaths for practice warning
var fixation_html = "<p style='font-size:60px'>+</p>";
var response_keys = ["arrowdown", "arrowright", " "];

var feedback_html = `<p>You responded either incorrectly or too fast.</p>
  <p>Let's restart the counter.</p>
  <p>Make sure you press <code>&downarrow;</code> only once for each exhale,<br>
  and then press <code>&rightarrow;</code> on the 9th exhale.</p><br><br>`;

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
var msg4 = `<p>If you find that you have forgotten the count,<br>
  just press the spacebar and restart the count at 1 with the next breath.</p>
  <p>Do not count the breaths using your fingers but only in your head.</p><br><br>`;
var msg5 = `<p>We suggest you sit in an upright,<br>
  relaxed posture that feels comfortable.</p>
  <p>Please keep your eyes at least partly open<br>
  and resting on the screen during the experiment.</p>
  <p>The task will last about ${bct_length_minutes} minutes after a brief practice.</p><br><br>`;
var msg6 = `<p>Press the <code>&downarrow;</code> key.</p><br><br>`;
var msg7 = `<p>On every <code>&rightarrow;</code> press, you will hear a sound.</p>
  <p>Press the <code>&rightarrow;</code> key.</p><br><br>`;
var msg8 = `<p>Press the spacebar.</p><br><br>`;
var msg9 = `<p>Great!</p>
  <p>The task will begin now.</p>
  <p>The progress bar at the top is only a ${bct_length_minutes} minute timer<br>
  and is not affected by your breathing pace or accuracy.</p>
  <p>The experiment will end after ${bct_length_minutes} minutes.</p><br><br>`;

var sound_tst_msg = `<p>Before we begin the next task,<br>
  please make sure your sound is on.<br></p>
  <p><b>Use the <code>Play sound</code> button below to check your volume.</b></p>
  <p>Play the sound repeatedly until the ring plays<br>
  at an <b>audible but non-disruptive volume.</b></p>
  <p>Continue after you are satisfied with the volume.</p><br><br>`;

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
  repetitions: 10000 // an arbitrarily high number of trials
  // on_timeline_start: function() {
  //     console.log("Block started, breath count at ", breath_count);
  // },
  // on_timeline_finish: function() {
  //     console.log("Block ended, breath count at ", breath_count);
  // }
};







// ==============  BUILD TIMELINE  ==============

var timeline = [];

// intro stuff
timeline.push(welcome_screen);
timeline.push(fullscreen_on);

// survey info
timeline.push(demographics);
timeline.push(lucid_def_trial);
timeline.push(lucid_categorization_loop);
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

// // nback
// timeline.push(nback_instructions);
// timeline.push(nback_sequence);
// timeline.push(nback_total_feedback);

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
  show_progress_bar: true,
  auto_update_progress_bar: false,
  message_progress_bar: "Time remaining",
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
