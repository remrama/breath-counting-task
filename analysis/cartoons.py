"""draw some cartoonish graphs about predictions
"""

import numpy as np
import matplotlib.pyplot as plt

plt.rcParams["savefig.dpi"] = 600
plt.rcParams["interactive"] = True
# plt.rcParams["font.family"] = "sans-serif"
# plt.rcParams["font.sans-serif"] = "Arial"
# plt.rcParams["mathtext.fontset"] = "custom"
# plt.rcParams["mathtext.rm"] = "Arial"
# plt.rcParams["mathtext.it"] = "Arial:italic"
# plt.rcParams["mathtext.bf"] = "Arial:bold"


################ Study 1 correlation
################ Study 1 correlation
################ Study 1 correlation
## https://stackoverflow.com/a/18684433
N = 50
HIGH_LDF_PROB = .15 # estimate how many of the subjects will be high LDF recallers
LUSK_MU = 1.51
LUSK_SD = 0.88
LUSK_RANGE = (0, 4)
BCT_MU = 90
BCT_SD = 7
BCT_RANGE = (0, 100)
# imagine LUSK and BCT are correlated at a certain r
LUSK_BCT_R = .4
# correlation coefficient equals the covariance between the variables divided by the product of the standard deviations of each variable
# convert r to covariance
# r = cov/(LUSK_SD*BCT_SD)
cov = LUSK_BCT_R*(LUSK_SD*BCT_SD)
cov_mat = np.array([
    [BCT_SD**2, cov],
    [cov,  LUSK_SD**2],
])
mu = np.array([BCT_MU, LUSK_MU])
x, y = np.random.multivariate_normal(mu, cov_mat, size=N).T
b, m = np.polynomial.polynomial.polyfit(x, y, 1)
with plt.xkcd():
    _, ax = plt.subplots(figsize=(3,3), constrained_layout=True)
    # use plot instead of scatter bc I don't think scatter is influenced by xkcd style
    # ax.scatter(x, y, s=80)
    ax.plot(x, b+m*x, "-", c="black")
    ax.plot(x, y, "o", c="w", mec="k", ms=5) #mew=0)
    XLABEL = r"worse $\leftarrow$   mindfulness   $\rightarrow$ better"
    YLABEL = r"less $\leftarrow$   dream control   $\rightarrow$ more"
    ax.set_xlabel(XLABEL, fontsize=10)
    ax.set_ylabel(YLABEL, fontsize=10)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.xaxis.set(major_locator=plt.NullLocator())
    ax.yaxis.set(major_locator=plt.NullLocator())
    # ax.set_xbound(upper=BCT_RANGE[1])
    # ax.set_ylim(*LUSK_RANGE)
    # ax.xaxis.set(major_locator=plt.MultipleLocator(10))
    # ax.yaxis.set(major_locator=plt.MultipleLocator(1))

plt.savefig("../results/study1.png")
plt.close()
################
################
################
################
################



#################### Study 2 bars
#################### Study 2 bars
#################### Study 2 bars

from scipy.stats import sem

N = 100

d = 1.0

# baseline measures (non-intervention)
# THOUGH this probably won't be LUSK
LUSK_MU = 1.51
LUSK_SD = 0.88
LUSK_RANGE = (0, 4)

# simulate non-intervention means
y1 = np.random.normal(LUSK_MU, LUSK_SD, size=N)
# y1_mean = y1.mean()
# # d = (y2.mean() - y1.mean()) / np.sqrt((y1.var(ddof=1) +
# #                                        y2.var(ddof=1)) / 2)
# # d = (y2_mean - y1_mean) / np.sqrt(y1.var(ddof=1))
# y2_mean = y1_mean + (d * np.sqrt(y1.var(ddof=1)))
y2_mean = LUSK_MU + (d*LUSK_SD)

y2 = np.random.normal(y2_mean, LUSK_SD, size=N)

with plt.xkcd():
    _, ax = plt.subplots(figsize=(2,3), constrained_layout=True)
    # use plot instead of scatter bc I don't think scatter is influenced by xkcd style
    ax.bar(1, y1.mean(), color="w", ec="k", lw=2)
    ax.bar(2, y2.mean(), color="w", ec="k", lw=2)
    ax.set_xlim(.1,2.9)
    ax.set_ylim(*LUSK_RANGE)

    ax.xaxis.set(major_locator=plt.FixedLocator([1,2]))
    ax.yaxis.set(major_locator=plt.NullLocator())
    ax.set_xticklabels(["pre\nBCT", "post\nBCT"], fontsize=12)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    YLABEL = "dream control"
    ax.set_ylabel(YLABEL, fontsize=12)

plt.savefig("../results/study2.png")
plt.close()
################
################
################


#################### Study 3




