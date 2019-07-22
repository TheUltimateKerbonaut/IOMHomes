$('.nav-link-fade').click(function() {

    //event.preventDefault()

    newLocation = this.href

    window.scroll({
        top: document.getElementById("about"),
        left: 0,
        behavior: 'smooth'
    })
    

    $('.section').fadeOut(1000, function() { 

        if (newLocation.includes("about"))
            window.location = "search.html#search"
        else
            window.location = "index.html"

        //newPage()

    })


})

function newPage() {
    
    window.location = newLocation

}