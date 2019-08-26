import json

def getPercentOfKey(data, key):
    entrySize = len(data)
    entriesCompleted = 0

    for entry in data:
        if (entry[key] != ""):
            entriesCompleted += 1
    
    value = entriesCompleted / entrySize * 100
    return (int(value*100) / 100)

import sys # For flush

def housesPerYear():

    data_file = open("../../data.json", "r")
    data = {}
    data = json.load(data_file)

    years = {}

    for entry in data:
        year = entry["acquisition_date"][-4:]
        try:
            years[year] = str(int(years[year]) + 1)
        except:
            years[year] = 0
            years[year] = str(int(years[year]) + 1)

    for year in years:
        print(year + ": " + years[year])

    sys.stdout.write("[")
    for year in years:
        if (int(year) >= 2000):
            sys.stdout.write(years[year] + ", ")
    sys.stdout.write("]")
    sys.stdout.flush()

housesPerYear()

def stats(data):

    print("\n/////// Data statistics \\\\\\\\\\\\\\\n")

    # Number of entries
    print("Number of entries: {}\n".format(len(data)))

    entryStats = []

    # Towns
    percent = getPercentOfKey(data, "town")
    entryStats.append(("Towns", percent))

    # Market values
    percent = getPercentOfKey(data, "market_value")
    entryStats.append(("Market values", percent))

    # House names
    percent = getPercentOfKey(data, "house_name")
    entryStats.append(("House Names", percent))

    # Locale
    percent = getPercentOfKey(data, "locale")
    entryStats.append(("Locales", percent))

    # Parishes
    percent = getPercentOfKey(data, "parish")
    entryStats.append(("Parishes", percent))

    # Acquisition dates
    percent = getPercentOfKey(data, "acquisition_date")
    entryStats.append(("Acquisition Dates", percent))

    # Streets
    percent = getPercentOfKey(data, "street")
    entryStats.append(("Streets", percent))

    # Registered dates
    percent = getPercentOfKey(data, "registered_date")
    entryStats.append(("Reigistered dates", percent))

    # Postcodes
    percent = getPercentOfKey(data, "postcode")
    entryStats.append(("Postcodes", percent))

    # Considerations
    percent = getPercentOfKey(data, "consideration")
    entryStats.append(("Considerations", percent))

    # House Numbers
    percent = getPercentOfKey(data, "house_no")
    entryStats.append(("House Numbers", percent))

    # Order list and print
    def sortEntry(val):
        return val[1]

    entryStats.sort(key=sortEntry)

    for entry in entryStats:
        print("{}: {}% - {} entries missing".format(entry[0], entry[1], round (len(data) - (entry[1] / 100 * len(data)))))

    print("\n")