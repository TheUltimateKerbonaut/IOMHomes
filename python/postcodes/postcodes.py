import json
import googlemaps
from time import sleep

# Setup API
gmaps = googlemaps.Client(key="")

# Load the data
data_file = open("../../data.json", "r")
data = {}
data = json.load(data_file)

for entry in data:
    # If postcode is not present
    if (entry["postcode"] == ""):

        address = entry["address"]
        print("Getting data for address {}".format(address))

        # Get the place ID
        entry["placeID"] = gmaps.places(address, "textquery")
        #sleep(3)

        print(entry["placeID"])

        file = open("data.json", "w")
        file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
        file.close()

file = open("data.json", "w")
file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()