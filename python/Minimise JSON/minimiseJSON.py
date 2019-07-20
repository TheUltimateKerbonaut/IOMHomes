import json
import sys

file_data = open("../../data.json", "r", 1).read() # store file info in variable
json_data = json.loads(file_data) # store in json structure
json_string = json.dumps(json_data, separators=(',', ':')) # Compact JSON structure
    
open("output.json", "w+", 1).write(json_string) # open and write json_string to file