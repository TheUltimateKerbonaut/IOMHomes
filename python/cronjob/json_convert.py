# File responsible for loading the CSV data and dumping it as a json

import csv
import json

def json_convert(file):

    # Open the file
    csv_file = open(file)
    csv_reader = csv.reader(csv_file, delimiter=',')

    # Create array of tuples corresponding to each entry
    dictionaries = []

    # Go through each row of the file, as long as it isn't the first row (as those are the column names)
    line_count = 0
    for row in csv_reader:
        if (line_count != 0 and len(row) != 1):
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

    return dictionaries