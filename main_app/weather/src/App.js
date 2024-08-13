import React, { useEffect, useState } from 'react';
import humidityIcon from './assets/font-icon/humidity.svg';
import pressureIcon from './assets/font-icon/pressure.svg';
import windSpeedIcon from './assets/font-icon/wind_Speed.svg';
import WeatherDetails from './weatherDetails';

import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const API_KEY = '46428511b42374111be240111ec2f451';

  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data = response.data;

        const tempCelsius = data.main.temp - 273.15;
        const feelsLikeCelsius = data.main.feels_like - 273.15;
        const tempMinCelsius = data.main.temp_min - 273.15;
        const tempMaxCelsius = data.main.temp_max - 273.15;

        setWeatherData({
          ...data,
          main: {
            ...data.main,
            temp: tempCelsius,
            feels_like: feelsLikeCelsius,
            temp_min: tempMinCelsius,
            temp_max: tempMaxCelsius,
          }
        });

        // Send weather data to the parent page (Landing Page)
        if (window.parent) {
          window.parent.postMessage(
            {
              location: data.name,
              temperature: tempCelsius.toFixed(2),
              feels_like: feelsLikeCelsius.toFixed(2),
              temp_min: tempMinCelsius.toFixed(2),
              temp_max: tempMaxCelsius.toFixed(2),
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              wind_speed: data.wind.speed,
              wind_deg: data.wind.deg,
              weather: data.weather[0].description,
              icon: data.weather[0].icon,
              clouds: data.clouds.all,
              lastUpdated: new Date().toLocaleTimeString(),
            },
            '*'
          );
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setErrorMessage("Failed to fetch weather data.");
      }
    };

    // Get the user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error);
          setErrorMessage("Failed to get your location.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <div className='App-header'>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : weatherData ? (
          <div>
            <div className='main_info'>
              <div>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
              </div>
              <div>
                <p >{weatherData.name}</p>
                <p >{weatherData.main.temp.toFixed(0)} °</p>
                <p >{weatherData.weather[0].description} {weatherData.clouds.all} %</p>
              </div>
            </div>
            <div>
              <div className='HWP_info'>
                <div>
                  <span>
                    <img src={humidityIcon}  />
                  </span>
                  <p>Humidity</p>
                  <p>{weatherData.main.humidity} %</p>
                </div>
                <div>
                  <span>
                    <img src={windSpeedIcon}  />
                  </span>
                  <p>Wind Speed</p>
                  <p>{weatherData.wind.speed} m/s</p>
                </div>
                <div>
                  <span>
                    <img src={pressureIcon}  />
                  </span>
                  <p>Pressure</p>
                  <p>{weatherData.main.pressure} hPa</p>
                </div>
              </div>
              <div>
                <a onClick={toggleExpand} >
                {isExpanded ? (
                  <span style={{cursor:'pointer'}} class="material-symbols-outlined">keyboard_arrow_up</span>
                ) : (
                  <span style={{cursor:'pointer'}} class="material-symbols-outlined">keyboard_arrow_down</span>
                )}
                </a>
              </div>
            </div>
            <WeatherDetails weatherData={weatherData} isExpanded={isExpanded} />
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default App;








