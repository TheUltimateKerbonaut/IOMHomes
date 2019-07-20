from flask import request, jsonify

import json
import os
app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return jsonify(data)
    
data = {}
data = json.load(open("../data.json", "r"))

@app.route('/api/', methods=['GET'])
def home():

    # Get entries matching search
    string = request.args.get('search')

    if (string == None):
        string = ""

    entries = []

    for entry in data:
        for row in entry:
            if (string in entry[row]):
                entries.append(entry)
    
    if (len(entries) == 0):
        return ""

    # Check if entries match dropdown criteria
    town = request.args.get('town')
    price_range = request.args.get('price')
    year = request.args.get('year')

    correctEntries = []

    for i in range(0, len(entries)):
        if entries[i]["town"] == town:
            correctEntries.append(correctEntries)

    return jsonify(correctEntries)
    # return jsonify(data)

app.run()