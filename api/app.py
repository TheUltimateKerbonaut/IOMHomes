import flask
from flask import request, jsonify, Flask

import json
import os
import datetime
import operator

app = flask.Flask(__name__)
application = app

app.config["DEBUG"] = True

data = {}
data = json.load(open("data.json", "r"))


@app.route('/', methods=['GET'])
def home():

    # Get entries matching search
    search = request.args.get('search')
    town = request.args.get('town')
    price_min = request.args.get('price_min')
    price_max = request.args.get('price_max')
    acquisition_year = request.args.get('year')
    registered_year = request.args.get('year')

    if search == None and town == None and price_min == None and price_max == None and acquisition_year == None and registered_year == None:
        return "[{\"error\": \"Please provide a search paremeters\"}]"

    # ---- Stage 1: Check for errors and match search criteria ---- #
    initialEntries = []

    for entry in data:
        searchMatches = False
        for row in entry:
            if searchMatches == False and (search == None or (search.lower().replace(" ", "").replace(",", "").replace("'", "") in str(entry[row]).lower().replace(" ", "") and row != "placeID")):
                searchMatches = True

        if searchMatches:
            year_acquisition = entry["acquisition_date"].split("/")[2]  # Eg if date is 1/2/2005
            # Then 2nd element in array split by the '/' characters would by 2005

            year_registered = entry["acquisition_date"].split("/")[2]

            if town != None and entry["town"].lower() != town.lower():
                continue  # Skip current iteration in for loop. Unlike break, continue allows for future loop iterations

            if ((price_min != None and entry["market_value"] == "") or (price_min != None and float(entry["market_value"]) < float(price_min))) and ((price_min != None and entry["consideration"] == "") or (price_min != None and float(entry["consideration"]) < float(price_min))):
                continue

            if ((price_max != None and entry["market_value"] == "") or (price_max != None and float(entry["market_value"]) > float(price_max))) and ((price_max != None and entry["consideration"] == "") or (price_max != None and float(entry["consideration"]) > float(price_max))):
                continue

            if acquisition_year != None and year_acquisition != acquisition_year:
                continue

            if registered_year != None and year_registered != registered_year:
                continue

            initialEntries.append(entry)

    # Protect against someone supplying no paremeters and getting all our data
    # by limiting entries to X long!
    if len(initialEntries) > 200:
        return "[{\"error\": \"There are too many results. Please make your search more specific.\"}]"
    if (len(initialEntries) == 0):
        return "[{\"error\": \"There are no results\"}]"

    # ---- Stage 2: Make new list with entries that have address present in initialEntries ---- #
    stage2Entries = []
    for entry in data:
        addressPresent = False
        for initalEntry in initialEntries:
            if addressPresent or entry["address"] == initalEntry["address"]:
                addressPresent = True
        
        if addressPresent:
            stage2Entries.append(entry)

    # ---- Stage 3: Group stage 2 entries into masters ---- #
    stage2Entries.sort(key=lambda x: x['address']) # Orgnanise by address
    stage3Entries = [] # Create new list
    lastAddress = "" # Keep track of last address
    masterIndex = -1 # Index of current master
    for entry in stage2Entries: 
        if entry["address"] != lastAddress:
            x = []
            x.append(entry)
            stage3Entries.append(x)
            masterIndex += 1
        else:
            stage3Entries[masterIndex].append(entry)
        
        lastAddress = entry["address"]

    # ---- Stage 3: Organise stage 3 entries and return ---- #
    stage3Entries.sort(key=lambda x: x[0]["house_no"])
    for master in stage3Entries:
        master.sort(key=lambda x: datetime.datetime.strptime(x['acquisition_date'], '%d/%m/%Y'))
        master.reverse()

    return jsonify(stage3Entries)

if __name__ == '__main__':
    app.run(host='0.0.0.0')