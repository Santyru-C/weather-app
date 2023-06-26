import * as app from './app';
import './style.css';

const cardContainer = document.querySelector('.card-container');
const locationForm = document.querySelector('.location-form');
const error = document.querySelector('.error');
const unitSwitchButton = document.querySelector('.unit-switch-button');

let currentUnits = 'metric';

function showError(message) {
  error.textContent = message;
  error.classList.remove('hidden');
}

function createWeatherCard(data) {
  // creates a card with the requested information to display
  const cardTemplate = `
        <div class="location">${data.location}</div>
        <div class="condition">${data.condition}</div>
        <div class="forecast-data">
            <div class="temperature-display">${data.temp}</div>
            <div class="additional-data-container">
                <div class="feelslike additional-data">
                    <div class="feelslike-text">FEELSLIKE:</div>
                    <div class="feelslike-display">${data.feelsLike}</div>
                </div>
                <div class="humidity additional-data">
                    <div class="humidity-text">HUMIDITY:</div>
                    <div class="humidity-display">${data.humidity}</div>
                </div>
                <div class="wind additional-data">
                    <div class="wind-text">WIND:</div>
                    <div class="wind-speed-display">${data.windSpeed}</div>
                    <div class="wind-dir-display">${data.windDir}</div>
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

async function handleRequest(location) {
  const data = await app.requestWeatherData(location, currentUnits);

  if (data instanceof Error) {
    showError(data.message);
  } else {
    error.classList.add('hidden');
    const weatherCard = createWeatherCard(data);
    postCard(weatherCard);
  }
}

function switchUnits() {
  currentUnits = (currentUnits === 'metric') ? 'imperial' : 'metric';
}

function updateUnitData() {
  const temperatureDisplay = document.querySelector('.temperature-display');
  const feelslikeDisplay = document.querySelector('.feelslike-display');
  const windSpeedDisplay = document.querySelector('.wind-speed-display');

  const newData = app.getFormattedData(currentUnits);

  temperatureDisplay.textContent = newData.temp;
  feelslikeDisplay.textContent = newData.feelsLike;
  windSpeedDisplay.textContent = newData.windSpeed;
}

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const locationInputData = document.getElementById('location-input-field').value;
  handleRequest(locationInputData);
});

unitSwitchButton.addEventListener('click', () => {
  switchUnits();
  console.log(currentUnits);
  console.log(updateUnitData());
});
handleRequest('buenos aires');
