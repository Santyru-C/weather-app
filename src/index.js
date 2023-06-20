import * as api from './apimodule';

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

// use an async function to work with the returned promises from the api
async function requestWeatherData() {
  // format user given string (although it may be better to do so in the DOM file)
  const weatherData = await api.getWeatherData('campana');
  if (weatherData instanceof Error) {
    console.log('implement error state for user', weatherData);
  } else {
    console.log('implement success state');
    // create a flatten object recursive function to avoid hardcoding this
    trimData({ ...weatherData.location, ...weatherData.current });
  }
}

requestWeatherData();

// trim data
// create a new object that inherits trimmed properties
// put getter methods
// return that object
