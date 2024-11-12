const apiKey = '6f037cfe46f523556ccc86c721aefbb3'; // Replace with your OpenWeatherMap API key

// Function to get weather by city name
function getWeatherByCity() {
    const city = document.getElementById('locationInput').value;
    if (city) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    } else {
        alert('Please enter a city name.');
    }
}

// Function to get weather by user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to fetch weather data and display it
function fetchWeatherData(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            setBackground(data);
        })
        .catch(error => alert('Error fetching weather data.'));
}

// Function to display weather information
function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        const { name, main, weather } = data;
        weatherInfoDiv.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfoDiv.innerHTML = `<p>City not found. Please try again.</p>`;
    }
}

// Function to set background based on time of day
function setBackground(data) {
    const currentHour = new Date().getHours(); // Get current hour in user's local time
    const body = document.body;

    // Clear existing elements if any
    const existingMoon = document.querySelector('.moon');
    const existingStars = document.querySelector('.stars');
    const existingSun = document.querySelector('.sun');
    const existingClouds = document.querySelector('.cloud');

    if (existingMoon) existingMoon.remove();
    if (existingStars) existingStars.remove();
    if (existingSun) existingSun.remove();
    if (existingClouds) existingClouds.remove();

    // Assuming daytime is from 6 AM to 6 PM
    if (currentHour >= 6 && currentHour < 18) {
        body.classList.remove('nighttime');
        body.classList.add('daytime');

        // Create sun and cloud elements
        ;

        const cloudDiv = document.createElement('div');
        cloudDiv.classList.add('cloud'); // Cover full screen with cloud image

        // Append sun and clouds to the body
        body.appendChild(cloudDiv);
        body.appendChild(sunImg);
    } else {
        body.classList.remove('daytime');
        body.classList.add('nighttime');

        // Create stars and moon elements
        const starsDiv = document.createElement('div');
        starsDiv.classList.add('stars');

        

        // Append stars and moon to the body
        body.appendChild(starsDiv);
        body.appendChild(moonImg);
    }
}








