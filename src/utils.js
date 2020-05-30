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
        const time = currentTime.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: zone });
        date = `${weekDay}, ${dayNumber} ${month}, ${time}`;
    } else {
        const options = { weekday: 'short', hour: '2-digit', minute: '2-digit', month: 'long', day: 'numeric', hour12: false, timeZone: zone };
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


function recordVoice() {
    document.querySelector('#search-town').value = "";
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.start();
    var text = document.getElementsByClassName('todays-weather-forecast-info__text')[0].textContent;
    recognition.addEventListener('result', (event) => {
        console.log(event);

        var result = event.results[event.resultIndex];
        if (result.isFinal) {
            document.querySelector('#search-town').value = result[0].transcript;

            if (result[0].transcript == "погода") speechSynthesis.speak(new SpeechSynthesisUtterance(text));
        } else {
            document.querySelector('#search-town').value = result[0].transcript;

        }

    });


}

export { dateTime, clean, setBackgroundImg, updateBg, recordVoice };