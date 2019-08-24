import json
import csv

from json_convert import json_convert
from landType import landType
from onlyHouses import onlyHouses
from stats import stats

data = json_convert("../data.csv")

data = landType(data)

data = onlyHouses(data)

# Work out address
for entry in data:
    # Work out address
    firstLine = entry["house_no"]
    if (firstLine == ""):
        firstLine = entry["house_name"]
        
    secondLine = entry["street"]
    thirdLine = entry["town"]
    fourthLine = "Isle of Man"

    address = "{} {}, {}, {}".format(firstLine, secondLine, thirdLine, fourthLine)
    entry["address"] = address

stats(data)

file = open("cron_data.json", "w")
file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()
