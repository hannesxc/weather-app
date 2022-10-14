import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=812e442d1ff683115a332c8ae0a04c89';

  const searchLoc = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLoc}
          placeholder='Enter a location'
          type="text"
        />
      </div>
      {data.name !== undefined &&
        <>
          <div className='container'>
            <div className='top'>
              <div className='location'>
                <h1>{data.name}</h1>
                ({data.main ? <p>{data.main.temp_max.toFixed()}°C -</p> : null}
                {data.main ? <p>{data.main.temp_min.toFixed()}°C</p> : null})
              </div>
              <div className='temp'>
                <p>{data.main ? data.main.temp.toFixed() : null}
                  °C</p>
              </div>
              <div className='outline'>
                <p>{data.weather ? data.weather[0].main : null}
                </p>
              </div>
            </div>
            <div className='bottom'>
              <div className='estimate'>
                {data.main ? data.main.feels_like.toFixed() : null}°C
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                {data.main ? data.main.humidity : null}%
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.wind ? data.wind.speed.toFixed() : null}MPH
                <p>Wind</p>
              </div>
            </div>
          </div>
          <div className="footer">
            <p>© Copyright Aditya Chakravorty</p>
          </div>
        </>
      }
    </div>
  );
}

export default App;
