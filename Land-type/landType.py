import json

data_file = open("../data.json", "r")
data = {} # The object containing the parsed JSON file


# Load JSON file into data object
data = json.load(data_file)

for entry in data:
    del entry["i"] # Delete i key

    # Determine property type
    if ("land" in entry["house_name"] or "Land" in entry["house_name"]):
        isHouse = "not_house"

    # Add property_type key
    entry["isHouse"] = isHouse

# Save the data object as a new JSON
file = open("data_landType.json", "w")
file.write(json.dumps(data, indent=4))
file.close()