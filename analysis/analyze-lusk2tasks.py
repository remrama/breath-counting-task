"""
correlate LUSK w/ BCT
correlate LUSK w/ nback
2-panel figure
"""
import os
import pandas as pd
import config as c

import seaborn as sea
import matplotlib.pyplot as plt
plt.rcParams["interactive"] = True
plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = "Arial"

export_fname = os.path.join(c.RESULTS_DIR, "lusk-task_correlations.png")

import_fname_nback  = os.path.join(c.DERIVATIVE_DIR, "nback-performance.csv")
import_fname_bct    = os.path.join(c.DERIVATIVE_DIR, "bct-performance.csv")
import_fname_survey = os.path.join(c.DERIVATIVE_DIR, "surveys.csv")

nback  = pd.read_csv(import_fname_nback, index_col="participant_id")
bct    = pd.read_csv(import_fname_bct, index_col="participant_id")
survey = pd.read_csv(import_fname_survey, index_col="participant_id")

# concatenate the relevant series from each dataframe
df = pd.concat([nback, bct, survey], axis=1)

# stuff of interest and renamings
RELEVANT_COLUMNS = {
    "hit_minus_fa" : "WM",
    "accuracy" : "BCT",
    "LUSK-total" : "LUSK",
    "FFMQ-observe" : "FFMQ",
    "LRF" : "LDF",
}

plot_df = df[list(RELEVANT_COLUMNS.keys())].rename(columns=RELEVANT_COLUMNS)

# # drop anyone without scores (should just be LUSK)
# plot_df.dropna(inplace=True)

PALETTE = dict(BCT="orange", WM="gray")
SCATTER_ARGS = {
    "marker" : "o",
    "alpha" : .7,
    "s" : 10,
}

fig, ax1 = plt.subplots(figsize=(3,2.5), constrained_layout=True)
ax2 = ax1.twinx()
axes = [ax1, ax2]
ax1.set_ylim(0, 1)
ax2.set_ylim(0, 1)
ax1.set_xlabel("LUSK total dream control")
ax1.set_ylabel("Breath counting task")
ax2.set_ylabel("Working memory 2-back")
ax1.yaxis.label.set_color(PALETTE["BCT"])
ax2.yaxis.label.set_color(PALETTE["WM"])
ax1.tick_params(axis="y", colors=PALETTE["BCT"])
ax2.tick_params(axis="y", colors=PALETTE["WM"])


YVAR_ORDER = ["BCT", "WM"]
XAXIS_VAR = "LUSK"
xvals = plot_df[XAXIS_VAR].values
for yvar, ax in zip(YVAR_ORDER, axes):
    yvals = plot_df[yvar].values
    ax.scatter(xvals, yvals, c=PALETTE[yvar], **SCATTER_ARGS)
    # sea.regplot(data=plot_df, x=XAXIS_VAR, y=yvar, ax=ax)


plt.savefig(export_fname)
plt.close()