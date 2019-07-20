function search()
{
    // Get search value first, focus on rest later
    // Submit API request - the URL is http://87.254.85.85:5000?search=SearchGoesHere
    // Print resulting JSON to console
    // Watch out for errors!
    // Have fun :)

    var request = new XMLHttpRequest()

    request.open('GET', 'http://87.254.85.85:5000/?search=IM2 3AU', true)
    request.onload = handleResult
    request.send();
    
}

function handleResult()
{
    var data = JSON.parse(this.response)
    console.log(data)
}