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
    const backgroundImgAccessKey = '&client_id=7a3d99c5f600e86bde4732a3fa580fa3353b56c7ffe03cd92ee6a9b3da45deec';
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
    const recognintion = new webkitSpeechRecognition();
    recognintion.lang = 'en-US';
    recognintion.interimResults = true;
    recognintion.start();
    recognintion.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        console.log(transcript);

        if (transcript == "Lacoste") transcript == "Forecast";
        if (transcript == "ваза") transcript == "Weather";
        document.getElementById('search-town').value = transcript;
    });
}

export { dateTime, clean, setBackgroundImg, updateBg, recordVoice };