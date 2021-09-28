

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
};



/**********  BREATH COUNTING TASK VARIABLES  ***************/

var bct_length_minutes = 10; // of the whole breathing task (not including instructions)
const length_ms = bct_length_minutes*60*1000;
const pbar_frac = .1; // fraction for progress bar (it will jump this pct)
const pbar_ms = pbar_frac * length_ms

// // add some time for practice
// bct_length_minutes += 5;

const min_breath_gap = 1000; // ms between breaths for practice warning
const fixation_html = "<p style='font-size:60px'>+</p>";
const response_keys = ["arrowdown", "arrowright", " "];

const audio_filename = "sound.mp3";

const feedback_html = `<p>You responded either incorrectly or too fast.</p>
  <p>Let's restart the counter.</p>
  <p>Make sure you press <code>&downarrow;</code> only once for each exhale,<br>
  and then press <code>&rightarrow;</code> on the 9th exhale.</p><br><br>`;

const msg1 = `<p>In this task, we would like you to be aware of your breath.<p>
  <p>Please be aware of the movement of breath in and out
  <br>in the space below your nose and above your upper lip.<p>
  <p>There's no need to control the breath.
  <br>Just breathe at a comfortable slow pace
  <br>and try to breathe through your nostrils if you can.</p>
  <br><br>`;
const msg2 = `<p>At some point, you may notice
  <br>your attention has wandered from the breath.</p>
  <p>That's okay. Just gently place it back on the breath.</p>
  <br><br>`;
const msg3 = `<p>To help attention stay with the breath,<br>
  you'll use a small part of your attention<br>
  to silently count breaths from 1 to 9, again and again.</p>
  <p>An in and out breath together makes one count.<br>
  Say the count softly in your mind so it only gets a little attention<br>
  while most of the attention is on feeling the breath.</p>
  <p>Press the Down Arrow (<code>&downarrow;</code>) with breaths 1-8,<br>
  and the Right Arrow (<code>&rightarrow;</code>) with breath 9.</p>
  <p>This means you'll be pressing a button with each breath.</p><br><br>`;
const msg4 = `<p>If you find that you have forgotten the count,<br>
  just press the spacebar and restart the count at 1 with the next breath.</p>
  <p>Do not count the breaths using your fingers but only in your head.</p><br><br>`;
const msg5 = `<p>We suggest you sit in an upright,<br>
  relaxed posture that feels comfortable.</p>
  <p>Please keep your eyes at least partly open<br>
  and resting on the screen during the experiment.</p><br><br>`;
const msg6 = `<p>Press the <code>&downarrow;</code> key.</p><br><br>`;
const msg7 = `<p>On every <code>&rightarrow;</code> press, you will hear a sound.</p>
  <p>Press the <code>&rightarrow;</code> key.</p><br><br>`;
const msg8 = `<p>Press the spacebar.</p><br><br>`;
const msg9 = `<p>Great!</p>
  <p>The task will begin now.</p>
  <p>The screen will only show a centered cross,<br>
  but your responses are being recorded.<br>
  A message will appear on screen to let<br>
  you know when this task is over.</p>
  <p>The task will last for ${bct_length_minutes} minutes,<br>
  no matter what pace your breathe or how accurate you are.</p>
  <p>Remember to sit in a comfortable position,<br>
  focus primarily on your breathing,<br>
  and you can press spacebar to reset<br>
  the counter if you get lost.</p><br><br>`;

const bct_closing_msg = `<p>Finished!</p>
  <p>No more counting your breaths. &#128578;</p><br><br>`;


const sound_tst_msg = `<p>Before we begin the next task,<br>
  please make sure your sound is on.<br></p>
  <p><b>Use the "<code>Play sound</code>" button below to check your volume.</b></p>
  <p>Play the sound repeatedly until the ring plays<br>
  at an <b>audible but non-disruptive volume.</b></p>
  <p>Continue after you are satisfied with the volume.</p><br><br>`;

/*****************  N-BACK TASK VARIABLES  ******************/

const nback_stimuli = ["Z", "X", "C", "V", "B", "N"];

