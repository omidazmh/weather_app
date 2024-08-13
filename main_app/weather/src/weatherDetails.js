import React from 'react';

function WeatherDetails({ weatherData, isExpanded }) {
  return (
    <div>
      {isExpanded && (
        <div style={{fontSize:'12px',display:'flex',gap:'20px',justifyContent:'center',alignItems:'center'}}>
          <span style={{textAlign:'left'}}>
            <p>Feels Like: {weatherData.main.feels_like.toFixed(0)} °</p>
            <p>Wind Direction: {weatherData.wind.deg} °</p>
          </span>
          <span style={{textAlign:'left'}}>
            <p>Min Temp: {weatherData.main.temp_min.toFixed(0)} °</p>
            <p>Max Temp: {weatherData.main.temp_max.toFixed(0)} °</p>
          </span>
        </div>
      )}
    </div>
  );
}

export default WeatherDetails;

