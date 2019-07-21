import json

# Load the data
data_file = open("../../data.json", "r")
data = {}
data = json.load(data_file)

for entry in data:
    # If postcode is not present
    if entry["postcode"] == "" and "results" in entry["placeID"] and len(entry["placeID"]["results"]) > 0:
        address = entry["placeID"]["results"][0]["formatted_address"].replace(",", "")

        postcodeLocation = address.find("IM")

        if postcodeLocation != -1:
            postcode = address[postcodeLocation:postcodeLocation+7]
            if len(postcode.replace(" ", "")) == 6:
                entry["postcode"] = postcode


file = open("data_correct.json", "w")
file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()