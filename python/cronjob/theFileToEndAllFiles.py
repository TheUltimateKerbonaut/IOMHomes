from urllib2 import urlopen # URL downloading
from datetime import datetime # For getting the date
from datetime import time
from time import gmtime

import csv
import requests

import sys

def isURLValid(url):
    try:
        response = urlopen(url)
        csv = response.read()
        return True
    except Exception as e:
        print(e)
        return False

def downloadData(url):
    response = requests.get(url)
    with open('data_temp.csv', 'w') as f:
        writer = csv.writer(f)
        for line in response.iter_lines():
            writer.writerow(line.decode('utf-8').split(','))
    
    with open('data_temp.csv', 'r') as f:
        with open('data_new.csv', 'w') as j:
            lineCount = 0
            for line in f.readlines():
                if line != '""\n':
                    j.write(line)
                lineCount += 1

def getDate():
    return "{}/{}/{}".format(gmtime().tm_mday, gmtime().tm_mon, gmtime().tm_year)

def getDateForURL():

    # Get values
    day = str(gmtime().tm_mday)
    month = str(gmtime().tm_mon)
    year = str(gmtime().tm_year)

    # Add zeroes before them if too short
    if len(day) < 2:
        day = "0{}".format(day)
    if len(month) < 2:
        month = "0{}".format(month)
    
    return "{}{}{}".format(day, month, year)


print("Attempting to download data for date {} with code {}".format(getDate(), getDateForURL()))

url = 'https://www.gov.im/media/1357981/dfe_csv_{}.csv'.format(getDateForURL())
#url = 'https://www.gov.im/media/1357981/dfe_csv_01072019.csv'

# Quit program if 404
if isURLValid(url) == False:
    print("404 error, terminating")
    sys.exit()

# Download data
downloadData(url)

# Do stuff
from json_convert import json_convert
data = json_convert("data_new.csv")

from landType import landType
from onlyHouses import onlyHouses

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

import json

# Add previous API requests
api_file = open("api_results.json", "r")
api_requests = {}
api_requests = json.load(api_file)



for entry in data:
    try:
        testVar = api_requests[entry["address"]]
        entry["placeID"] = api_requests[entry["address"]]

        if "results" in entry["placeID"] and len(entry["placeID"]["results"]) > 0:
            address = entry["placeID"]["results"][0]["formatted_address"].replace(",", "")

        postcodeLocation = address.find("IM")

        if postcodeLocation != -1:
            postcode = address[postcodeLocation:postcodeLocation+7]
            if len(postcode.replace(" ", "")) == 6:
                entry["postcode"] = postcode

    except Exception as e:
        #print(e)
        pass

file = open("temp_data.json", "w")
file.write(json.dumps(data, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()

# Minify
import sys

file_data = open("temp_data.json", "r", 1).read() # store file info in variable
json_data = json.loads(file_data) # store in json structure
json_string = json.dumps(json_data, separators=(',', ':')) # Compact JSON structure
    
open("new_data.json", "w+", 1).write(json_string) # open and write json_string to file

print("Successfully updated file new_data.json")