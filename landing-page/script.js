// Function to load the React app inside the iframe
document.getElementById('loadWeatherApp').addEventListener('click', function() {
    const iframe = document.getElementById('weatherAppFrame');
    iframe.src = "http://localhost:3000";  // آدرس محلی که اپلیکیشن React در آن اجرا می‌شود
    iframe.style.display = "block";
});

// Listen for messages from the iframe (React App)
window.addEventListener('message', function(event) {
    // For security reasons, it's good to check the origin of the message
    // if (event.origin !== 'http://expected-origin.com') return;

    const data = event.data;
    if (data.temperature && data.weather) {
        document.getElementById('location').textContent = `Location: ${data.location}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.temperature} °C`;
        document.getElementById('feelsLike').textContent = `Feels Like: ${data.feels_like} °C`;
        document.getElementById('tempMin').textContent = `Min Temp: ${data.temp_min} °C`;
        document.getElementById('tempMax').textContent = `Max Temp: ${data.temp_max} °C`;
        document.getElementById('pressure').textContent = `Pressure: ${data.pressure} hPa`;
        document.getElementById('humidity').textContent = `Humidity: ${data.humidity} %`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind_speed} m/s`;
        document.getElementById('windDirection').textContent = `Wind Direction: ${data.wind_deg} °`;
        document.getElementById('weatherStatus').textContent = `Weather: ${data.weather}`;
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        document.getElementById('clouds').textContent = `Clouds: ${data.clouds} %`;
        document.getElementById('lastUpdated').textContent = `Last updated: ${data.lastUpdated}`;

        // Display the weather summary section
        document.getElementById('weatherSummary').style.display = 'block';
    }
});
