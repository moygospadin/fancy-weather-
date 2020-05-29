const translations = {
    ru: 'ПОИСК',
    en: 'SEARCH',
    be: 'ПОШУК',
};

function controlBlockCreater() {
    const controlBlock = document.createElement('div');
    controlBlock.className = 'control-block';
    controlBlock.innerHTML = `<div class="control-buttons">
    <div id="refresh-btn" class="control-buttons__bg-switcher">
        <img id="refresh-img" class="control-buttons__bg-switcher-img" src="assets/refresh-icon.svg" alt="">
    </div>
    <select class="control-buttons__lang-switcher" name="" id="lang-switcher">
        <option class="control-buttons__lang">en</option>
        <option class="control-buttons__lang">ru</option>
        <option class="control-buttons__lang">be</option>
    </select>
    <div id="degrees" class="control-buttons__degrees">
    <div id="us" class="control-buttons__fahrenheit">
        <p><sup>o</sup>F</p>
    </div>
    <div id="si" class="control-buttons__celsius">
        <p><sup>o</sup>C</p>
    </div>
    </div>
    </div>
    <div class="control-search">
    <input id="search-town" class="control-search__input" type="text">
    <div id="microphone" class="control-search__microphone"><img src="assets/microphone.svg" alt=""></div>
    <button id="search-btn" class="control-search__btn">SEARCH</button>
    </div>`;
    return controlBlock;
}

export { controlBlockCreater, translations };