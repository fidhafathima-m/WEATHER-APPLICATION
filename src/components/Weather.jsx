import axios from "axios";
import React, { useEffect, useState } from "react";
import "./weather.css";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const geocode = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      );
      if (!geocode.data.length) {
        alert("City not found");
      }
      const { lat, lon } = geocode.data[0];
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      );
      setWeatherData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (city) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const today = new Date();
  const currentDateTime = today.toLocaleString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
  return (
    <div className="container">
      <div className="weather-input">
        <h2 className="weather-date">{currentDateTime}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </div>
      {weatherData && (
        <div className="weather-container">
          {/* LEFT CARD */}
          <div className="weather-temperature">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h1>{weatherData.main.temp}°C</h1>
            <p className="weather-desc">{weatherData.weather[0].description}</p>
          </div>

          {/* RIGHT DETAILS GRID */}
          <div className="weather-details">
            <div className="card">
              <p>Feels Like</p>
              <h3>{weatherData.main.feels_like}°C</h3>
            </div>

            <div className="card">
              <p>Wind</p>
              <h3>{weatherData.wind.speed} m/s</h3>
            </div>

            <div className="card">
              <p>Humidity</p>
              <h3>{weatherData.main.humidity}%</h3>
            </div>

            <div className="card">
              <p>Rain</p>
              <h3>
                {weatherData.rain ? weatherData.rain["1h"] + " mm" : "N/A"}
              </h3>
            </div>

            <div className="card">
              <p>Sunrise</p>
              <h3>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </h3>
            </div>

            <div className="card">
              <p>Sunset</p>
              <h3>
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
