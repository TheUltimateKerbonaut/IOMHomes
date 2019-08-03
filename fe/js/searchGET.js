// ------- Handle HTTP GET on search page -------
function getParameterByName(name, url)
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function() {

    // Get inputs
    var searchText = getParameterByName("search");

    let townID = getParameterByName("town");
    let priceID = getParameterByName("price");
    let yearID = getParameterByName("year");
    
    // Apply inputs
    document.getElementById("searchbar").value = searchText;
    document.getElementById("townDropdown").selectedIndex = townID;
    document.getElementById("priceDropdown").selectedIndex = priceID;
    document.getElementById("yearDropdown").selectedIndex = yearID;

    if (searchText != undefined || townID != undefined || priceID != undefined || yearID != undefined)
        search();
});

document.getElementById("searchbar").onkeydown = function(e) {
    if (e.keyCode == 13)
        search();
};