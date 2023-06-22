import * as api from './apimodule';

let currentWeather = null;

function trimData(dataObj) {
  // return a new object with relevant information extracted from API data.
  const valuesToStore = [
    'name',
    'region',
    'country',
    'localtime',
    'temp_c',
    'temp_f',
    'is_day',
    'condition',
    'wind_mph',
    'wind_kph',
    'wind_dir',
    'humidity',
    'feelslike_c',
    'feelslike_f',
  ];
  const trimmedObj = {};
  Object.keys(dataObj).forEach((key) => {
    if (valuesToStore.includes(key)) trimmedObj[key] = dataObj[key];
  });

  return trimmedObj;
}

function formatLocation() {
  // returns a formatted location string with current_weather data
  return `${currentWeather.name}, ${currentWeather.country}`;
}

function formatCondition() {
  return currentWeather.condition.text;
}

function getDataMetric() {
  return {
    temp: `${Math.round(currentWeather.temp_c)} C°`,
    feelsLike: `${Math.round(currentWeather.feelslike_c)} C°`,
    windSpeed: `${Math.round(currentWeather.wind_kph)} km/h`,
    windDir: currentWeather.wind_dir,
  };
}

function getDataImperial() {
  return {
    temp: Math.round(currentWeather.temp_f),
    feelsLike: Math.round(currentWeather.feelslike_f),
    windSpeed: Math.round(currentWeather.wind_mph),
    windDir: currentWeather.wind_dir,
  };
}

function formatHumidity() {
  return `${currentWeather.humidity}%`;
}

function getFormattedForecast() {
  return {
    location: formatLocation(),
    condition: formatCondition(),
    humidity: formatHumidity(),
  };
}

// use an async function to work with the returned promises from the api
async function requestWeatherData(location) {
  // format user given string (although it may be better to do so in the DOM file)
  const weatherData = await api.getWeatherData(location);
  if (weatherData instanceof Error) {
    return new Error('Implement Error State');
  }
  console.log('implement success state');
  // create a flatten object recursive function to avoid hardcoding this
  const trimmed = trimData({ ...weatherData.location, ...weatherData.current });
  currentWeather = trimmed;
  return { ...getFormattedForecast(), ...getDataMetric() };
}

// seguir mañana con el DOM

export {
  getFormattedForecast,
  getDataImperial,
  getDataMetric,
  requestWeatherData,
};
