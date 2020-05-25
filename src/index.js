import './style.css';



function getImg() {

    var url = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=-G8b2M1DsWaf6rkCtcf4wTn3PP2cIr0gpU8GsdN9wrM";
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            document.body.style.backgroundImage = `url(${data.urls.regular})`;


        }).catch((e) => {
            console.log(e);

        });


}

function getWeather() {
    let city_name = 'Minsk';
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=ua&units=metric&APPID=e1a026395101841860c9ed0627bf193d`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {


            generateWeatherCard(data);
        }).catch((e) => {
            console.log(e);

        });


}

// function getGeocoding() {
//     let city_name = 'Minsk';
//     var url = `https://api.opencagedata.com/geocode/v1/json?q=${city_name}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
//     fetch(url)
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {

//             generateWeatherCard(data);
//         }).catch((e) => {
//             console.log(e);

//         });


// }

function generateMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW95Z29zcGFkaW4xMzM3IiwiYSI6ImNrYW00ZnJyazEwZWkydHA2dmptNWtlbXYifQ.DSZRTK__vly8-UwK-VmWDQ';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}
generateMap();


setInterval(() => {
    var now = new Date();

    document.getElementsByClassName('todays-weather__date')[0].innerHTML = `${now.getDate()}` + "." + `${now.getMonth()}` + "." + `${now.getFullYear()}` + "  " + `${now.getHours()}` + ":" + `${now.getMinutes()}` + ":" + `${now.getSeconds()}`;
}, 1000);

function generateWeatherCard(data) {
    console.log(data);
    console.log(data.name);

    document.getElementsByClassName('todays-weather__location')[0].innerHTML = data.city.name;
    document.getElementsByClassName('todays-weather-forecast__degrees')[0].innerHTML = Math.ceil(data.list[0].main.temp);
}
getWeather();
getImg();