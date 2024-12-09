// Handle form submission
document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    // Get the location input
    const location = document.getElementById("location").value.trim();
    
    // If no location is provided, show an alert
    if (location === "") {
        alert("Please enter a location.");
        return;
    }

    // Generate a random temperature between -30 and 30
    const randomTemperature = Math.floor(Math.random() * 61) - 30;

    // Display the result
    document.getElementById("locationName").textContent = `Weather for: ${location}`;
    document.getElementById("temperature").textContent = `${randomTemperature} °C`;
    
    // Show the result div
    document.getElementById("result").style.display = "block";

    // Clear the input field
    document.getElementById("location").value = "";
});
