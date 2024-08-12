document.getElementById('loadWeatherApp').addEventListener('click', function() {
    const iframe = document.getElementById('weatherAppFrame');
    iframe.src = "http://localhost:3000";  
    iframe.style.display = "block";
});

window.addEventListener('message', function(event) {


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

        document.getElementById('weatherSummary').style.display = 'block';
    }
});
