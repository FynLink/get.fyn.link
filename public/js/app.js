document.getElementById('targetUrlForm').addEventListener('htmx:afterRequest', function(event) {
    document.getElementById('targetUrlForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + ( 2 * (24 * 60 * 60 * 1000)));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    const formattedExpiryDateTime = expiryTime.toLocaleString('en-US', options);

    document.getElementById('expiry-time').textContent = `${formattedExpiryDateTime}`;
});

document.body.addEventListener('htmx:afterSwap', function(event) {
    if (event.detail.target.id === 'resultDiv') {
        const returnedUrl = window.location.protocol + '//' + event.detail.target.textContent.trim();
        const copyButton = document.getElementById('copyButton');

        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(returnedUrl).then(function() {
                Toastify({
                    text: "Short URL copied to clipboard",
                    duration: 3000,
                    gravity: "bottom",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();
            }).catch(function(err) {
                Toastify({
                    text: "Failed to copy short URL",
                    duration: 3000,
                    gravity: "bottom",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
                }).showToast();
            });
        });

        generateQRCode(128, returnedUrl);

        const options = {
            particleCount: 150,
            spread: 160,
            startVelocity: 30,
            decay: 0.95
        };

        const myConfetti = confetti.create(null, { resize: true });
        myConfetti(options);
    }
});

document.getElementById('qrcode').addEventListener('click', function() {
    const canvas = document.querySelector('canvas');
    const url = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = url;
    link.click();
});


function generateQRCode(size, text) {
    new QRCode(document.getElementById("qrcode"), {
        text: text,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').style.display = 'none';
}

function openMobileMenu() {
    document.getElementById('mobileMenu').style.display = 'block';
}