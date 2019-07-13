# File responsible for loading the CSV data and dumping it as a json

import csv
import json

# Open the file
csv_file = open('data.csv')
csv_reader = csv.reader(csv_file, delimiter=',')

# Create array of tuples corresponding to each entry
dictionaries = []

# Go through each row of the file, as long as it isn't the first row (as those are the column names)
line_count = 0
for row in csv_reader:
    if (line_count != 0):
        row_data = {
            "i": row[0],
            "house_name": row[1],
            "house_no": row[2],
            "street": row[3],
            "locale": row[4],
            "town": row[5],
            "postcode": row[6],
            "parish": row[7],
            "consideration": row[8],
            "market_value": row[9],
            "acquisition_date": row[10],
            "registered_date": row[11]
        }

        dictionaries.append(row_data)

    line_count += 1

# Now the data is in an easy to read format, export it as a json
file = open("data.json", "w")
file.write(json.dumps(dictionaries, indent=4)) # the indent option makes it have nice formatting - larger file sizes but more human readable
file.close()