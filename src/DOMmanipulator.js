import * as app from './app';

const cardContainer = document.querySelector('.card-container');
const currentUnits = 'metric';

function createWeatherCard(data) {
  // creates a card with the requested information to display
  const cardTemplate = `
        <div class="location">${data.location}</div>
        <div class="condition">${data.condition}</div>
        <div class="forecast-data">
            <div class="temperature">${data.temp}</div>
            <div class="additional-data">
                <div class="feelslike">
                    <div class="feelslike-text">FEELSLIKE:</div>
                    <div class="feelslike-data">${data.feelsLike}</div>
                </div>
                <div class="humidity">
                    <div class="humidity-text">HUMIDITY:</div>
                    <div class="humidity-data">${data.humidity}</div>
                </div>
                <div class="wind">
                    <div class="wind-text">WIND:</div>
                    <div class="wind-speed">${data.windSpeed}</div>
                    <div class="wind-dir">${data.windDir}</div>
                </div>
            </div>
        </div>
  `;

  const cardElement = document.createElement('div');
  cardElement.classList.add('weather-card');
  cardElement.innerHTML = cardTemplate;

  return cardElement;
}

async function requestData(location) {
  const data = await app.requestWeatherData(location);
  if (data instanceof Error) {
    cardContainer.textContent = data.message;
  } else {
    const weatherCard = createWeatherCard(data);
    cardContainer.appendChild(weatherCard);
  }
}

requestData('buenos aires');
