import json

# Load JSON data
data = json.load(open("../../data.json", "r"))

# Make a new dictionary for each month
entries = {}

# Populate it with entries
for entry in data:

    # Get the entry's month and year
    date = entry["acquisition_date"]
    month = date.split("/")[1]
    year = date.split("/")[2]
    final_month = int(year)*12 + int(month)

    # Try to add 1 to the month's count. If it fails, add the new key and repeat
    try:
        entries[str(final_month)] = str(int(entries[str(final_month)]) + 1)
    except:
        entries[str(final_month)] = "0"
        entries[str(final_month)] = str(int(entries[str(final_month)]) + 1)

# Save the entries as a minified JSON
json_string = json.dumps(entries, separators=(',', ':')) # Compact JSON structure
open("month-volume.json", "w+", 1).write(json_string) # open and write json_string to file