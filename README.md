# breath counting task display

This repo has display code for running the breath counting task online. Task originally proposed by [Levinson et al., 2014](https://doi.org/10.3389/fpsyg.2014.01202), who also has an old online demo [here](http://webtasks.keck.waisman.wisc.edu/breath/demo/), and [Wong et al., 2018](https://doi.org/10.1007/s12671-017-0880-1) provide probably the best/most description of the task details.

There is some other stuff here too (e.g., surveys), but it's mostly modular so the breath counting task could be pulled out. Repo layout is as such:

```
exp.html                # just a template for pulling js/jspsych scripts
static/
  |
  |-- css/style.css
  |-- js/bct.js         # the breath counting task
  |-- js/survey.js      # ALL the surveys for this study
  |-- js/runall.js      # compiles the task and survey between intro/outro and initialization
```