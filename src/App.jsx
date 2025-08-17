import { React, useEffect, useRef, useState } from 'react';
import searchIcon from './assets/searchIcon.svg';
import clearDay from './assets/weather-icons/clear-day.svg';
import clearNight from './assets/weather-icons/clear-night.svg';
import cloudy from './assets/weather-icons/cloudy.svg';
import drizzle from './assets/weather-icons/drizzle.svg';
import fog from './assets/weather-icons/fog.svg';
import hurricane from './assets/weather-icons/hurricane.svg';
import partlyCloudDay from './assets/weather-icons/partly-cloudy-day.svg';
import partlyCloudNight from './assets/weather-icons/partly-cloudy-night.svg';
import rain from './assets/weather-icons/rain.svg';
import snow from './assets/weather-icons/snow.svg';
import thunderstorms from './assets/weather-icons/thunderstorms.svg';
import wind from './assets/weather-icons/wind.svg';
import notAvailable from './assets/weather-icons/not-available.svg';

const App = () => {

  const searchRef = useRef();

  const [weather, setWeather] = useState(null);

  const getWeather = async (city) => {

    try {
      if (!city || city.trim() === "") {
        alert("Searching for air, huh?");
        return;
      }

      const encodedCity = encodeURIComponent(city.trim());

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      const icon = icons[data.weather[0].icon] || notAvailable;

      setWeather({
        
        location: data.name,
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        desc: data.weather[0].description,
        icon: icon

      });
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      alert("Failed to fetch weather, Try Again...");
    }
  };

  const icons = {
    "01d": clearDay,
    "01n": clearNight,
    "02n": partlyCloudNight,
    "02d": partlyCloudDay,
    "03d": partlyCloudDay,
    "03n": partlyCloudNight,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorms,
    "11n": thunderstorms,
    "13d": snow,
    "13n": snow,
    "50d": fog,
    "50n": fog
  };

  const toTitleCase = (str) => {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <>
      <h1 className='title'>void - Weather App</h1>
      <div className='container'>
        <div className='search'>
          <input ref={searchRef} 
          onKeyDown={(e)=>{
            if(e.key === "Enter") {
              getWeather(searchRef.current.value);
            }
          }}
          type="text" placeholder='Search ' />
          <button type='button' onClick={() => getWeather(searchRef.current.value)} className='search-button'><img className='searchIcon' src={searchIcon} alt="" /></button>
        </div>

        {weather ? (
          <>
            <div className='weather'>
              <img src={weather.icon} alt="" />
              <h1 className='temp'>{Math.floor(weather.temperature)}°</h1>
              <h2 className='location'>{weather.location}</h2>
              <p className='condition'>{toTitleCase(weather.desc)}</p>
            </div>

            <div className="other-info">
              <div className='humidity'>
                <h2>{weather.humidity}%</h2>
                <p>Humidity</p>
              </div>

              <div className='wind'>
                <h2>{weather.windSpeed}</h2>
                <p>M/s</p>
              </div>

              <div className='feels-like'>
                <h2>{Math.floor(weather.feelsLike)}°</h2>
                <p>Feels Like</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
};

export default App