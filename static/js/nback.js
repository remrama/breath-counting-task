
var n_back_set = ["Z", "X", "C", "V", "B", "N"];
var sequence = [];

var how_many_back = 2;

var sequence_length = 22;


var instructions_msg1 = `<div style="width: 800px;">
  <p>This experiment will test your ability to hold information<br>
  short-term, temporary memory. This is called working memory.</p>
  </div>`;

var instructions_msg2 = `<div style="width: 800px;">
  <p>You will see a sequence of letters presented one at a time.<br>
  Your task is to determine if the letter on the screen matches<br>
  the letter that appeared two letters before.</p>
  <p>If the letter is match <span style="font-weight: bold;">press the M key.</span></p>
  <p>For example, if you saw the sequence X, C, V, B, V, X<br>
  you would press the M key when the second V appeared on the screen.</p>
  <p>You do not need to press any key when there is not a match.</p>
  </div>`;

var instructions_msg3 = `<div style="width: 800px;">
  <p>The sequence will begin on the next screen.</p>
  <p>Remember: press the M key if the letter on the screen<br>
  matches the letter that appeared two letters ago.</p>
  </div>`;

var nback_instructions = {
  type: "instructions",
  pages: [instructions_msg1, instructions_msg2, instructions_msg3],
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

/* N Back sequence trials */

var n_back_trial = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if(sequence.length < how_many_back){
      var letter = jsPsych.randomization.sampleWithoutReplacement(n_back_set, 1)[0]
    } else {
      if(jsPsych.timelineVariable('match', true) == true){
        var letter = sequence[sequence.length - how_many_back];
      } else {
        var possible_letters = jsPsych.randomization.sampleWithoutReplacement(n_back_set, 2);
        if(possible_letters[0] != sequence[sequence.length - how_many_back]){
          var letter = possible_letters[0];
        } else {
          var letter = possible_letters[1];
        }
      }
    }
    sequence.push(letter);
    return '<span style="font-size: 96px;">'+letter+'</span>'
  },
  choices: ['M'],
  trial_duration: 1500,
  response_ends_trial: false,
  post_trial_gap: 500,
  data: {
    phase: "nback-test",
    match: jsPsych.timelineVariable('match')
  },
  on_finish: function(data){
    if(data.match == true){
      data.correct = (data.key_press != null)
    }
    if(data.match == false){
      data.correct = (data.key_press === null)
    }
  }
}

var n_back_trials = [
  {match: true},
  {match: false}
]

var nback_sequence = {
  timeline: [n_back_trial],
  timeline_variables: n_back_trials,
  sample: {
    type: 'with-replacement',
    size: sequence_length,
    weights: [1, 2]
  }
}


/* feedback */

var nback_total_feedback = {
  type: 'html-button-response',
  stimulus: function(){
    var test_trials = jsPsych.data.get().filter({phase: 'nback-test'}).last(sequence_length-2);
    var n_match = test_trials.filter({match: true}).count();
    var n_nonmatch = test_trials.filter({match: false}).count();
    var n_correct = test_trials.filter({match: true, correct: true}).count();
    var false_alarms = test_trials.filter({match: false, correct: false}).count();

    var html = "<div style='width:800px;'>"+
      "<p>All done!</p>"+
      "<p>You correctly identified "+n_correct+" of the "+n_match+" matching items.</p>"+
      "<p>You incorrectly identified "+false_alarms+" of the "+n_nonmatch+" non-matching items as matches.</p>";
    
    return html;
  },
  choices: ["Continue"]
}
