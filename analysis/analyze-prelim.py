"""Analyze the BCT task cycle data.

visualize:
    - accuracy and different errors for each participant
    - correlation between accuracy and total # of cycles
    - correlation between accuracy and reaction times (total)
    - correlation between miscounts and resets
    - distribution of breath/cycle "location" of miscounts and resets
"""
import os
import numpy as np
import pandas as pd

import config as c

import seaborn as sea
import matplotlib.pyplot as plt
plt.rcParams["savefig.dpi"] = 600
plt.rcParams["interactive"] = True
plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = "Arial"
plt.rcParams["mathtext.fontset"] = "custom"
plt.rcParams["mathtext.rm"] = "Arial"
plt.rcParams["mathtext.it"] = "Arial:italic"
plt.rcParams["mathtext.bf"] = "Arial:bold"

import_fname = os.path.join(c.DERIVATIVE_DIR, "bct-cycles.csv")

df = pd.read_csv(import_fname)

# reset participant id to be something clearly categorical
# just categorical the numbers for now :/
df["participant_id"] = pd.Categorical(df["participant_id"], ordered=True)


CYCLE_PALETTE = {
    "correct" : "limegreen",
    "miscount" : "indianred",
    "reset" : "khaki",
}


""" ========================================================
before plotting, get a summary dataframe
with each participant as a row.
use it to plot, save out too
"""
# get the number of cycles and accuracy per participant
df["correct"] = df["accuracy"]=="correct"

# acc = df.groupby("participant_id").correct.mean().rename("accuracy")
# rt = df.groupby("participant_id").rt_mean.mean().rename("rt")
# rt_sd = df.groupby("participant_id").rt_mean.mean().rename("rt_sd")
# n_cycles = df.groupby("participant_id").size().rename("n_cycles")
# participant_summary = pd.concat([acc, n_cycles, rt, rt_sd], axis=1)

participant_summary = df.groupby("participant_id"
    ).agg({
        "correct": "mean",
        "rt_mean": ["mean", "std"],
        "rt_std": "mean",
        "cycle": "max",
        "accuracy": [ lambda s: (s=="miscount").mean(),
                      lambda s: (s=="reset").mean() ]
    }
)
participant_summary.columns = ["accuracy", "rt",
    "rt_sd", "rt_std_mean",
    "n_cycles", "miscount_rate", "reset_rate"]


export_fname_df = os.path.join(c.DERIVATIVE_DIR, "bct-performance.csv")
participant_summary.round(3).to_csv(export_fname_df, index=True)



""" ========================================================
plot each participant individually
showing the counts of each trial type
"""

_, ax = plt.subplots(figsize=(3,3), constrained_layout=True)

sea.histplot(data=df,
    x="participant_id", hue="accuracy",
    multiple="stack", stat="count",
    hue_order=CYCLE_PALETTE.keys(), palette=CYCLE_PALETTE,
    ax=ax)

ax.set_xlabel("Participant ID")
ax.set_ylabel("# of cycles")
ax.xaxis.set(major_locator=plt.MultipleLocator(1))
ax.yaxis.set(major_locator=plt.MultipleLocator(10),
    minor_locator=plt.MultipleLocator(2))

plt.savefig(os.path.join(c.RESULTS_DIR, "bct-accuracyXsubj.png"))
plt.close()



""" ========================================================
plot correlation between accuracy and total # of cycles
"""

g = sea.JointGrid(data=participant_summary, x="n_cycles", y="accuracy",
    space=0, ratio=17)
g.plot_joint(sea.scatterplot,
    size=participant_summary["rt"],  sizes=(30, 120),
    color="g", alpha=.6, legend=False)
g.plot_marginals(sea.rugplot, height=1, color="g", alpha=.6)
# sea.jointplot(data=participant_summary, x="n_cycles", y="accuracy",
#     kind="hex", color="#4CB391")

plt.savefig(os.path.join(c.RESULTS_DIR, "bct-accuracyXncycles.png"))
plt.close()


""" ========================================================
plot distributions of breath counts for errors
"""
bins = np.linspace(-.5, 15.5, 17)
g = sea.displot(data=df,
    x="final_breath", hue="accuracy", row="participant_id",
    kind="hist", height=2, aspect=3,
    stat="count", bins=bins,
    # multiple="layer", element="step",
    multiple="dodge", element="bars",
)
g.set_axis_labels("Final breath", "Count")
# g.set_titles("{col_name} pingouin")
for ax in g.axes.flat:
    ax.xaxis.set(major_locator=plt.MultipleLocator(1))
    ax.yaxis.set(major_locator=plt.MultipleLocator(5),
        minor_locator=plt.MultipleLocator(1))

plt.savefig(os.path.join(c.RESULTS_DIR, "bct-errorlocXparticipant.png"))
plt.close()


""" ========================================================
correlate different error types
"""

sea.jointplot(data=participant_summary,
    x="miscount_rate", y="reset_rate",
    kind="reg")

plt.savefig(os.path.join(c.RESULTS_DIR, "bct-error_corrs.png"))
plt.close()




""" ========================================================
correlate all the BCT measures
**this should overtake the previous plots
""" 
SCATTER_ARGS = {
    "s" : 8,
    "color": "w",
    "edgecolor": "k",
    "linewidth" : .5,
    "clip_on" : False
}
PAIRPLOT_ARGS = {
    "kind" : "reg",
    "diag_kind" : "hist",
    "height" : 1,
    "aspect" : 1,
    "corner" : True,
    # "plot_kws" : dict(cmap="mako"),
    "plot_kws" : dict(scatter_kws=SCATTER_ARGS),
    "diag_kws" : dict(color="black"),
    "grid_kws" : dict(diag_sharey=False, despine=True, layout_pad=.5),
}


g = sea.pairplot(data=participant_summary, **PAIRPLOT_ARGS)

plt.savefig(os.path.join(c.RESULTS_DIR, "bct-correlations.png"))
plt.close()


