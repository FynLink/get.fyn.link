// Add an event listener to hide the form after submission
document.getElementById('targetUrlForm').addEventListener('htmx:afterRequest', function(event) {
    // Hide the current form after the request is complete
    document.getElementById('targetUrlForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + (24 * 60 * 60 * 1000));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    const formattedExpiryDateTime = expiryTime.toLocaleString('en-US', options);

    document.getElementById('expiry-time').textContent = `${formattedExpiryDateTime}`;
});

document.body.addEventListener('htmx:afterSwap', function(event) {
    if (event.detail.target.id === 'resultDiv') {
        const returnedUrl = window.location.protocol + '//' + event.detail.target.textContent.trim();
        const qrCodeDiv = document.getElementById('qrcode');
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

        new QRCode(qrCodeDiv, {
            text: returnedUrl,
            width: 112,
            height: 112
        });

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

function resetForm() {
    document.getElementById('targetUrlForm').style.display = 'block';
    document.getElementById('targetUrl').value = '';
    document.getElementById('resultContainer').style.display = 'none';
}