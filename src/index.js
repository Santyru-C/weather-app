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

function getLocation() {
  // returns a formatted location string with current_weather data
  return `${currentWeather.name}, ${currentWeather.country}`;
}

function getCondition() {
  return currentWeather.condition.text;
}

function getDataMetric() {
  return {
    temp: Math.round(currentWeather.temp_c),
    feelsLike: Math.round(currentWeather.feelslike_c),
    windVel: Math.round(currentWeather.wind_kph),
    windDir: currentWeather.wind_dir,
  };
}

function getDataImperial() {
  return {
    temp: Math.round(currentWeather.temp_f),
    feelsLike: Math.round(currentWeather.feelslike_f),
    windVel: Math.round(currentWeather.wind_mph),
    windDir: currentWeather.wind_dir,
  };
}

function getHumidity() {
  return `${currentWeather.humidity}%`;
}

function returnFormattedForecast() {
  return {
    location: getLocation(),
    condition: getCondition(),
    humidity: getHumidity(),
  };
}
// use an async function to work with the returned promises from the api
async function requestWeatherData() {
  // format user given string (although it may be better to do so in the DOM file)
  const weatherData = await api.getWeatherData('buenos aires');
  if (weatherData instanceof Error) {
    console.log('implement error state for user', weatherData);
  } else {
    console.log('implement success state');
    // create a flatten object recursive function to avoid hardcoding this
    const trimmed = trimData({ ...weatherData.location, ...weatherData.current });
    currentWeather = trimmed;
    console.log(returnFormattedForecast());
    console.log(getDataMetric());
  }
}

requestWeatherData();

// trim data
// create a new object that inherits trimmed properties
// put getter methods
// return that object
