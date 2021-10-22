"""
Score the nback for each subject.
Take RTs from the hit trials.
"""
import os
import pandas as pd
import config as c


import_fname = os.path.join(c.DERIVATIVE_DIR, "nback-presses.csv")
export_fname = os.path.join(c.DERIVATIVE_DIR, "nback-performance.csv")

df = pd.read_csv(import_fname)


# calculate accuracy as hit rate minus false alarm rate
# get them separately for ease of reference later
def get_hit_rate(subject_sdt_series):
    n_hits   = subject_sdt_series.eq("HIT").sum()
    n_misses = subject_sdt_series.eq("MISS").sum()
    return n_hits / (n_hits+n_misses)
def get_falsealarm_rate(subject_sdt_series):
    n_falarms  = subject_sdt_series.eq("FA").sum()
    n_crejects = subject_sdt_series.eq("CR").sum()
    return n_falarms / (n_falarms+n_crejects)

hit_rate = df.groupby("participant_id"
    ).sdt.apply(get_hit_rate).rename("hit_rate")
falsealarm_rate = df.groupby("participant_id"
    ).sdt.apply(get_falsealarm_rate).rename("falsealarm_rate")

sdt_score = (hit_rate - falsealarm_rate).rename("hit_minus_fa")

rt = df[df.sdt.eq("HIT")].groupby("participant_id"
    ).rt.mean().rename("rt")

out_df = pd.concat([hit_rate, falsealarm_rate, sdt_score, rt],
    axis=1, verify_integrity=True)


# export
assert not out_df.isnull().any().any()
out_df.round(3).to_csv(export_fname, index=True)
