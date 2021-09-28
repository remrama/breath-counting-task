/*
 * jspsych-bct-set
 *
 * Plug-in for running a Breath Counting Task
 * and playing audio along with it.
 *
 * Breath Counting Task was developed in
 * Levinson et al., 2014, https://doi.org/10.3389/fpsyg.2014.01202
 * and described pretty well with instructions in
 * Wong et al., 2018, https://doi.org/10.1007/s12671-017-0880-1
 *
 * The audio is specific to this case.
 * The BCT doesn't include any feedback,
 * so this thing just opens up a *persistent* keyboard listener
 * and lets the participant push buttons as desired.
 * It plays an audio clip after a right press.
 * It provides some feedback if too fast/slow.
 *
 * This is just for 1 set, which is kinda user-defined.
 * It collects responses and ends whenever the participant
 * presses the <choice_last> or the <choice_reset>.
 */

jsPsych.plugins["bct-set"] = (function() {

  // define all the plugin info
  var plugin = {};
  plugin.info = {
    name: "bct-set",
    parameters: {
      show_count: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false,
        pretty_name: "Show count",
        description: "If true, show the breath counter."
      },
      restrict_speed: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false,
        pretty_name: "Restrict speed",
        description: "If true, end trial if a single RT is too fast."
      }
      // parameter_name: {
      //   type: jsPsych.plugins.parameterType.INT, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
      //   default: undefined
      // }
    }
  }

  plugin.trial = function(display_element, trial) {

    var mycolor = "#8C8265";

    // initialize the counter for this set/trial
    var breath_count = 1;

    // need previous trial info to know if the counter should
    // start at 0 or 9 display
    // if last trial ended with a right press, then
    // need to show whatever number of the breath count it was
    // regardless of being 9 or not.
    // Then color it green if right, red if wrong.
    var lasttrial_data = jsPsych.data.getLastTrialData().values()[0];
    if ((lasttrial_data.trial_index == 0)
      | (lasttrial_data.accuracy == "selfcatch")) {
      var count_start = 0;
      var count_color = mycolor;
    } else {
      var count_start = lasttrial_data.rt.length;
      // console.log(lasttrial_data);
      if (lasttrial_data.accuracy == "correct") {
        var count_color = "green";
      } else {
        var count_color = "red";
      };
    };

    // var new_html = '<div id="jspsych-bct-set-stimulus">'+trial.stimulus+'</div>';
    var new_html = "<div id='jspsych-bct-set-stimulus'>"
      + "<p style='font-size:60px'>+</p>"
      + "<pre id='count_feedback'>" + count_start.toString() + "</pre>"
      + "<pre id='speed_feedback'> </pre>"
      + "</div>";

    // draw
    display_element.innerHTML = new_html;
    
    // initialize it colored
    document.getElementById("count_feedback").style.color = count_color;

    // kinda lazy, but just hide the speed feedback if not using it
    // (still getting updated and such throughout the trial, just hidden
    if (!(trial.restrict_speed)) {
      document.getElementById("speed_feedback").style.visibility = "hidden";
    };
    if (!(trial.show_count)) {
      document.getElementById("count_feedback").style.visibility = "hidden";
    };

    // store response
    var responses = {
      rt: [],
      key: []
    };

    // // data saving
    // var trial_data = {
    //   parameter_name: 'parameter value'
    // };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after first response change to default color
      // rn this is lazy and "changes" it every time :/
      document.getElementById("count_feedback").style.color = mycolor;

      // record the response
      responses.rt.push(info.rt);
      responses.key.push(info.key);

      if (jsPsych.pluginAPI.compareKeys(info.key, "arrowdown")) {
        document.getElementById("count_feedback").innerHTML = breath_count.toString();
        breath_count++;
      };
      if (!(jsPsych.pluginAPI.compareKeys(info.key, "arrowdown"))) {
        end_trial();
      };

      if (responses.rt.length > 1) {
        // could prob use resposnes length as breath count
        last_rt = responses.rt[responses.rt.length-2];
        if ((info.rt-last_rt) < 1000) {
          document.getElementById("speed_feedback").innerHTML = "Try to slow down.";
        } else if ((info.rt-last_rt) > 30000) {
          document.getElementById("speed_feedback").innerHTML = "Try to speed up.";
        } else {
          document.getElementById("speed_feedback").innerHTML = " ";
        };
      };
    };

    // function to end trial when it is time
    var end_trial = function() {
      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // determine accuracy
      last_key = responses.key[responses.key.length - 1];
      if ((responses.rt.length == 9) & (jsPsych.pluginAPI.compareKeys(last_key, "arrowright"))) {
        var accuracy = "correct";
      } else if (jsPsych.pluginAPI.compareKeys(last_key, " ")) {
        var accuracy = "selfcatch";
      } else {
        var accuracy = "incorrect";
      };
      // gather the data to store for the trial
      var trial_data = {
        rt: responses.rt,
        stimulus: trial.stimulus,
        response: responses.key,
        accuracy: accuracy
      };

      // console.log(trial_data)

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };


    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });
    };

    // end trial
    // jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
