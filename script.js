const apiKey = 'cfa4b853ae6310ca5d849be7a70e17fe'; 
        const weatherInfoDiv = document.getElementById('weather-info');

        document.getElementById('search-btn').addEventListener('click', () => {
            const city = document.getElementById('city').value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        });

        async function fetchWeatherData(city) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();

                if (data.cod !== 200) {
                    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
                    return;
                }
                displayWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        function displayWeatherData(data) {
            const { main, weather } = data;
            const temperature = main.temp;
            const humidity = main.humidity;
            const description = weather[0].description;
            const icon = weather[0].icon;

            weatherInfoDiv.innerHTML = `
                <h2>${data.name}</h2>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Condition:</strong> ${description}</p>
            `;
        }