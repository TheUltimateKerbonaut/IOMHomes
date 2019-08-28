#!/bin/bash
echo "Beginning cronjob"

source /home/housedata/virtualenv/api/3.7/bin/activate

cd /home/housedata/cronUpdate # Go into directory

/home/housedata/virtualenv/api/3.7/bin/python theFileToEndAllFiles.py # Run python script

#rm /home/housedata/api/data.json # Get rid of old data

mv new_data.json /home/housedata/api/data.json # Replace with new data

touch /home/housedata/api/app.py # Restart API

echo "Finished cronjob"