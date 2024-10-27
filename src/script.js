let form = document.querySelector("#search-form");
let cityInput = document.querySelector("#city-input");
let cityDisplay = document.querySelector("#city-name");
let dateTimeDisplay = document.querySelector("#date-time");
let weatherDescription = document.querySelector("#weather-description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let temperatureElement = document.querySelector("#temperature");
let weatherEmoji = document.querySelector("#weather-emoji");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${days[date.getDay()]} ${hours}:${minutes}`;
}

function updateDateTime() {
  let now = new Date();
  dateTimeDisplay.innerHTML = formatDate(now);
}

function getWeatherEmoji(description, temp) {
  if (description.includes("clear")) {
    return temp > 25 ? "☀️" : "🌞";
  } else if (description.includes("cloud")) {
    return temp < 10 ? "☁️❄️" : "☁️";
  } else if (description.includes("rain")) {
    return temp < 5 ? "🌨️" : "🌧️";
  } else if (description.includes("snow")) {
    return "❄️";
  } else if (description.includes("storm")) {
    return "⛈️";
  } else if (description.includes("mist") || description.includes("fog")) {
    return "🌫️";
  } else {
    return "🌥️";
  }
}

function refreshWeather(response) {
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;

  cityDisplay.innerHTML = city;
  temperatureElement.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${windSpeed} m/s`;
  weatherDescription.innerHTML = description;
  weatherEmoji.innerHTML = getWeatherEmoji(
    description.toLowerCase(),
    temperature
  );
}

function getForecast(city) {
  let apiKey = "5af0c133bfa709dct64aabc68f1ao404";
            let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
            console.log("Fetching forecast from:", apiUrl);
            
            axios.get(apiUrl).then(displayForecast);
        }

        
        function displayForecast(response) {
            console.log("Forecast Data:", response.data);
            
            let forecastHtml = "";
            
            // Process only first 5 days
            response.data.daily.slice(0, 5).forEach(day => {
                let maxTemp = Math.round(day.temperature.maximum);
                let minTemp = Math.round(day.temperature.minimum);
                let description = day.condition.description.toLowerCase();
                
                forecastHtml += `
                    <div class="forecast-day">
                        <div class="forecast-day-name">
                            ${formatDay(day.time)}
                        </div>
                        <div class="forecast-emoji">
                            ${getWeatherEmoji(description, maxTemp)}
                        </div>
                        <div class="forecast-temp">
                            <strong>${maxTemp}°</strong> / ${minTemp}°
                        </div>
                    </div>
                `;
            });
            
            forecastElement.innerHTML = forecastHtml;
        }

        
        function searchCity(city) {
            console.log("Searching for city:", city);
            
            let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
            
            
            axios.get(weatherUrl)
                .then(displayWeather)
                .catch(error => {
                    console.error("Error fetching weather:", error);
                    alert("City not found. Please try again.");
                });
                
            getForecast(city);
        }

        
        function handleSearch(event) {
            event.preventDefault();
            let city = cityInput.value.trim();
            
            if (city) {
                searchCity(city);
                cityInput.value = "";
            }
        }

        
        form.addEventListener("submit", handleSearch);

        
        updateDateTime();
        setInterval(updateDateTime, 60000); 
        searchCity("Paris"); 

function searchCity(city) {
  let apiKey = "5af0c133bfa709dct64aabc68f1ao404";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = cityInput.value.trim();
  if (city) {
    searchCity(city);
    cityInput.value = "";
  }
}

form.addEventListener("submit", handleSearch);
updateDateTime();
setInterval(updateDateTime, 60000); 
searchCity("Paris");
