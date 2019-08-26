#!/bin/bash
echo "Beginning cronjob"

cd /home/housedata/cronUpdate # Go into directory

/usr/bin/python3 theFileToEndAllFiles.py # Run python script

rm /home/housedata/api/data.json # Get rid of old data

mv new_data.json /home/housedata/api/data.json # Replace with new data

touch /home/housedata/api/app.py # Restart API

echo "Finished cronjob"