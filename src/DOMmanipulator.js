import * as app from './app';
import './style.css';

const cardContainer = document.querySelector('.card-container');
const currentUnits = 'metric';
const locationForm = document.querySelector('.location-form');

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

function postCard(weatherCard) {
  const cardsDisplayed = cardContainer.querySelectorAll('.weather-card');
  if (cardsDisplayed.length) {
    Array.from(cardsDisplayed).forEach((card) => card.remove());
  }

  cardContainer.appendChild(weatherCard);
}

locationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const locationInputData = document.getElementById('location-input-field').value;
  const data = await app.requestWeatherData(locationInputData);

  console.log(data);
  if (data instanceof Error) {
    cardContainer.textContent = data.message;
  } else {
    const weatherCard = createWeatherCard(data);
    postCard(weatherCard);
  }
});
