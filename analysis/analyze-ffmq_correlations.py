"""
correlate all subscores of FFMQ
"""
import os
import pandas as pd
import config as c

import seaborn as sea
import matplotlib.pyplot as plt
plt.rcParams["interactive"] = True
plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = "Arial"

export_fname = os.path.join(c.RESULTS_DIR, "test.png")


import_fname_nback  = os.path.join(c.DERIVATIVE_DIR, "nback-performance.csv")
import_fname_bct    = os.path.join(c.DERIVATIVE_DIR, "bct-performance.csv")
import_fname_survey = os.path.join(c.DERIVATIVE_DIR, "surveys.csv")
nback  = pd.read_csv(import_fname_nback, index_col="participant_id")
bct    = pd.read_csv(import_fname_bct, index_col="participant_id")
survey = pd.read_csv(import_fname_survey, index_col="participant_id")

# concatenate the relevant series from each dataframe
df = pd.concat([nback, bct, survey], axis=1)
df = df.dropna()

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

FFMQ_COLUMNS = [ f"FFMQ-{x}" for x in 
    ("observe", "describe", "aware", "nonjudge", "nonreact") ]

# g = sea.pairplot(data=df, vars=FFMQ_COLUMNS, **PAIRPLOT_ARGS)
g = sea.pairplot(data=df[FFMQ_COLUMNS], **PAIRPLOT_ARGS)
for ax in g.axes.flat:
    if ax is not None:
        if ax.get_subplotspec().is_first_col() and not ax.get_subplotspec().is_first_row():
            ax.set_ylabel(ax.get_ylabel().split("-")[1])
        if ax.get_subplotspec().is_last_row():
            ax.set_xlabel(ax.get_xlabel().split("-")[1])

# g.fig.suptitle("Facial expressions conveyed in videos")


plt.savefig(os.path.join(c.RESULTS_DIR, "ffmq-correlations.png"))
plt.close()



############### correlate ffmq with BCT and LUSK

plot_df = df.melt(value_vars=FFMQ_COLUMNS,
                  id_vars=["LUSK-total", "LRF"],
                  value_name="ffmq_score", var_name="ffmq_var"
    ).melt(value_vars=["LUSK-total", "LRF"],
           id_vars=["ffmq_score", "ffmq_var"],
           value_name="ld_score", var_name="ld_var")

g = sea.lmplot(data=plot_df,
    x="ffmq_score", y="ld_score",
    col="ffmq_var", row="ld_var", hue="ffmq_var",
    height=3, aspect=1)

# g.set_titles(col_template="{col_name}", row_template="{row_name}")
# g.set_titles(col_template="{col_name}", row_template="{row_name}")
# g.set_axis_labels("Total bill (US Dollars)", "Tip")
# g.set(xlim=(0, 60), ylim=(0, 12), xticks=[10, 30, 50], yticks=[2, 6, 10])
# g.tight_layout()
# g.fig.subplots_adjust(wspace=.02)

plt.savefig(os.path.join(c.RESULTS_DIR, "ffmq-subs2ld.png"))
plt.close()
