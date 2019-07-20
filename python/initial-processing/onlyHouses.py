import json

def onlyHouses(data):

	new_data = []

	for entry in data:
		if (entry["isHouse"] == "house"):
			del entry["isHouse"]
			new_data.append(entry)
	
	return new_data
