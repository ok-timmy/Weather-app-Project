import React, { useEffect, useState } from "react";

const LoadWeatherAPI = () => {
  const [city, setCity] = useState("");
  const [url, setUrl] = useState(
    "https://api.openweathermap.org/data/2.5/weather?q=nigeria&appid=e8790e30faf0712957356ed905f5b2b4"
  );
  const [weatherData, setWeatherData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [display, setDisplay] = useState("Loading...");
  const [icon, setIcon] = useState('')

  const KtoC = (K) => (K-273.15).toFixed(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=e8790e30faf0712957356ed905f5b2b4"
    );
    setCity("");
  };

  useEffect(() => {
    const fetchData = async () => {
      var response = await fetch(url);
      if (response.status >= 200 && response.status <= 299) {
        var respData = await response.json();
        console.log(respData);
        setWeatherData(respData);
        setHasLoaded(true);
        setIcon('https://openweathermap.org/img/wn/'+ respData.weather[0].icon + '@2x.png')
      } else if (response.status >= 400) {
        setHasLoaded(false);
        setDisplay("Location Not Found");
      }
    };
    fetchData();
  }, [url]);

  if (hasLoaded && weatherData) {
    return (
      <>
      <div className='form'>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="cityInput"
                value={city}
                onChange={(e) => {
                setCity(e.target.value);
                }}
                placeholder="Search For City"
                autoComplete="off"
            />
            <button>Search</button>
            </form>
        </div>
        <div className="main">
          <img src={icon} alt='icon' />
          <div>
            <p>Today</p>
            <h1>{weatherData.name}</h1>
            <p>Temperature: {KtoC(weatherData.main.temp)} °C</p>
            <p>{weatherData.weather[0].description}</p>
          </div>
        </div>

        <div className="others">
          <div>
            <h3>Wind Speed</h3>
            <p>
              {weatherData.wind.speed} ms<sup>-1</sup>
            </p>
          </div>
          <div>
            <h3>Humidity</h3>
            <p>
              {weatherData.main.humidity} gm<sup>-3</sup>
            </p>
          </div>
          <div>
            <h3>Country</h3>
            <p>{weatherData.sys.country}</p>
          </div>
          <div>
            <h3>Pressure</h3>
            <p>{weatherData.main.pressure} Pa</p>
          </div>
        </div>
        <footer> &copy; Timmy 2021</footer>
      </>
    );
  } else {
    return (
      <>
      <div className='form'>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={(e) => {
                setCity(e.target.value);
                }}
                placeholder="Search For City" autoComplete='off'
            />
            <button>Search</button>
            </form>
            <div>
            <h2>{display}</h2>
            </div>
        </div>
        <footer> &copy; Timmy 2021</footer>
      </>
    );
  }
};

export default LoadWeatherAPI;
