$(window).scroll(function() {
    scroll();
});

$(window).ready(function() {
    scroll();
});

function scroll()
{
    if ($(window).scrollTop() > 100)
    {
        $('#navbar').addClass('navbar-full');
        $('#navbar').removeClass('navbar-transparent');
        $('#navbar').addClass('fixed-top');
    }    
    else
    {
        $('#navbar').addClass('navbar-transparent');
        $('#navbar').removeClass('navbar-full');
        $('#navbar').removeClass('fixed-top');
    }
}