const how_many_back = 2; // the "n" in nback! (note instructions have to be changed with this)
const nback_n_trials = 150; // # of trials (encoded letters)
const nback_encoding_length = 1500; // ms
const nback_iti = 500; // ms

const nback_n_practice_trials = 15; // for a single practice block
const nback_correct2pass = 2; // # of accurate trials to pass practice
const nback_max_FA2pass = 1; // # max false alarms during practice, to prevent button mashing

// calcate task length in minutes just to display it in a message
var nback_length = Math.round(nback_n_trials * (nback_encoding_length+nback_iti) / 1000/60)
// // add some time for practice
// nback_length += 5;

const nback_welcome_msg = `<p>This next task tests your ability<br>
  to hold information over short periods of time.</p><br><br>`;
const nback_instructions_msg1 = `<div style="width: 800px;">
  <p>You will see a sequence of letters presented one at a time.</p>
  <p>Your task is to determine if the letter on the screen matches<br>
  the letter that appeared <b>${how_many_back} letters before</b>.</p><br><br>`;
const nback_instructions_msg2 = `<p>If the letter is a match, <span style="font-weight: bold;">press the M key.</span></p>
  <p>For example, if you saw the sequence X, C, V, B, V, X<br>
  you would press the <code>M</code> key when the second V appeared on the screen.</p>
  <p>You do not need to press any key when there is not a match.</p><br><br>`;
const nback_instructions_msg3 = `<p>Next is a short series of practice trials.</p>
  <p>If you understand the instructions and perform reasonably well,<br>
  you will move on to the main task. Otherwise you will repeat the practice.</p>
  <p>Remember to press the <code>M</code> key if the letter on the screen<br>
  matches the letter that appeared ${how_many_back} letters ago.</p><br><br>`;

const nback_pass_practice_feedback = `<p>Great job!</p>
  <p>Continue to the main task, which will<br>
  take about ${nback_length} minutes.</p><br><br>`;
  

const nback_redo_practice_feedback = `<p>Please reread the instructions carefully and try again.</p><br><br>`;




/*************  Main intro messages *****************/


// const approx_questionnaire_length = 5; // minutes

// const approx_study_length = nback_length + bct_length_minutes + approx_questionnaire_length;



const welcome_msg1 = `<p>Hello. &#128512;</p>
  <p>Welcome to the experiment.</p>
  <p>Altogether, this experiment will take about 30 minutes to complete.</p>
  <p>Before we begin, please<br>
  close all other browser windows,<br>
  turn off your cell phone,<br>
  and minimize potential distractions.</p><br><br>`;
const fullscreen_warning = `<p>Next, the experiment will switch to fullscreen mode.<br>
  Please stay in fullscreen mode until the experiment is over.</p>
  <p>It's also important that you do not hit the <code>Back</code> button<br>
  of your browser at any point during the experiment.</p><br><br>`;
const closing_msg = `<p>&#128524;<br>The experiment is over.<br>
  Thank you for participating.</p>
  <p>&#129504;<br>We designed this experiment to better understand<br>
  the relationship between mindfulness and lucid dreaming.</p>
  <p>If you have any questions, please use the contact information<br>
  on our web page to reach out: <a href="https://pallerlab.psych.northwestern.edu/">https://pallerlab.psych.northwestern.edu/</a></p>
  <p>You may now close your browser.<br>
  Thanks again! &#128516;</p><br><br>`;



/*****************************************/

const lucid_definition = `<p>Please read the following definition carefully.</p>
  <p>In a lucid dream, <em>one is aware that one is dreaming during the dream.</em></p>
  <p>Thus it is possible to wake up deliberately,
  <br>or to influence the action of the dream actively,
  <br>or to observe the course of the dream passively.</p>
  <br><br>`;

const lucid_example = `<p>I was dreaming of an open field, when<br>
  all of a sudden I realized I was dreaming.</p><br><br>`;


var demographics_html = `<p>Please enter demographic information<br>
  to the extent you are comfortable with.<br><br>
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
  </p>`;


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
};
