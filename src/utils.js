import { searchCity } from './index.js';
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
const dayAndMonthsTranslates = {
    Sun: 'Нд',
    Mon: 'Пн',
    Tue: 'Аў',
    Wed: 'Ср',
    Thu: 'Чц',
    Fri: 'Пт',
    Sat: 'Сб',
    January: 'Студзеня',
    February: 'Лютага',
    March: 'Сакавіка',
    April: 'Красавіка',
    May: 'Мая',
    June: 'Чэрвеня',
    July: 'Ліпень',
    August: 'Жніўня',
    September: 'Верасня',
    October: 'Кастрычніка',
    November: 'Лістапада',
    December: 'Снежня',
};

function dateTime(zone, lang) {
    const currentTime = new Date();
    let date;
    if (lang === 'be') {
        const weekDay = dayAndMonthsTranslates[currentTime.toLocaleString('en', { weekday: 'short', timeZone: zone })];
        const dayNumber = currentTime.toLocaleString('en', { day: 'numeric', timeZone: zone });
        const month = dayAndMonthsTranslates[currentTime.toLocaleString('en', { month: 'long', timeZone: zone })];
        const time = currentTime.toLocaleString('en', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: zone });
        date = `${weekDay}, ${dayNumber} ${month}, ${time}`;
    } else {
        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', month: 'long', day: 'numeric', hour12: false, timeZone: zone };
        date = currentTime.toLocaleString(lang, options);
    }
    return date;
}

function clean() {
    document.getElementById('today').innerHTML = '';
    document.getElementById('future').innerHTML = '';
}

async function searchByQuery(query) {
    const backgroundImgUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=';
    const backgroundImgAccessKey = '&client_id=-G8b2M1DsWaf6rkCtcf4wTn3PP2cIr0gpU8GsdN9wrM';
    try {
        const url = backgroundImgUrl + query + backgroundImgAccessKey;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        document.getElementsByClassName('error_table')[0].innerHTML = "INTERNET_DISCONNECTED";
        document.getElementsByClassName('error_table')[0].classList.add('vissible');
        setTimeout(() => {
            document.getElementsByClassName('error_table')[0].classList.remove('vissible');
        }, 5000);

        console.log(err);

        return err;
    }
}

async function setBackgroundImg(weather, zone) {
    const season = seasons[Math.floor(((new Date()).getMonth() + 1) % 12 / 3)];
    const timeOfDay = timesOfDay[Math.floor(((new Date()).toLocaleString('en', { hour: 'numeric', timeZone: zone }) + 1) % 24 / 6)];
    const query = `${season},${weather},${timeOfDay}`;
    searchByQuery(query)
        .then((data) => {
            document.body.style.backgroundImage = `url('${data.urls.full}')`;
        })
        .catch((error) => {
            document.getElementsByClassName('error_table')[0].innerHTML = "Background IMG API Call Exceeded or INTERNET_DISCONNECTED";
            document.getElementsByClassName('error_table')[0].classList.add('vissible');
            setTimeout(() => {
                document.getElementsByClassName('error_table')[0].classList.remove('vissible');
            }, 5000);
            console.log(error);
        });
}

function updateBg(weather, timeZone) {
    document.getElementById('refresh-img').classList.add('rotate');
    setTimeout(() => {
        document.getElementById('refresh-img').classList.remove('rotate');
    }, 3000);
    setBackgroundImg(weather, timeZone);
}
var volume = 0.5;
let end = 0;
var microphoneClick = 0;

function recordVoice() {
    microphoneClick++;
    document.getElementsByClassName("microphone_img")[0].classList.add('pulse');
    document.querySelector('#search-town').value = "";
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    var text = document.getElementsByClassName('todays-weather-forecast-info__text')[0].textContent;
    text = text.replace('.', '')
    let mySpeak = new SpeechSynthesisUtterance(text);
    switch (document.querySelector('.control-search__btn').textContent) {
        case 'ПОИСК':
            recognition.lang = "ru-RU";
            mySpeak.lang = 'ru-RU';
            break;
        case 'SEARCH':
            recognition.lang = "en-US";
            mySpeak.lang = 'en-US';
            break;
        case 'ПОШУК':
            mySpeak.lang = 'ru-RU';
            recognition.lang = "ru-RU";
            break;
        default:
            recognition.lang = "en-US";
            mySpeak.lang = 'en-US';
            break;
    }

    recognition.start();
    if (microphoneClick >= 2) {
        recognition.abort();
        microphoneClick = 0;
    }

    recognition.addEventListener("end", () => {

        if (end >= 1) {
            end = 0;
            document.getElementsByClassName("microphone_img")[0].classList.remove('pulse');
        }
        end++;
    })

    recognition.addEventListener('result', (event) => {
        var result = event.results[event.resultIndex];

        if (result.isFinal) {
            document.getElementsByClassName("microphone_img")[0].classList.remove('pulse');
            document.querySelector('#search-town').value = result[0].transcript;
            var synth = window.speechSynthesis;

            if (result[0].transcript.toLowerCase() == "погода" || result[0].transcript.toLowerCase() == "weather" || result[0].transcript.toLowerCase() == "forecast") synth.speak(mySpeak);
            else
            if (result[0].transcript.toLowerCase() == "тише" || result[0].transcript.toLowerCase() == "quieter" || result[0].transcript.toLowerCase() == "quieter") {
                volume -= 0.3;
                mySpeak.volume = volume;

            } else
            if (result[0].transcript.toLowerCase() == "громче" || result[0].transcript.toLowerCase() == "louder") {
                volume += 0.3;
                mySpeak.volume = volume;

            } else
                searchCity();
        } else {
            document.querySelector('#search-town').value = result[0].transcript;
            console.log(recognition.onend);
        }

    });



}
var voiceControll = 0;

function voiceSpeak() {
    var text = document.getElementsByClassName('todays-weather-forecast-info__text')[0].textContent;
    text = text.replace('.', '')
    let mySpeak = new SpeechSynthesisUtterance(text);
    switch (document.querySelector('.control-search__btn').textContent) {
        case 'ПОИСК':

            mySpeak.lang = 'ru-RU';
            break;
        case 'SEARCH':

            mySpeak.lang = 'en-US';
            break;
        case 'ПОШУК':

            recognition.lang = "ru-RU";
            break;
        default:

            mySpeak.lang = 'en-US';
            break;
    }
    var synth = window.speechSynthesis;
    synth.speak(mySpeak);


}
export { dateTime, clean, setBackgroundImg, updateBg, recordVoice, voiceSpeak };