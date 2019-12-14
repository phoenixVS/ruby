exports("handlebar", () => {
    $(document.body).ready(() => {
        window.onhashchange = locationHashChanged;
        locationHashChanged();
    });
});

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

function filterHandler(ID) {
    $(`[data-id="play-table"]`).empty();
    $(`[data-id="play-big"]`).empty();

    if (performance.navigation.type == 1) {
        console.info("This page is reloaded");
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: false, loadLanguage: false },
            slider: { loadCSS: false, loadLanguage: false },
            live: { loadCSS: false, loadLanguage: false },
            betslip_link: { loadCSS: false, loadLanguage: false },
        });
    } else {
        console.info("This page is not reloaded");
    }
    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            coef_table: { sportId: ID, loadCSS: false, loadLanguage: false },
            play_big: { sportId: ID, loadCSS: false, loadLanguage: false },
            play_table: { sportId: ID, loadCSS: false, loadLanguage: false },
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

// game video player page load
function gameHandler(ID) {
    const gameWrapper = $('[data-id=game]');

    if (performance.navigation.type == 1) {
        console.info("This page is reloaded");
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: false, loadLanguage: false },
        });
    } else {
        console.info("This page is not reloaded");
    }

    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            coef_table: { gameId: ID, loadCSS: false, loadLanguage: false },
            game: { gameId: ID, loadCSS: false, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            // video unlurk
            gameWrapper.data(`display`, 'true').attr('display', 'block');
            gameWrapper.css('display', 'block');
            // live lurk
            let live = $(`[data-id=live]`);
            if (live.data(`display`) === 'none') {
                live.css('display', 'none');
            }
            else {
                live.data(`display`, 'none').attr('data-display', 'none');
                live.css('display', 'none');
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
            // betslip small lurk
            let betslip_small = $(`[data-id=betslip-small]`);
            if (betslip_small.data(`display`) === 'none') {
                betslip_small.css('display', 'none');
            }
            else {
                betslip_small.data(`display`, 'none').attr('data-display', 'none');
                betslip_small.css('display', 'none');
            }
            // play-big lurk
            let play_big = $(`[data-id=play-big]`);
            if (play_big.data(`display`) === 'none') {
                play_big.css('display', 'none');
            }
            else {
                play_big.data(`display`, 'none').attr('data-display', 'none');
                play_big.css('display', 'none');
            }
            // play-table lurk
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
            // slider lurk
            let slider = $(`[data-id=slider]`);
            if (slider.data(`display`) === 'none') {
                slider.css('display', 'none');
            }
            else {
                slider.data(`display`, 'none').attr('data-display', 'none');
                slider.css('display', 'none');
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
        case 'event': gameHandler(window.location.hash.substr(8)); break;
        case 'betslip': betslipHandler(); break;
        case 'betslip-small': betslip_smallHandler(); break;
        default: emptyHandler(); break;
    }
}