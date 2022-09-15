import {useState} from 'react';
import './App.css';

const App = () => {
const [query, setQery] = useState('');
const [weather,setWeather] = useState({});

const api = {
  key: "615318b63dd02193e58a90362b022158",
  base:"https://api.openweathermap.org/data/2.5/"}


const search = evt => {
  if(evt.key == "Enter"){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(result => {
      setWeather(result);
      setQery('');
      console.log(result)
    });
  }
}
  

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return`${day} ${date} ${month} ${year}`
}

  return (
    <div className={
      (typeof weather.main != "undefined") 
      ? ((weather.main.temp> 16) 
      ? 'app-warm' : 'app')  :'app'}>

      <main>
        <div className='search-box'>
          <input
            type="text"
            className='search-bar'
            placeholder='search...'
            onChange={e => setQery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name} , {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
              <div className='weather-box'>
                <div className='temp'>
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className={weather.weather[0].main}>
                  Sunny
                </div>
              </div>
          </div>

        ) : ('')}

      </main>
        
    </div>
  )
}

export default App;
