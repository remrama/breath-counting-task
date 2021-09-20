
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
