const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const forecast = document.getElementById("forecast");
const errorMessage = document.getElementById("errorMessage");

async function getWeather(city) {

    try {
        errorMessage.textContent = "";
        weatherResult.innerHTML = "";
        forecast.innerHTML = "";

        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find city");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const location = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather data unavailable");
        }

        const weatherData = await weatherResponse.json();

        displayCurrentWeather(location, weatherData);
        displayForecast(weatherData);

    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function getWeatherDescription(code) {

    if (code === 0) return "Clear Sky";
    if (code === 1 || code === 2) return "Partly Cloudy";
    if (code === 3) return "Cloudy";
    if (code === 45 || code === 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95) return "Thunderstorm";

    return "Unknown";
}

function getWeatherIcon(code) {

    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";

    return "🌤️";
}

function displayCurrentWeather(location, data) {

    const current = data.current;

    weatherResult.innerHTML = `
        <div class="current-weather">
            <h2>${location.name}, ${location.country}</h2>

            <div class="temperature">
                ${Math.round(current.temperature_2m)}°C
            </div>

            <div style="font-size: 60px;">
                ${getWeatherIcon(current.weather_code)}
            </div>

            <p>${getWeatherDescription(current.weather_code)}</p>

            <p>Wind Speed: ${current.wind_speed_10m} km/h</p>
        </div>
    `;
}

function displayForecast(data) {

    forecast.innerHTML = "<h2 style='grid-column: 1 / -1;'>5-Day Forecast</h2>";

    for (let i = 0; i < 5; i++) {

        const date = new Date(data.daily.time[i]);

        const day = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        forecast.innerHTML += `
            <div class="forecast-card">

                <h3>${day}</h3>

                <div style="font-size: 40px;">
                    ${getWeatherIcon(data.daily.weather_code[i])}
                </div>

                <p>${getWeatherDescription(data.daily.weather_code[i])}</p>

                <p>
                    ${Math.round(data.daily.temperature_2m_max[i])}°C /
                    ${Math.round(data.daily.temperature_2m_min[i])}°C
                </p>

            </div>
        `;
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }
});