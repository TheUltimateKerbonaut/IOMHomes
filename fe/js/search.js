function search()
{
	// Get inputs
    var searchText = document.getElementById("bottomSearchbar").value

	let townDropdownQuery = getDropdownQuery("townDropdown");
	let priceDropdownMinQuery = getDropdownQuery("priceDropdown").split("-")[0]
	let priceDropdownMaxQuery = getDropdownQuery("priceDropdown").split("-")[1]
	let yearDropdownQuery = getDropdownQuery("yearDropdown");

    // Bit of formatting here and there
    if (searchText !== undefined)
        searchText = searchText.replace(" ", "%20");

    if (priceDropdownMinQuery !== undefined)
        priceDropdownMinQuery = priceDropdownMinQuery.replace("£","").replace(" ", "").replace(",", "")
    
    if (priceDropdownMaxQuery !== undefined)
        priceDropdownMaxQuery = priceDropdownMaxQuery.replace("£","").replace(" ", "").replace(",", "")

	// Build query string
	var query = "http://87.254.85.85:5000/?api=1";

    if (searchText != "")
        query += "&search=" + searchText;

    if (townDropdownQuery != "")
        query += "&town=" + townDropdownQuery;

	if (priceDropdownMinQuery != "")
		query += "&price_min=" + priceDropdownMinQuery;

	if (priceDropdownMaxQuery != undefined)
		query += "&price_max=" + priceDropdownMaxQuery;

    if (yearDropdownQuery != "")
    {
		query += "&acquisition_year=" + yearDropdownQuery;
		query += "&registered_year=" + yearDropdownQuery;
	}

	var request = new XMLHttpRequest()
	request.open('GET', 'http://127.0.0.1:5000/?search=' + searchText, true)
	request.onload = handleResult
    request.send()
}

function handleResult()
{
	var data = JSON.parse(this.response);
    
    // Check if error occured
    if (data == undefined || data[0].error !== undefined)
    {
        document.getElementById("errorText").innerHTML = "Error: " + data[0].error
        return
    }

    // If not, display the results

    // For each element in data
    // Add a new section in HTML
    // With the data from the element

}

function getDropdownQuery(id)
{
	let dropdown = document.getElementById(id)
	let dropdownText = dropdown.options[dropdown.selectedIndex].value
	var dropdownQuery = dropdownText.includes("N/A") ? "" : dropdownText

	return dropdownQuery
}
