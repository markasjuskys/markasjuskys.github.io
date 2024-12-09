document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const loading = document.querySelector('.loading');
    const errorMessage = document.querySelector('.error-message');
    const sentMessage = document.querySelector('.sent-message');

    // Try to retrieve stored form data from localStorage
    const storedData = JSON.parse(localStorage.getItem('contactFormData')) || {};

    // Populate form fields with stored data if available
    document.getElementById('name-field').value = storedData.name || '';
    document.getElementById('email-field').value = storedData.email || '';
    document.getElementById('subject-field').value = storedData.subject || '';
    document.getElementById('message-field').value = storedData.message || '';

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent default form submission

        // Show loading indicator and hide messages
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';

        // Collect form data and store it in localStorage
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Convert form data to an object

        // Save the form data to localStorage
        localStorage.setItem('contactFormData', JSON.stringify(data));

        try {
            // Simulate sending data (without email service integration)
            const response = await sendEmail(data);

            if (response.status === 'success') {
                sentMessage.style.display = 'block'; // Show success message
            } else {
                errorMessage.style.display = 'block';
                errorMessage.textContent = response.message || 'An error occurred.';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Failed to send the message. Please try again.';
        } finally {
            loading.style.display = 'none'; // Hide loading indicator
        }
    });

    // Simulated send email function
    async function sendEmail(data) {
        // Simulate success response
        return { status: 'success', message: 'Message sent successfully' };
    }
});
