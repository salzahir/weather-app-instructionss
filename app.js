// This gets our weather data from the API and displays it on the page
// Similar to how a waiter would fetch your food and bring it to you

async function fetchWeather(location) {
    try {
        const API_KEY = "YOUR_KEY_HERE"; 
        const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
        const response = await fetch(link);
        const data = await response.json();
        console.log(data);
        return data;
    } catch {
        return { error: "City not found" };
    }
}

let searchInput = document.querySelector(".search-bar");
let searchButton = document.getElementById("search");

searchButton.addEventListener("click", async () => {
    const location = searchInput.value;
    
    if (!location) {
        alert("Please enter a location");
        return;
    }

    const data = await fetchWeather(location);
    displayWeatherData(data)
});


function displayWeatherData(data) {
    const weatherInfo = document.querySelector(".weather-info");
    weatherInfo.innerHTML = ""; // Clear any previous data

    if (data.error) {
        const error = document.createElement("p");
        error.textContent = data.error;
        weatherInfo.appendChild(error);
        return;
    }

    // Display temperature
    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${data.days[0].temp}°`;
    weatherInfo.appendChild(temperature);

    // Display alerts if any
    const alerts = document.createElement("p");
    if (Array.isArray(data.alerts) && data.alerts.length > 0) {
        alerts.textContent = `Alert: ${data.alerts[0].event} - ${data.alerts[0].description}`;
    } else {
        alerts.textContent = "No weather alerts";
    }
    weatherInfo.appendChild(alerts);
}
