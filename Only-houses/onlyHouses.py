import json

data_file = open("../data.json", "r")
data = {} # The object containing the parsed JSON file


# Load JSON file into data object
data = json.load(data_file)

for entry in data:
    if (entry["isHouse"] != "house"):
        data.remove(entry)

# Save the data object as a new JSON
file = open("data_onlyHouses.json", "w")
file.write(json.dumps(data, indent=4))
file.close()