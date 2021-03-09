import { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

function App() {
  const [ city, setCity ] = useState('');
  const [ weather, setWeather ] = useState({});

  const search = async (e) => {
    if(e.key === 'Enter'){
      const data = await fetchWeather(city);

      console.log(data);
      setWeather(data);
      setCity('');
    }
  };

  return (
    <div className="main-container">
      <input 
        type="text" 
        className="search" 
        placeholder="Search..." 
        value={city} 
        onChange={e => setCity(e.target.value)}
        onKeyPress={search}
      />

      {weather.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{weather.name}</span> 
            <sup>{weather.sys.country}</sup> {/* <sup> - 'Super Script' tag - This makes the text inside it on top of the actual text */}
          </h2>
          <div className='city-temp'>
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup> {/* A 'Degree' sign */}
          </div>
          <div className='info'>
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
