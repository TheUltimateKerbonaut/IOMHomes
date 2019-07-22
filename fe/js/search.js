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

	var request = new XMLHttpRequest()
	request.open('GET', 'http://127.0.0.1:5000/' + query, true)
	request.onload = handleResult
    request.send()
}

function handleResult()
{

    document.getElementById("resultsNumber").textContent = ""
    document.getElementById("results").innerHTML = ""

	var data = JSON.parse(this.response)
    
    document.getElementById("loadingText").innerHTML = ""
    
    // Check if error occured
    if (data == undefined || data[0].error !== undefined)
    {
        document.getElementById("errorText").innerHTML = "Error: " + data[0].error
        $('html, body').animate({
            scrollTop: $("#resultsDIV").offset().top
        }, 1200);
        return
    }

    // If not, display the results, clearing the old ones first
    // For each element in data, add a new section in results

    document.getElementById("errorText").innerHTML = ""
    $('#resultsDIV').fadeOut(1)

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

    $('display-5').equalHeights();

        $('#resultsDIV').fadeIn(1500, "linear");

    $('html, body').animate({
        scrollTop: $("#resultsDIV").offset().top
    }, 1200);

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
    console.log(entry)

    if (entry.postcode == "") entry.postcode = "N/A"
    if (entry.market_value == "") entry.market_value = "N/A"
    if (entry.consideration == "") entry.consideration = "N/A"
    if (entry.acquisition_date == "") entry.acquisition_date = "N/A"
    if (entry.registered_date == "") entry.registered_date = "N/A"
    if (entry.parish == "") entry.parish = "N/A"

    var html = '\
    <div class="col result mt-5 text-center result-seperator-vertical">\
        <p class="display-5">' + entry.address + '</p>\
        <p class="results-text mt-4">Town: ' + entry.town + '</p><br/>\
        <p class="results-text">Postcode: ' + entry.postcode + '</p><br/>\
        <p class="results-text">Market value: ' + entry.market_value + '</p><br/>\
        <p class="results-text">Consideration: ' + entry.consideration + '</p><br/>\
        <p class="results-text">Acquisition date: ' + entry.acquisition_date + '</p><br/>\
        <p class="results-text">Registered date: ' + entry.registered_date + '</p><br/>\
        <p class="results-text">Parish: ' + entry.parish + '</p><br/>\
\
    </div>\
    <div class="result-seperator"></div>\
    '

    return html
}

function topSearchbarSearch()
{
    if (document.getElementById("topSearchbar").value != undefined && document.getElementById("topSearchbar").value != "")
    {
        document.getElementById("bottomSearchbar").value = document.getElementById("topSearchbar").value
        search()
    }
}

function topSearchbarIndex()
{
    if (document.getElementById("topSearchbar").value != undefined && document.getElementById("topSearchbar").value != "")
    {
        window.location = "index.html#stats"
        $('.section').fadeOut(1000, function() {     
            window.location = "search.html?search=" + document.getElementById("topSearchbar").value
        })
    }
}

function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }
  

$( document ).ready(function() {
    
    let query_string = window.location.search.substring(1)
    let result = parse_query_string(query_string)

    if (result.search != undefined && window.location.href.includes("search"))
    {
        document.getElementById("topSearchbar").value = result.search
        document.getElementById("bottomSearchbar").value = result.search
        $('html, body').animate({
            scrollTop: $("#search").offset().top
        }, 1200);
        setTimeout(function() {search()}, 1000)
        //search()
    }

});