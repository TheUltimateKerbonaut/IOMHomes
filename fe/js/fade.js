$('.nav-link-fade').click(function() {

    //event.preventDefault()

    newLocation = this.href

    $('.section').fadeOut(1000, function() { 

        if (newLocation.includes("about"))
            window.location = "search.html#search"
        else
            window.location = "index.html"

        //newPage()

    })


})

$('.nav-link-fade-search').click(function() {
    event.preventDefault()
    $('html, body').animate({
        scrollTop: $("#search").offset().top
    }, 1200);

})

function newPage() {
    
    window.location = newLocation

}