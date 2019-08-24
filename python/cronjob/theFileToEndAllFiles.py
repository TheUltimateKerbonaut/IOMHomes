from urllib import request # URL downloading
from datetime import datetime # For getting the date
from datetime import time
from time import gmtime

import csv
import requests

import sys

def isURLValid(url):
    try:  
        response = request.urlopen(url)
        csv = response.read()
        return True
    except:
        return False

def downloadData(url):
    response = requests.get(url)
    with open('data_temp.csv', 'w') as f:
        writer = csv.writer(f)
        for line in response.iter_lines():
            writer.writerow(line.decode('utf-8').split(','))
    
    with open('data_temp.csv', 'r') as f:
        with open('data_new.csv', 'w') as j:
            lineCount = 0
            for line in f.readlines():
                if lineCount % 2 == 0:
                    j.write(line)
                lineCount += 1

def getDate():
    return "{}/{}/{}".format(gmtime().tm_mday, gmtime().tm_mon, gmtime().tm_year)

def getDateForURL():

    # Get values
    day = str(gmtime().tm_mday)
    month = str(gmtime().tm_mon)
    year = str(gmtime().tm_year)

    # Add zeroes before them if too short
    if len(day) < 2:
        day = "0{}".format(day)
    if len(month) < 2:
        month = "0{}".format(month)
    
    return "{}{}{}".format(day, month, year)


print("Attempting to download data for date {} with code {}".format(getDate(), getDateForURL()))

url = 'https://www.gov.im/media/1357981/dfe_csv_{}.csv'.format(getDateForURL())
url = 'https://www.gov.im/media/1357981/dfe_csv_01072019.csv'

# Quit program if 404
if isURLValid(url) == False:
    print("404 error, terminating")
    sys.exit()

# Download data
downloadData(url)

# Convert to JSON
import json_convert