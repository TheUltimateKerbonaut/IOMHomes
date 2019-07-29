import json

# Load JSON data
data = json.load(open("../../data.json", "r"))

# Make a new dictionary for each month
entries = {}

# Populate it with entries
for entry in data:
    #Find price and year
    price = entry["market_value"]
    year = date.split("/")[2]

    #Add all prices
    price += price

    #Averages
    average = price / year

# Save the entries as a minified JSON
json_string = json.dumps(entries, separators=(',', ':')) # Compact JSON structure
open("month-volume.json", "w+", 1).write(json_string) # open and write json_string to file




    
