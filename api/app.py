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

    entries = []

    for entry in data:
        for row in entry:
            if search == None or (search.lower().replace(" ", "") in str(entry[row]).lower().replace(" ", "") and row != "placeID"):
                entries.append(entry)

    # Check if entries match dropdown criteria
    town = request.args.get('town')
    price_min = request.args.get('price_min')
    price_max = request.args.get('price_max')
    acquisition_year = request.args.get('year')
    registered_year = request.args.get('year')

    if search == None and town == None and price_min == None and price_max == None and acquisition_year == None and registered_year == None:
        return "[{\"error\": \"Please provide a search paremeters\"}]"

    correctEntries = []

    for i in range(0, len(entries)):

        year_acquisition = entries[i]["acquisition_date"].split(
            "/")[2]  # Eg if date is 1/2/2005
        # Then 2nd element in array split by the '/' characters would by 2005
        year_registered = entries[i]["acquisition_date"].split("/")[2]

        if town != None and entries[i]["town"].lower() != town.lower():
            continue  # Skip current iteration in for loop. Unlike break, continue allows for future loop iterations

        if ((price_min != None and entries[i]["market_value"] == "") or (price_min != None and float(entries[i]["market_value"]) < float(price_min))) and ((price_min != None and entries[i]["consideration"] == "") or (price_min != None and float(entries[i]["consideration"]) < float(price_min))):
            continue

        if ((price_max != None and entries[i]["market_value"] == "") or (price_max != None and float(entries[i]["market_value"]) > float(price_max))) and ((price_max != None and entries[i]["consideration"] == "") or (price_max != None and float(entries[i]["consideration"]) > float(price_max))):
            continue

        if acquisition_year != None and year_acquisition != acquisition_year:
            continue

        if registered_year != None and year_registered != registered_year:
            continue

        correctEntries.append(entries[i])

    # Protect against someone supplying no paremeters and getting all our data
    # by limiting entries to X long!
    if len(correctEntries) > 200:
        return "[{\"error\": \"There are too many results. Please make your search more specific.\"}]"
        

    if (len(correctEntries) == 0):
        return "[{\"error\": \"There are no results\"}]"

    correctEntries.sort(key=lambda x: datetime.datetime.strptime(x['registered_date'], '%d/%m/%Y'))
    correctEntries.reverse()
    return jsonify(correctEntries)

if __name__ == '__main__':
    app.run(host='0.0.0.0')