
/**********  BREATH COUNTING TASK VARIABLES  ***************/

var bct_length_minutes = 20; // of the whole breathing task (not including instructions)
const length_ms = bct_length_minutes*60*1000;
const pbar_frac = .1; // fraction for progress bar (it will jump this pct)
const pbar_ms = pbar_frac * length_ms

const min_breath_gap = 1000; // ms between breaths for practice warning
const fixation_html = "<p style='font-size:60px'>+</p>";
const response_keys = ["arrowdown", "arrowright", " "];

const feedback_html = `<p>You responded either incorrectly or too fast.</p>
  <p>Let's restart the counter.</p>
  <p>Make sure you press <code>&downarrow;</code> only once for each exhale,<br>
  and then press <code>&rightarrow;</code> on the 9th exhale.</p><br><br>`;

const audio_filename = "sound.mp3";



/*****************  N-BACK TASK VARIABLES  ******************/

const nback_stimuli = ["Z", "X", "C", "V", "B", "N"];

const how_many_back = 2; // the "n" in nback! (note instructions have to be changed with this)
const nback_n_trials = 210; // # of trials (encoded letters)
const nback_encoding_length = 1500; // ms
const nback_iti = 500; // ms

const nback_n_practice_trials = 15; // for a single practice block
const nback_correct2pass = 2; // # of accurate trials to pass practice
const nback_max_FA2pass = 1; // # max false alarms during practice, to prevent button mashing

// calcate task length in minutes just to display it in a message
var nback_length = Math.round(nback_n_trials * (nback_encoding_length+nback_iti) / 1000/60)

const nback_welcome_msg = `<p>This next task tests your ability<br>
  to hold information over short periods of time.</p>
  <p>This memory task will take about ${nback_length} minutes.</p><br><br>`;
const nback_instructions_msg1 = `<div style="width: 800px;">
  <p>You will see a sequence of letters presented one at a time.</p>
  <p>Your task is to determine if the letter on the screen matches<br>
  the letter that appeared <b>${how_many_back} letters before</b>.</p><br><br>`;
const nback_instructions_msg2 = `<p>If the letter is a match, <span style="font-weight: bold;">press the M key.</span></p>
  <p>For example, if you saw the sequence X, C, V, B, V, X<br>
  you would press the M key when the second V appeared on the screen.</p>
  <p>You do not need to press any key when there is not a match.</p><br><br>`;
const nback_instructions_msg3 = `<p>Next is a short series of practice trials.</p>
  <p>If you understand the instructions and perform reasonably well,<br>
  you will move on to the main task. Otherwise you will repeat the practice.</p>
  <p>Remember to press the M key if the letter on the screen<br>
  matches the letter that appeared ${how_many_back} letters ago.</p><br><br>`;

const nback_pass_practice_feedback = `<p>Great job!</p>
  <p>Continue to the main task.</p><br><br>`;

const nback_redo_practice_feedback = `<p>Please reread the instructions carefully and try again.</p><br><br>`;


/*************  Main intro messages *****************/


const approx_questionnaire_length = 5; // minutes
// add some time for practice
bct_length_minutes += 5; 
nback_length += 5; 
const approx_study_length = nback_length + bct_length_minutes + approx_questionnaire_length;



const welcome_msg1 = `<p>Hello. &#128512;</p>
  <p>Welcome to the experiment.</p>
  <p>Before we begin, please<br>
  close all other browser windows,<br>
  turn off your cell phone,<br>
  and minimize potential distractions.</p><br><br>`;
const welcome_msg2 = `<p>This experiment will take<br>
  approximately ${approx_study_length} minutes to complete.</p>
  <p>Broken down, it's about ${approx_questionnaire_length} minutes of questionnaires<br>
  followed by two cognitive tasks (${bct_length_minutes} and ${nback_length} minutes).</p><br><br>`;
const welcome_msg3 = `<p>Next, the experiment will switch to fullscreen mode.<br>
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



