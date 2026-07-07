import pandas as pd

df = pd.read_csv("data/master_agriculture_dataset (1).csv")

print(df.isnull().sum().sort_values(ascending=False).head(20))