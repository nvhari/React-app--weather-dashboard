import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const apiKey = "befd984de4d3c050671d4eb935e6c660";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather({
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
      });
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>Weather Dashboard</h1>
        <button onClick={handleToggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {loading && <div className="spinner">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weather && (
          <div className="weather-info">
            <h2>Weather in {city}</h2>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Weather: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.windSpeed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
