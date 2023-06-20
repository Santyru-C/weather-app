class WeatherInfo {
  constructor(dataObj) {
    Object.assign(this, dataObj);
  }

  get location() {
    return [this.name, this.region, this.country];
  }

  get locationTime() {
    return this.location_time;
  }

  get dataMetric() {
    return [this.temp_c, this.wind_kph, this.feelslike_c];
  }

  get dataImperial() {
    return [this.temp_f, this.wind_mph, this.feelslike_f];
  }

  get forecast() {
    return this.condition.text;
  }

  get isDay() {
    return Boolean(this.is_day);
  }

  get windDir() {
    return this.wind_dir;
  }
}

export default WeatherInfo;
