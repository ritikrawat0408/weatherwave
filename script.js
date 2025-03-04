"use strict";

const apiKey = "&appid=00fcf22e27df5c6e9d3822c97f8615fe";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchField = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.querySelector(".weather-info");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiURL}&q=${city}${apiKey}`);
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

        const weatherMap = {
            "Clouds": "clouds.png",
            "Mist": "mist.png",
            "Rain": "rain.png",
            "Drizzle": "drizzle.png",
            "Clear": "clear.png",
            "Snow": "snow.png",
            "Haze": "haze.png"
        };

        weatherIcon.src = weatherMap[data.weather[0].main] || "default.png";
        weatherInfo.style.display = "block";
        errorMessage.style.display = "none";

    } catch (error) {
        errorMessage.style.display = "block";
        weatherInfo.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchField.value.trim() !== "") {
        fetchWeather(searchField.value.trim());
    }
});

searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && searchField.value.trim() !== "") {
        fetchWeather(searchField.value.trim());
    }
});
