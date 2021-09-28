"""
extract all survey data into one data file
- demographics
- MADRE
- LUSK (if applicable)
- FFMQ
"""
import os
import glob
import json

import pandas as pd

import config as c


# ##### some variables

# N = 2 # the N in N-back (how many back is correct)

# KEEP_COLUMNS = ["participant_id", "letter",
#     "match", "response", "rt", "correct"]
SURVEYS = ["demographics", "madre", "lusk", "ffmq"]


##### handle import/export filenames

glob_string = os.path.join(c.DATA_DIR, "breath-counting-task_*.csv")
import_fnames = sorted(glob.glob(glob_string))

export_fname = os.path.join(c.DERIVATIVE_DIR, "surveys.csv")



##### parse each participant file

ser_list = []
for fn in import_fnames:
    df_ = pd.read_csv(fn)
    # df_ = df_.rename(columns={"run_id":"participant_id"})
    # df_ = df_[df_["phase"].isin(SURVEYS)]
    participant_data = {}
    for survey_name in SURVEYS:
        survey_data_str = df_.loc[df_["phase"].eq(survey_name), "response"].values[0]
        survey_data = json.loads(survey_data_str)
        participant_data.update(survey_data)
    participant_id = df_["run_id"].unique()[0]
    ser_ = pd.Series(participant_data, name=participant_id)
    ser_list.append(ser_)

df = pd.concat(ser_list, axis=1).T
df.index.name = "participant_id"

MADRE_REPLACEMENTS = {
    "MADRE1" : {
        "never" : 0,
        "less than once a month": 1,
        "about once a month": 2,
        "two or three times a month": 3,
        "about once a week": 4,
        "several times a week": 5,
        "almost every morning": 6
    },
    "MADRE2" : {
        "never" : 0,
        "less than once a year": 1,
        "about once a year": 2,
        "about two to four times a year": 3,
        "about once a month": 4,
        "two to three times a month": 5,
        "about once a week": 6,
        "several times a week": 7
    },
    "MADRE3" : {
        "never" : 0,
        "less than once a year": 1,
        "about once a year": 2,
        "about two to four times a year": 3,
        "about once a month": 4,
        "two to three times a month": 5,
        "about once a week": 6,
        "several times a week": 7
    }
}

# rename the MADRE columns to more useful stuff
MADRE_RENAMINGS = dict(MADRE1="DRF", MADRE2="NRF", MADRE3="LRF")

df = df.replace(MADRE_REPLACEMENTS)
df = df.rename(columns=MADRE_RENAMINGS)

# start the questionnaires at 1 instead of 0
# and add a dash for easier splitting later
for col in df:
    if "LUSK" in col or "FFMQ" in col:
        # probe_number = "".join([ char for char in col if char.isdigit() ])
        scale = col[:4] # conveniently they are both 4 characters long
        probe_number = 1 + int(col[4:])
        newcol = f"{scale}-{probe_number:02d}"
        df.rename(columns={col:newcol}, inplace=True)


# convert to an int that can handle NAs
### this will break once NAs from the LUSK are involved
df = df.astype(int)

# only LUSK can be null
assert not df.isnull().sum().drop([ c for c in df if c.startswith("LUSK") ]).any()



def score_lusk(row):
    return row[[c for c in df if c.startswith("LUSK")]].sum()
df["LUSK-total"] = df.apply(score_lusk, axis=1)



#### go ahead and get FFMQ factors here
FFMQ_FACTORS = {
    "observe"  : [1, 6, 11, 15, 20, 26, 31, 36],
    "describe" : [2, 7, 12, 16, 22, 27, 32, 37],
    "aware"    : [5, 8, 13, 18, 23, 28, 34, 38],
    "nonjudge" : [3, 10, 14, 17, 25, 30, 35, 39],
    "nonreact" : [4, 9, 19, 21, 24, 29, 33]
}

REVERSE_SCORED = [12, 16, 22]

def get_ffmq_factor(row, factor_name):
    relevant_probes = FFMQ_FACTORS[factor_name]
    col_names = [ f"FFMQ-{p:02d}" for p in relevant_probes ]
    probe_scores = row[col_names]
    # add 1 bc I think it's traditionally 1-5 not 0-4?
    probe_scores += 1
    # reverse code if necessary
    for p in relevant_probes:
        if p in REVERSE_SCORED:
            colname = f"FFMQ-{p:02d}"
            probe_scores[colname] = 5 - probe_scores[colname]
    score = row[col_names].sum()
    return score

for factor_name in FFMQ_FACTORS.keys():
    df[f"FFMQ-{factor_name}"] = df.apply(get_ffmq_factor, axis=1, factor_name=factor_name)


# export
df.to_csv(export_fname, index=True)
