document.getElementById('loadWeatherApp').addEventListener('click', function() {
    const iframe = document.getElementById('weatherAppFrame');
    iframe.src = "http://localhost:3000";  
    iframe.style.display = "block";
});

window.addEventListener('message', function(event) {


    const data = event.data;
    if (data.temperature && data.weather) {
        document.getElementById('location').textContent = `Location: ${data.location}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.temperature} °`;
        document.getElementById('feelsLike').textContent = `Feels Like: ${data.feels_like} °`;
        document.getElementById('tempMin').textContent = `Min Temp: ${data.temp_min} °`;
        document.getElementById('tempMax').textContent = `Max Temp: ${data.temp_max} °`;
        document.getElementById('pressure').textContent = `Pressure: ${data.pressure} hPa`;
        document.getElementById('humidity').textContent = `Humidity: ${data.humidity} %`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind_speed} m/s`;
        document.getElementById('windDirection').textContent = `Wind Direction: ${data.wind_deg} °`;
        document.getElementById('weatherStatus').textContent = `Weather: ${data.weather}`;
        document.getElementById('clouds').textContent = `Clouds: ${data.clouds} %`;
        document.getElementById('lastUpdated').textContent = `Last updated: ${data.lastUpdated}`;

        document.getElementById('weatherSummary').style.display = 'block';
    }
});
