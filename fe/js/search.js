function search()
{

	// Get inputs
    var searchText = document.getElementById("searchbar").value

	let townDropdownQuery = getDropdownQuery("townDropdown")
	let priceDropdownMinQuery = getDropdownQuery("priceDropdown").split("-")[0]
	let priceDropdownMaxQuery = getDropdownQuery("priceDropdown").split("-")[1]
	let yearDropdownQuery = getDropdownQuery("yearDropdown")

    // Bit of formatting here and there
    if (searchText !== undefined)
        searchText = searchText.replace(" ", "%20")

    if (priceDropdownMinQuery !== undefined)
        priceDropdownMinQuery = priceDropdownMinQuery.replace("£","").replace(" ", "").replace(",", "")
    
    if (priceDropdownMaxQuery !== undefined)
        priceDropdownMaxQuery = priceDropdownMaxQuery.replace("£","").replace(" ", "").replace(",", "")

	// Build query string
	var query = "?api=1"

    if (searchText != "")
        query += "&search=" + searchText

    if (townDropdownQuery != "")
        query += "&town=" + townDropdownQuery

	if (priceDropdownMinQuery != "")
		query += "&price_min=" + priceDropdownMinQuery

	if (priceDropdownMaxQuery != undefined)
		query += "&price_max=" + priceDropdownMaxQuery

    if (yearDropdownQuery != "")
    {
		query += "&year=" + yearDropdownQuery
	}

    document.getElementById("errorText").innerHTML = ""
    document.getElementById("loadingText").innerHTML = "Loading..."

	var request = new XMLHttpRequest()
	request.open('GET', 'https://housedata.im/api/' + query, true)
	request.onload = handleResult
    request.send()
}

function handleResult()
{

    document.getElementById("resultsNumber").textContent = ""
    document.getElementById("results-js").innerHTML = ""

	var data = JSON.parse(this.response)
    
    document.getElementById("loadingText").innerHTML = ""
    
    // Check if error occured
    if (data == undefined || data[0].error !== undefined)
    {
        document.getElementById("errorText").innerHTML = data[0].error

        return
    }

    // If not, display the results, clearing the old ones first
    // For each element in data, add a new section in results

    document.getElementById("errorText").innerHTML = ""
    $('#results').fadeOut(1)

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    let dataSize = Object.size(data);
    document.getElementById("resultsNumber").textContent = "Found " + dataSize + " entries"

    document.getElementById("results-js").innerHTML = ""

    for (var i = 0; i < dataSize; i++)
        document.getElementById("results-js").innerHTML += getHTMLForEntry(data[i])

    $('#results').fadeIn(1500, "linear");
    
}

function getDropdownQuery(id)
{
	let dropdown = document.getElementById(id)
	let dropdownText = dropdown.options[dropdown.selectedIndex].value
	var dropdownQuery = dropdownText.includes("N/A") ? "" : dropdownText

	return dropdownQuery
}

function getHTMLForEntry(entry)
{

    if (entry.postcode == "" || entry.postcode == undefined) entry.postcode = "N/A"
    if (entry.market_value == "" || entry.market_value == undefined) entry.market_value = "N/A"
    if (entry.consideration == "" || entry.consideration == undefined) entry.consideration = "N/A"
    if (entry.acquisition_date == "" || entry.acquisition_date == undefined) entry.acquisition_date = "N/A"
    if (entry.registered_date == "" || entry.registered_date == undefined) entry.registered_date = "N/A"
    if (entry.parish == "" || entry.parish == undefined) entry.parish = "N/A"

    var html = '\
        <div class="card">\
\
            <h4 class="card-img-top text-left text-center">' + entry.address + '</h4>\
\
            <div class="card-body text-center">\
\
                <p class="results-text">Acquisition date: ' + entry.acquisition_date + '</p>\
                <p class="results-text">Registered date: ' + entry.registered_date + '</p>\
                <p class="results-text">Consideration: ' + entry.consideration + '</p>\
                <p class="results-text">Market value: ' + entry.market_value + '</p>\
                <p class="results-text">Postcode: ' + entry.postcode + '</p>\
                <p class="results-text">Town: ' + entry.town + '</p>\
                <p class="results-text">Parish: ' + entry.parish + '</p>\
\
            </div>\
\
\
        </div>\
    '

    return html
}

// ------- Handle HTTP GET on index page  -------
function searchNow()
{   
    // Get inputs
    var searchText = document.getElementById("searchbar").value

	let townDropdown = document.getElementById("townDropdown")
	let townDropdownID = townDropdown.selectedIndex
    
    let priceDropdown = document.getElementById("priceDropdown")
	let priceDropdownID = priceDropdown.selectedIndex

	let yearDropdown = document.getElementById("yearDropdown")
	let yearDropdownID = yearDropdown.selectedIndex

    // Bit of formatting here and there
    if (searchText !== undefined)
        searchText = searchText.replace(" ", "%20")

	// Build query string
	var query = "?index=1"

    if (searchText != "")
        query += "&search=" + searchText

    if (townDropdownID != undefined)
        query += "&town=" + townDropdownID

	if (priceDropdownID != undefined)
		query += "&price=" + priceDropdownID

    if (yearDropdownID != undefined)
        query += "&year=" + yearDropdownID
        
    if (query != "?index=1&town=0&price=0&year=0")
        window.location = "search.html" + query;
    else
        window.location = "search.html";
}