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
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-145086170-1');
    }
});