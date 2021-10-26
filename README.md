# lucidbct

Code for a study about the relationship between lucidity and mindfulness.

It relies primarily on the breath counting task as a measure of mindfulness (developed in [Levinson et al., 2014](https://doi.org/10.3389/fpsyg.2014.01202); old online [demo](http://webtasks.keck.waisman.wisc.edu/breath/demo/); nice detail in [Wong et al., 2018](https://doi.org/10.1007/s12671-017-0880-1)).

Beyond that there's an N-back task and some surveys.

The display code is written using [jspsych](https://www.jspsych.org/) and prepped to be hosted on [cognition.run](https://www.cognition.run/).


## Linear description of analysis scripts

```bash
#### directories are specified in config.py


#### convert raw jspsych/cognition files to usable csvs
#### There are different task elements, diff script for each.

python preproc-clean_bct.py
## outputs --> <DERIVATIVE_DIR>/bct-presses.csv
## outputs --> <DERIVATIVE_DIR>/bct-cycles.csv

python preproc-clean_nback.py
## outputs --> <DERIVATIVE_DIR>/nback.csv

python preproc-clean_surveys.py
## outputs --> <DERIVATIVE_DIR>/surveys.csv


#### analyze breath counting task
python analyze-prelim.py
python analyze-bigvis.py

#### relate LUSK to cognitive tasks
python analyze-lusk2tasks.py
```