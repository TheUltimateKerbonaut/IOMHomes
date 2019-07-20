import json
import googlemaps
from time import sleep

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
        print("Getting data for address {}".format(address))

        # Get the place ID
        entry["placeID"] = gmaps.places(gmaps, address)
        sleep(3)

        # TODO:Format data to get place_ID

        # Define fields we want sent back
        #my_fields = ['postcode', 'house_number', "house_name"]
        
        # Make request for the data
        #place_details = gmaps.entry(placeID = place_ID, fields = my_fields)
        #entry["place_details"] = place_details

file = open("data.json", "w")
file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()