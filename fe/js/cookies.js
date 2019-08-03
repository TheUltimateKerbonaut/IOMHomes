$("body").ihavecookies({
	onAccept: function() {cookieAccept();}
});

function cookieAccept()
{
    $("body").setCookie("cookieConsent019283", true, 30);
}

$(document).ready(function() {
    if ($("body").getCookie("cookieConsent019283"))
    {
        alert("bob")
    }
});