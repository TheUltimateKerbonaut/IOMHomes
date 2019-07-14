import json
import googlemaps

# Setup API
gmaps = googlemaps.Client(key="")

# Load the data
data_file = open("../initial-processing/data.json", "r")
data = {}
data = json.load(data_file)

for entry in data:
    # If postcode is not present
    if (entry["postcode"] == ""):

        # Get address, query Google, then store result
        address = entry["address"]
        
        geocode_result = gmaps.geocode(address)
        entry["geocode"] = geocode_result
