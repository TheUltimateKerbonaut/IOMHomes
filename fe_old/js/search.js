function search()
{

	// Get inputs
    var searchText = document.getElementById("bottomSearchbar").value

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

	$.ajax({
	  dataType: "json",
	  url: "https://housedata.im/api/",
	  data: query,
	  success: function (data)
	  {
		  handleResult(data);
	  }
	});
}

function handleResult(data)
{

    document.getElementById("resultsNumber").textContent = ""
    document.getElementById("results").innerHTML = ""
    
    document.getElementById("loadingText").innerHTML = ""
    
    // Check if error occured
    if (data == undefined || data[0].error !== undefined)
    {
        document.getElementById("errorText").innerHTML = data[0].error

        zenscroll.to(document.getElementById("results-container"))

        return
    }

    // If not, display the results, clearing the old ones first
    // For each element in data, add a new section in results

    document.getElementById("errorText").innerHTML = ""
    $('#results-container').fadeOut(1)

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    let dataSize = Object.size(data);
    document.getElementById("resultsNumber").textContent = "Found " + dataSize + " entries"

    document.getElementById("results").innerHTML = ""

    for (var i = 0; i < dataSize; i++)
        document.getElementById("results").innerHTML += getHTMLForEntry(data[i])

    $('.result-title').equalHeights();


    zenscroll.to(document.getElementById("results-container"))

    $('#results-container').fadeIn(1500, "linear");
    
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

    if (entry.postcode == "") entry.postcode = "N/A"
    if (entry.market_value == "") entry.market_value = "N/A"
    if (entry.consideration == "") entry.consideration = "N/A"
    if (entry.acquisition_date == "") entry.acquisition_date = "N/A"
    if (entry.registered_date == "") entry.registered_date = "N/A"
    if (entry.parish == "") entry.parish = "N/A"

    var html = '\
    <div class="col result result-width mt-5 text-center" style="width: 33.33%;">\
        <p class="lead result-title font-weight-normal">' + entry.address + '</p>\
        <p class="results-text">Acquisition date: ' + entry.acquisition_date + '</p>\
        <p class="results-text">Registered date: ' + entry.registered_date + '</p>\
        <p class="results-text">Consideration: ' + entry.consideration + '</p>\
        <p class="results-text">Market value: ' + entry.market_value + '</p>\
        <p class="results-text">Postcode: ' + entry.postcode + '</p>\
		<p class="results-text">Town: ' + entry.town + '</p>\
		<p class="results-text">Parish: ' + entry.parish + '</p>\
    </div>\
    '

    return html
}