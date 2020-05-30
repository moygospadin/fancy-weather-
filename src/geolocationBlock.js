const translations = {
    ru: {
        longitude: 'Долгота: ',
        latitude: 'Широта: ',
    },
    en: {
        longitude: 'Longitude: ',
        latitude: 'Latitude: ',
    },
    be: {
        longitude: 'Даўгата: ',
        latitude: 'Шырата: ',
    },
};

const fetch = require('node-fetch');

const mapBlock = document.createElement('div');
mapBlock.className = 'map-block';
mapBlock.innerHTML = `<div id="map" class="map-block__map"></div>
<p id="lat" class="map-block__coordinates"></p>
<p id="lng" class="map-block__coordinates"></p>`;
const cityList = document.createElement('div');
cityList.className = 'control__cities-block';
cityList.id = 'cities-block';
cityList.innerHTML = '<ul id="cities-list" class="control__cities"></ul>';

async function CurrentUserLocation() {
    const locationUrl = 'https://ipinfo.io/json?token=41a715c2b38c7a';
    try {
        const response = await fetch(locationUrl);
        const data = await response.json();
        return data.city;
    } catch (err) {
        return err;
    }
}

function cityListCreater(data) {
    document.getElementById('cities-block').style.display = 'block';
    const cities = document.getElementById('cities-list');
    cities.innerHTML = '';
    const coordList = [];
    data.results.forEach((el, index) => {
        const city = document.createElement('li');
        city.id = `${index}`;
        city.className = 'cities-city';
        city.innerHTML = `${(el.components.city || el.components.state)}, ${el.components.country}`;
        cities.appendChild(city);
        coordList.push(el.geometry);
    });
    return coordList;
}

function setMap(location, lang) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW95Z29zcGFkaW4xMzM3IiwiYSI6ImNrYW00ZnJyazEwZWkydHA2dmptNWtlbXYifQ.DSZRTK__vly8-UwK-VmWDQ';
    const { lng, lat } = location;
    document.getElementById('lng').innerHTML = `${translations[lang].longitude + Math.floor(lng)}<sup>o</sup>${Math.floor(lng % 1 * 60)}'`;
    document.getElementById('lat').innerHTML = `${translations[lang].latitude + Math.floor(lat)}<sup>o</sup>${Math.floor(lat % 1 * 60)}'`;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 9.5,
    });
}

async function getСityСoordinates(city, lang) {
    const coordinatesUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=9192c036c189474c8de9ce3eed892f44&pretty=1&no_annotations=1&language=${lang}`;
    try {
        const response = await fetch(coordinatesUrl);
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }
}

export { mapBlock, CurrentUserLocation, setMap, getСityСoordinates, cityList, cityListCreater };