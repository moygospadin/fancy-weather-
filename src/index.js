import { weatherElementsGenerator, getWeatherForecast, weatherBlock } from './weatherBlock';
import { controlBlockCreater, translations } from './controlBlock';
import { dateTime, clean, setBackgroundImg, updateBg, recordVoice } from './utils';
import { mapBlock, CurrentUserLocation, setMap, getСityСoordinates, cityList, cityListCreater } from './geolocationBlock';
import './styles/style.css';

let timeZone;
let lang = (localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'en';
let degrees = (localStorage.getItem('degrees')) ? localStorage.getItem('degrees') : 'si';
let cityName;
let cityCoordinates;
let cityNumber = 0;
let weather;

function updateWeatherForecast(location) {
    clean();
    getWeatherForecast(location, degrees, lang)
        .then((weatherForecast) => {
            timeZone = weatherForecast.timezone;
            weather = weatherForecast.currently.icon;
            weatherElementsGenerator(weatherForecast, lang, timeZone);
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateData(userLocationCity) {
    getСityСoordinates(userLocationCity, lang)
        .then((cityCoord) => {
            cityName = (cityCoord.results[cityNumber].components.city || cityCoord.results[cityNumber].components.state);
            document.getElementById('location').innerHTML = `${(cityCoord.results[cityNumber].components.city || cityCoord.results[cityNumber].components.state)}, ${cityCoord.results[cityNumber].components.country}`;
            cityCoordinates = cityCoord.results[cityNumber].geometry;
            setMap(cityCoordinates, lang);
            updateWeatherForecast(cityCoordinates);
        })
        .catch((error) => {
            console.log(error);
        });
}

CurrentUserLocation()
    .then((userLocationCity) => {
        cityNumber = 0;
        updateData(userLocationCity);
    })
    .catch((error) => {
        console.log(error);
    });

setBackgroundImg(weather, timeZone);

setInterval(() => {
    document.getElementById('date').innerHTML = dateTime(timeZone, lang);
}, 1000);

const weatherAndMapBlock = document.createElement('div');
weatherAndMapBlock.className = 'weather-and-map-block';

weatherAndMapBlock.appendChild(weatherBlock);
weatherAndMapBlock.appendChild(mapBlock);

document.body.appendChild(cityList);
document.body.appendChild(controlBlockCreater());
document.getElementById('lang-switcher').value = lang;
document.getElementById('search-btn').innerHTML = translations[lang];
document.getElementById(degrees).classList.add('degrees-active');
document.body.appendChild(weatherAndMapBlock);

document.getElementById('refresh-btn').addEventListener('click', updateBg);

document.getElementById('degrees').addEventListener('click', (e) => {
    if (e.target.id !== degrees && e.target.parentNode.id !== degrees && e.target.parentNode.parentNode.id !== degrees) {
        degrees = (degrees === 'us') ? 'si' : 'us';
        document.getElementById('us').classList.toggle('degrees-active');
        document.getElementById('si').classList.toggle('degrees-active');
        updateWeatherForecast(cityCoordinates);
    }
});

document.getElementById('lang-switcher').addEventListener('input', (e) => {
    lang = e.target.value;
    document.getElementById('search-btn').innerHTML = translations[lang];
    updateData(cityName);
});

document.getElementById('search-btn').addEventListener('click', () => {
    cityName = document.getElementById('search-town').value;
    getСityСoordinates(cityName, lang)
        .then((cityCoord) => {
            document.getElementById('location').innerHTML = `${(cityCoord.results[cityNumber].components.city || cityCoord.results[cityNumber].components.state)}, ${cityCoord.results[cityNumber].components.country}`;
            cityCoordinates = cityListCreater(cityCoord);
        })
        .catch((error) => {
            console.log(error);
        });
});

document.getElementById('cities-list').addEventListener('click', (e) => {
    cityCoordinates = cityCoordinates[e.target.id];
    cityNumber = +e.target.id;
    e.currentTarget.innerHTML = '';
    document.getElementById('cities-block').style.display = 'none';
    document.getElementById('location').innerHTML = e.target.innerHTML;
    setMap(cityCoordinates, lang);
    updateWeatherForecast(cityCoordinates);
    updateBg();
});

document.getElementById('microphone').addEventListener('click', recordVoice);

window.onbeforeunload = () => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('degrees', degrees);
};