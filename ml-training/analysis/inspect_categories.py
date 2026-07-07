# inspect_categories.py

import pandas as pd

df = pd.read_csv("data/master_agriculture_dataset (1).csv")

for col in [
    "season",
    "soil_color",
    "region",
    "district_name",
    "fertilizer"
]:
    print("\n", col)
    print(df[col].nunique())
    print(df[col].unique()[:20])