exports("handlebar", () => {
    $(document.body).ready(() => {
        window.onhashchange = locationHashChanged;
        locationHashChanged();
    });
});

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function emptyHandler() {
    // loading modules for main view
    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: false, loadLanguage: false },
            slider: { loadCSS: false, loadLanguage: false },
            play_big: { loadCSS: false, loadLanguage: false },
            coef_table: { loadCSS: false, loadLanguage: false },
            live: { loadCSS: false, loadLanguage: false },
            play_table: { loadCSS: false, loadLanguage: false },
            betslip_link: { loadCSS: false, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            // video lurk
            let video = $(`[data-id=video]`);
            if (video.data(`display`) === 'none') {
                video.css('display', 'none');
            }
            else {
                video.data(`display`, 'none').attr('data-display', 'none');
                video.css('display', 'none');
            }
            // betslip lurk
            let betslip = $(`[data-id=betslip]`);
            if (betslip.data(`display`) === 'none') {
                betslip.css('display', 'none');
            }
            else {
                betslip.data(`display`, 'none').attr('data-display', 'none');
                betslip.css('display', 'none');
            }
            // betslip lurk
            let betslip_small = $(`[data-id=betslip-small]`);
            if (betslip_small.data(`display`) === 'none') {
                betslip_small.css('display', 'none');
            }
            else {
                betslip_small.data(`display`, 'none').attr('data-display', 'none');
                betslip_small.css('display', 'none');
            }
            // betslip-link lurk
            let betslip_link = $(`[data-id=betslip-link]`);
            if (betslip_link.data(`display`) === 'none') {
                betslip_link.css('display', 'none');
            }
            else {
                betslip_link.data(`display`, 'none').attr('data-display', 'none');
                betslip_link.css('display', 'none');
            }
        },
        error => {
            console.log(`modules haven't been loaded :_( \n
                and everthing because of: ${error}`);
        });
}
// filters from slider
function filterHandler(ID) {

}

// game video player page load
function gameHandler() {
    console.log('game');
    const gameWrapper = $('[data-id=game]');

    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            game: { loadCSS: false, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            gameWrapper.data(`display`, 'true');
            // betslip lurk
            let betslip = $(`[data-id=betslip]`);
            if (betslip.data(`display`) === 'none') {
                betslip.css('display', 'none');
            }
            else {
                betslip.data(`display`, 'none').attr('data-display', 'none');
                betslip.css('display', 'none');
            }
            // betslip small lurk
            let betslip_small = $(`[data-id=betslip-small]`);
            if (betslip_small.data(`display`) === 'none') {
                betslip_small.css('display', 'none');
            }
            else {
                betslip_small.data(`display`, 'none').attr('data-display', 'none');
                betslip_small.css('display', 'none');
            }
            // paly-table lurk
            let play_table = $(`[data-id=play-table]`);
            if (play_table.data(`display`) === 'none') {
                play_table.css('display', 'none');
            }
            else {
                play_table.data(`display`, 'none').attr('data-display', 'none');
                play_table.css('display', 'none');
            }
            // betslip-link lurk
            let betslip_link = $(`[data-id=betslip-link]`);
            if (betslip_link.data(`display`) === 'none') {
                betslip_link.css('display', 'none');
            }
            else {
                betslip_link.data(`display`, 'none').attr('data-display', 'none');
                betslip_link.css('display', 'none');
            }
        },
        error => {
            console.log(`modules haven't been loaded :_( \n
        and everthing because of: ${error}`);
        });
}

function betslipHandler() {

}

function betslip_smallHandler() {

}

function locationHashChanged() {
    let hash = window.location.hash.split('/');
    switch (hash[1]) {
        case 'filter': filterHandler(window.location.hash.substr(9)); break;
        case 'game': gameHandler(); break;
        case 'betslip': betslipHandler(); break;
        case 'betslip-small': betslip_smallHandler(); break;
        default: emptyHandler(); break;
    }
}