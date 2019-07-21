from stats import stats
import json

stats(json.load(open("../../data.json", "r")))