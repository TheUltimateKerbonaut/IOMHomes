import json

def landType(data):

    new_data = []

    for entry in data:
        del entry["i"] # Delete i key

        isHouse = "house"

        # Determine property type
        if ("land" in entry["house_name"] or "Land" in entry["house_name"]):
            isHouse = "not_house"
        if ("land" in entry["street"] or "Land" in entry["street"]):
            isHouse = "not_house"

        # Add property_type key
        entry["isHouse"] = isHouse

        new_data.append(entry)

    return new_data