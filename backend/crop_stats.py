# crop_stats.py

import pandas as pd

df = pd.read_csv("data/master_agriculture_dataset (1).csv")

print("Number of crops:", df["crop"].nunique())
print()
print(df["crop"].value_counts())