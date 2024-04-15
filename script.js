const apikey = "87180d405a5d1344817068b98a1032d0";
// const city = "kolkata";

async function fetchWeatherData(city) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
    const data = await response.json();
    console.log(data);
        updateWeatherUI(data);
    }
    catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const windElement = document.querySelector(".wind-speed")
const humidityElement = document.querySelector(".humidity")
const visibilityElement = document.querySelector(".visibility-distance")

const descriptionElement = document.querySelector(".description-text")

const dateElement = document.querySelector(".date");

const descriptionIcon = document.querySelector(".description i")


function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    windElement.textContent = `${data.wind.speed}km/h`;
    humidityElement.textContent = `${data.main.humidity}%`
    visibilityElement.textContent = `${data.visibility / 1000} km`;
    descriptionElement.textContent = data.weather[0].description;

    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = inputElement.value;
    if (city !== '') {
        fetchWeatherData(city);
        inputElement.value = '';
}
})

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud"
    };
    return iconMap[weatherCondition] || "help";
}