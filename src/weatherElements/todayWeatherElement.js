const translations = {
  ru: {
    feelsLike: 'Ощущается как: ',
    wind: 'Ветер: ',
    humidity: 'Влажность: ',
  },
  en: {
    feelsLike: 'Feels like: ',
    wind: 'Wind: ',
    humidity: 'Humidity: ',
  },
  be: {
    feelsLike: 'Aдчуваецца як: ',
    wind: 'Вецер: ',
    humidity: 'Вільготнасць: ',
  },
};

function weatherCurrentDayElementGanerator(day, lang) {
  const temperature = Math.floor((day.temperatureHigh + day.temperatureLow) / 2);
  const apparentTemperature = Math.floor((day.apparentTemperatureHigh + day.apparentTemperatureLow) / 2);
  const humidity = day.humidity * 100;
  const CurrentDayWeather = `<h2 class="todays-weather-forecast__degrees">${temperature}</h2>
        <div class="todays-weather-forecast__degrees-circle"></div>
        <div class="todays-weather-forecast-info">
            <img  class="todays-weather-forecast-info__img" src="assets/${day.icon}.png" alt="">
            <p class="todays-weather-forecast-info__text">${day.summary}<br>${translations[lang].feelsLike + apparentTemperature}°<br>${translations[lang].wind + day.windSpeed} m/s<br>${translations[lang].humidity + humidity}%</p>
        </div>`;
  return CurrentDayWeather;
}

export { weatherCurrentDayElementGanerator };
