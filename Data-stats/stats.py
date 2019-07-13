import json

def getPercentOfKey(data, key):
    entrySize = len(data)
    entriesCompleted = 0

    for entry in data:
        if (entry[key] != ""):
            entriesCompleted += 1
    
    value = entriesCompleted / entrySize * 100
    return (int(value*100) / 100)

data_file = open("../data.json", "r")
data = {} # The object containing the parsed JSON file

# Load JSON file into data object
data = json.load(data_file)

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
    print("{}: {}%".format(entry[0], entry[1]))

print("\n")