/* eslint-disable import/prefer-default-export */
export async function getWeatherData(locationStr) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b7038b51fd3e465595f200512232905&q=${locationStr}`, { mode: 'cors' });
    if (response.status === 400) throw new Error('Location Not Found');
    if (!response.ok) throw new Error('Response was NOT OK');
    const jsonData = await response.json();
    return jsonData;
    // add a function that handles the jsonData to avoid returning a promise
    // return jsonData;
  } catch (error) { return error; }
}
