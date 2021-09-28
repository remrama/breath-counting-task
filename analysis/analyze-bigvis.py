"""Draw a big descriptive plot
showing *every press* from every participant.
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



import_fname = os.path.join(c.DERIVATIVE_DIR, "bct-presses.csv")

df = pd.read_csv(import_fname)

# convert RTs to seconds
df["rt"] /= 1000


print("still unclear about handling nan cycles from repeated presses")
# assert not df.isnull().values.any()
df.dropna(inplace=True)



"""========================================================
plot the timecourse of all presses all subjects
"""

_, ax = plt.subplots(figsize=(5,3), constrained_layout=True)
sea.lineplot(data=df, x="pc", y="rt",
    hue="participant_id",
    palette="cividis",
    # units="participant_id", estimator=None
    ax=ax)

ax.set_xbound(lower=0)
ax.set_ybound(lower=0)
ax.set_xlabel("Cumulative press count")
ax.set_ylabel("Time between presses (s)")
ax.xaxis.set(major_locator=plt.MultipleLocator(50),
    minor_locator=plt.MultipleLocator(10))
# ax.yaxis.set(major_locator=plt.MultipleLocator(1),
#     minor_locator=plt.MultipleLocator(.2))

plt.savefig(os.path.join(c.RESULTS_DIR, "bct-rtXpress.png"))
plt.close()



"""========================================================
plot a "map" of all presses/accuracy/rt/responses
for each participant individually

- each participant gets their own "row"
- each press response (space/down/right) gets its own shape
    - also size is impacted, spaces and rights are bigger bc they end "cycles"
- each press accuracy (correct/miscount/reset) gets its own color
"""

# flip to a dataframe with RTs in columns and press count as index.
# we need, for each participant and press,
# the RT, the response, and the press accuracy
df_ = df.pivot(
    columns="participant_id",
    index="pc",
    values=["rt", "press_correct", "response"],
    # values=["rt_sum","press_correct"],
    ).sort_index(axis="index").sort_index(axis="columns"
)

df_["rt"] = df_["rt"].cumsum()


n_participants = df["participant_id"].nunique()


RESPONSE_MARKERS = {
    "space": "s",
    "arrowdown": "v",
    "arrowright": "o",
}

RESPONSE_SIZES = {
    "space": 10,
    "arrowright": 30,
    "arrowdown": 2,
}

CORR_PALETTE = {
    "space" : "gray",
    "correct" : "forestgreen",
    "incorrect" : "indianred",
}

ALPHA = .7

# open plot
_, ax = plt.subplots(figsize=(6.5,.5*n_participants), constrained_layout=True)

for pp, pdf in df.groupby("participant_id"):
    pdf["cumrt"] = pdf["rt"].cumsum()
    for (resp, correct), _pdf in pdf.groupby(["response", "press_correct"]):
        marker = RESPONSE_MARKERS[resp]
        size = RESPONSE_SIZES[resp]
        if resp == "space":
            color = CORR_PALETTE[resp]
        else:
            color = CORR_PALETTE["correct"] if correct else CORR_PALETTE["incorrect"]
        xvals = _pdf["cumrt"].values
        yvals = np.repeat(pp, xvals.size)
        ax.scatter(xvals, yvals,
            s=size, marker=marker, c=color,
            alpha=ALPHA, linewidths=0)

EXP_LENGTH = 5 # minutes
ax.set_xlim(0, EXP_LENGTH*60)
ax.xaxis.set(major_locator=plt.MultipleLocator(60))
    # minor_locator=plt.MultipleLocator(60))
# ax.yaxis.set(major_locator=plt.MultipleLocator(1))
ax.set_xlabel("Experiment time (seconds)", fontsize=10)
ax.set_ylabel("Participant", fontsize=10)
ax.set_ylim(.5, n_participants+.5)
ax.invert_yaxis()


plt.savefig(os.path.join(c.RESULTS_DIR, "bct-allpresses.png"))
plt.close()
