window.addEventListener('load', function() {
    new QRCode(document.getElementById("qrCode"), {
        text: location.href,
        width: 96,
        height: 96,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
});