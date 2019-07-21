function search()
{
    
    var request = new XMLHttpRequest()

    request.open('GET', 'http://87.254.85.85:5000?search=SearchGoesHere', true)

    request.onload = function() {
        // begin accessing JSON data here
        var data = JSON.parse(this.response)
        console.log(data)
    
    }   

request.send()


    // Get search value first, focus on rest later
    // Submit API request - the URL is http://87.254.85.85:5000?search=SearchGoesHere
    // Print resulting JSON to console
    // Watch out for errors!
    // Have fun :)

    // If status value !=200, print error
    // Edit HTML in Javascript




}