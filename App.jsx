
import React from 'react'
import { useState } from 'react'
import './App.css';


function App() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = "ff157f4eb5c3dd52dabc170928ae6f8e";

  const fetchWeather = async () => {
    if(!city){
      setError("please enter a city");
      return;
    }

  setLoading(true);
  setError('');
  setWeatherData(null);

  try 
  {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

  if(!response.ok){
      throw new Error("city not found")
  }

  const data = await response.json();
  setWeatherData(data);
  }

  catch (err) 
  {
      setError(err.message);
  }

      setLoading(false);

  }

  return (
    <>
        <div className='container'>
          <h1>Live Weather Forcast</h1>
          <input type="text" placeholder='entercity' value={city} onChange={(e) => setCity(e.target.value)}/><br /><br />{/* Salem */}
          <button onClick={fetchWeather}>Weather Data</button>
        
          {loading && <p>Loading Data...</p>}

          {error && <p>{error}</p>} 

          {
          weatherData && (
              <div className='weather-info'>
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon"/>
                <p>Temparature : {weatherData.main.temp} C</p>
                <p>Condition : {weatherData.weather[0].description}</p>
              </div>
            )
          }
        </div>
    </>
  )
};

export default App
