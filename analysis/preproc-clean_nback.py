"""
extract the WM/N-back task data from the
raw output and clean it up a bit

but don't analyze that's for later
"""
import os
import glob

import pandas as pd

import config as c



##### some variables

N = 2 # the N in N-back (how many back is correct)

KEEP_COLUMNS = ["participant_id", "letter",
    "match", "response", "rt", "correct"]



##### handle import/export filenames

glob_string = os.path.join(c.DATA_DIR, "breath-counting-task_*.csv")
import_fnames = sorted(glob.glob(glob_string))

export_fname = os.path.join(c.DERIVATIVE_DIR, "nback.csv")



##### parse each participant file

df_list = []
for fn in import_fnames:
    df_ = pd.read_csv(fn)
    df_ = df_.rename(columns={"run_id":"participant_id"})
    df_ = df_[df_["phase"]=="nback-test"]
    df_ = df_[KEEP_COLUMNS]

    # convert javascript bools to python bools
    # (relevant to the "match" and "correct" columns)
    df_.replace(dict(true=True, false=False), inplace=True)

    # round RTs
    df_["rt"] = df_["rt"].astype(float).round(1)

    # add trial counter
    df_.insert(1, "trial", range(1, len(df_)+1))

    # drop the first few trials where response isn't possible
    df_ = df_[N:]

    # only response and rt columns are allowed nulls
    assert not df_.isnull().sum().drop(["response", "rt"]).any()

    df_list.append(df_)



# stack em
df = pd.concat(df_list, ignore_index=True)

# export
df.to_csv(export_fname, index=False, na_rep="NA")