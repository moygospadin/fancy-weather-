const dayTranslates = {
    Sunday: 'Нядзеля',
    Monday: 'Панядзелак',
    Tuesday: 'Аўторак',
    Wednesday: 'Серада',
    Thursday: 'Чацвер',
    Friday: 'Пятніца',
    Saturday: 'Субота',
};

function weatherFutureDayElementGanerator(day, lang, zone) {
    const options = { weekday: 'long', timeZone: zone };
    const futureDay = (lang === 'be') ? dayTranslates[(new Date(day.time * 1000)).toLocaleString('en', options)] : (new Date(day.time * 1000)).toLocaleString(lang, options);
    const temperature = Math.floor((day.temperatureHigh + day.temperatureLow) / 2);
    const futureDayWeather = `<div class="future-day">
        <p class="future-day__name">${futureDay}</p>
        <div class="future-day-forecast">
            <p class="future-day-forecast__degrees">${temperature}</p>
            <div class="future-day-forecast__degrees-circle"></div>
            <img class="future-day-forecast__img" src="assets/${day.icon}.png" alt="">
        </div>
        </div>`;
    console.log(day);

    return futureDayWeather;
}

export { weatherFutureDayElementGanerator };