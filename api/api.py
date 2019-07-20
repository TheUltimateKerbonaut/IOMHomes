import flask
from flask import request, jsonify, Flask

import json
import os

app = flask.Flask(__name__)
app.config["DEBUG"] = True

data = {}
data = json.load(open("../data.json", "r"))


@app.route('/', methods=['GET'])
def home():

    # Get entries matching search
    search = request.args.get('search')

    entries = []

    for entry in data:
        for row in entry:
            if (search == None or search in entry[row]):
                entries.append(entry)

    # Check if entries match dropdown criteria
    town = request.args.get('town')
    price_min = request.args.get('price_min')
    price_max = request.args.get('price_max')
    acquisition_year = request.args.get('acquisition_year')
    registered_year = request.args.get('registered_year')

    correctEntries = []

    for i in range(0, len(entries)):

        year_acquisition = entries[i]["acquisition_date"].split(
            "/")[2]  # Eg if date is 1/2/2005
        # Then 2nd element in array split by the '/' characters would by 2005
        year_registered = entries[i]["acquisition_date"].split("/")[2]

        if town != None and entries[i]["town"].lower() != town.lower():
            continue  # Skip current iteration in for loop. Unlike break, continue allows for future loop iterations

        if entries[i]["market_value"] == "" or price_min != None and float(entries[i]["market_value"]) < float(price_min):
            continue

        if entries[i]["market_value"] == "" or price_max != None and float(entries[i]["market_value"]) > float(price_max):
            continue

        if acquisition_year != None and year_acquisition != acquisition_year:
            continue

        if registered_year != None and year_registered != registered_year:
            continue

        correctEntries.append(entries[i])

    # Protect against someone supplying no paremeters and getting all our data
    # by limiting entries to 100 long!
    if len(correctEntries) > 100:
        return "Error: too many results"

    if (len(correctEntries) == 0):
        return "Error: 0 results"

    return jsonify(correctEntries)

if __name__ == '__main__':
    app.run(host='0.0.0.0')