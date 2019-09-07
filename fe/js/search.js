function numberWithCommas(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

var data = {}

function handleResult()
{

    document.getElementById("resultsNumber").textContent = ""
    document.getElementById("results-js").innerHTML = ""

	data = JSON.parse(this.response)

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

    document.getElementById("resultsNumber").textContent = "Found " + data.length + " entries"

    document.getElementById("results-js").innerHTML = ""

    // Display data
    for (var i = 0; i < data.length; i++)
        document.getElementById("results-js").innerHTML += getHTMLForEntry(data[i][0], i)

    $('.card-img-top').equalHeights();

    /*
    // Colour presets
    let colours = [
        "#2ed06e",
        "#007bff",
        "red",
        "pink"
    ]
    // Get all cards
    for(var i = 0; i < document.getElementsByClassName("card").length-1; i++)
    {
        // Get card
        let card = document.getElementsByClassName("card")[i]
        // Get aquisition date
        let year = card.children[1].children[0].innerHTML.substr(card.children[1].children[0].innerHTML.length-4)
        // Set colour
        console.log(colours[year %= colours.length])
        year %= colours.length
        
        card.children[0].style.backgroundColor = colours[year]
    }
    */

    document.getElementById("footer-block").style.position = "absoloute";
    $('#results').fadeIn(1500, "linear");
    zenscroll.to(document.getElementById("results"))
    
}

function getDropdownQuery(id)
{
	let dropdown = document.getElementById(id)
	let dropdownText = dropdown.options[dropdown.selectedIndex].value
	var dropdownQuery = dropdownText.includes("N/A") ? "" : dropdownText

	return dropdownQuery
}

function getHTMLForEntry(entry, masterID)
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
                <span class="results-text">Acquisition date: ' + entry.acquisition_date + '</span><br/>\
                <span class="results-text">Registered date: ' + entry.registered_date + '</span><br/>\
                <span class="results-text">Consideration: £' + numberWithCommas(entry.consideration) + '</span><br/>\
                <span class="results-text">Market value: £' + numberWithCommas(entry.market_value) + '</span><br/>\
                <span class="results-text">Postcode: ' + entry.postcode + '</span><br/>\
                <span class="results-text">Town: ' + entry.town + '</span><br/>\
                <span class="results-text">Parish: ' + entry.parish + '</span><br/>' + ((data[masterID].length == 1) ? "<br/>" : "")+ '\
\
                ' + ((data[masterID].length > 1) ? '<button class="mt-2 card-button btn btn-primary" onClick="displayModal(' + masterID + ');">View history</button>' : "") + '</div>\
\
            </div>\
\
\
        </div>\
    '

    return html
}

function setHTMLForModal(masterID)
{
    document.getElementById("modal-address").innerHTML = data[masterID][0].address;
    document.getElementById("modal-number").innerHTML = "Sold " + data[masterID].length + " times";

    document.getElementById("modal-list").innerHTML = "";
    for (var i = 0; i < data[masterID].length; i++)
    {
        let entryString = '\
        <div class="modal-item">\
			<p>\
				Acquisition date: ' + data[masterID][i].acquisition_date + '<br />\
				Registered date: ' + data[masterID][i].registered_date + '<br />\
				Consideration: £' + numberWithCommas(data[masterID][i].consideration) + '<br />\
				Market value: £' + numberWithCommas(data[masterID][i].market_value) + '<br />\
				Postcode: ' + data[masterID][i].postcode + '<br />\
				Town: ' + data[masterID][i].town + '<br />\
				Parish: ' + data[masterID][i].parish + '\
			</p>\
        </div>\
        ';

        document.getElementById("modal-list").innerHTML += entryString;
    }

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

// Modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function displayModal(masterID)
{
    modal.style.display = "block";
    setHTMLForModal(masterID);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};