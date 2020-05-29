import { weatherFutureDayElementGanerator } from './weatherElements/futureWeatherElement';
import { weatherCurrentDayElementGanerator } from './weatherElements/todayWeatherElement';
import { dateTime } from './utils';

const weatherBlock = document.createElement('div');
weatherBlock.className = 'weather-block';
weatherBlock.innerHTML = `<div class="todays-weather">
<h3 id="location" class="todays-weather__location"></h3>
<p id="date" class="todays-weather__date">${dateTime()}</p>
<div id="today" class="todays-weather-forecast"></div>
</div>
<div id="future" class="future"></div>`;

function weatherElementsGenerator(data, lang, timeZone) {
  const currentWeather = data.daily.data.shift();
  document.getElementById('today').innerHTML += weatherCurrentDayElementGanerator(currentWeather, lang);
  const futureWeatherMas = data.daily.data.slice(0, 3);
  futureWeatherMas.forEach((day) => {
    document.getElementById('future').innerHTML += weatherFutureDayElementGanerator(day, lang, timeZone);
  });
}

async function getWeatherForecast(location, degrees, lang) {
  const { lng, lat } = location;
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://api.darksky.net/forecast/8357a7bf687bd5df195da394d75eb738/${lat},${lng}?lang=${lang}&units=${degrees}`;
  try {
    const response = await fetch(proxyUrl + targetUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

export { weatherElementsGenerator, getWeatherForecast, weatherBlock };
