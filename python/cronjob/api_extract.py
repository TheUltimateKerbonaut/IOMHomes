import json

data_file = open("../../data.json", "r")
data = {}
data = json.load(data_file)

api_data = {}

for entry in data:
    try:
        bob = entry["placeID"]
        api_data[entry["address"]] = entry["placeID"]
    except:
        pass

file = open("api_results.json", "w")
file.write(json.dumps(api_data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()