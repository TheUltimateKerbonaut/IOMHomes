import json
import googlemaps
import time

# Setup API
gmaps = googlemaps.Client(key="")

# Load the data
data_file = open("../data.json", "r")
data = {}
data = json.load(data_file)

for entry in data:
    # If postcode is not present
    if (entry["postcode"] == ""):

        address = entry["address"]
        print("Getting postcode for address {}".format(address)) 

        # makes a new element in dictionary
        entry["response"] = gmaps.places(address)
        print(entry["response"])
        sleep(3)
        

file = open("data.json", "w")
file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()