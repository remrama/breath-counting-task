

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
  data: {"phase":"lusk"}
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
  data: {"phase":"ffmq"}
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
  data: {"phase":"madre"},
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
  data: {"phase":"demographics"}
}

var lucid_categorization_loop = {
  timeline: [
    {
      type: "html-button-response",
      stimulus: "<p>I was dreaming of an open field, when"
        + "<br>all of a sudden I realized I was dreaming.</p>"
        + "<br><br>",
      choices: ["Non-lucid", "Lucid"],
      data: {"phase": "lucid_definition"},
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
        "phase": "lucid_definition",
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
  data: {"phase":"lucid_definition"}
};
