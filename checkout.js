document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const card = document.querySelector('.card');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        form.style.display = 'none';

        // Get form data
        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;

       
        const deliveryDate = calculateDeliveryDate();

        // Create and show thank you message with details
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = `
            <h2>Thank You, ${fullName}!</h2>
            <p>Your payment has been processed successfully.</p>
            <p><strong>Tracking ID:</strong> ${generateTrackingID()}</p>
            <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
            <p><strong>Company:</strong> Sankalpa Logistic Company</p>
        `;
        card.appendChild(thankYouMessage);
    });

    function generateTrackingID() {
        return 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    function calculateDeliveryDate() {
        const today = new Date();
        today.setDate(today.getDate() + 7);
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
});
