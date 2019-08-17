from urllib import request # URL downloading
from datetime import datetime # For getting the date
from datetime import time
from time import gmtime

url = 'FILE'

def download_data(url):
    response = request.urlopen(url)
    csv = response.read()
    csv_str = str(csv)
    lines = csv_str.split("\n")
    dest_url = r'data.csv'
    fx = open(dest_url, 'w')
    for line in lines:
        fx.write((line + '\n'))
    fx.close()

def getDate():
    time.strftime("%d/%m/%Y",  gmtime())

#download_data(url)
print(getDate())