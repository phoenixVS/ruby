exports("handlebar", () => {
    $(document.body).ready(() => {
        window.onhashchange = locationHashChanged;
        locationHashChanged();
    });
});

function mainHandler() {
    // loading modules for main view
    let onModulesLoad = new Promise((resolve, reject) => {
        if ($('script[src="js/modules/header.js"]').length > 0) {
            loadJsModules({
                play_big: { loadCSS: false, loadLanguage: false },
                play_table: { loadCSS: false, loadLanguage: false },
            });
            resolve();
        }
        else {
            loadJsModules({
                header: { loadCSS: false, loadLanguage: false },
                aside: { loadCSS: true, loadLanguage: false },
                slider: { loadCSS: false, loadLanguage: false },
                play_big: { loadCSS: false, loadLanguage: false },
                coef_table: { loadCSS: true, loadLanguage: false },
                live: { loadCSS: false, loadLanguage: false },
                play_table: { loadCSS: false, loadLanguage: false },
                betslip_link: { loadCSS: false, loadLanguage: false },
            });
            resolve();
        }
    });
    onModulesLoad.then(
        result => {
            const formWrapper = $(`[data-id=registrationWrapper]`);
            formWrapper.data('display', 'none').attr('data-display', 'none');
            formWrapper.css('display', 'none');
            // play-big unlurk
            let play_big = $(`[data-id=play-big]`);
            if (play_big.data(`display`) === 'flex') {
                play_big.css('display', 'flex');
            }
            else {
                play_big.data(`display`, 'flex').attr('data-display', 'flex');
                play_big.css('display', 'flex');
            }
            // coef_table unlurk
            let coef_table = $(`[data-id=coef_table]`);
            coef_table.data(`display`, 'block').attr('display', 'block');
            coef_table.css('display', 'block');
            // play-table unlurk
            let play_table = $(`[data-id=play-table]`);
            if (play_table.data(`display`) === 'block') {
                play_table.css('display', 'block');
            }
            else {
                play_table.data(`display`, 'block').attr('data-display', 'block');
                play_table.css('display', 'block');
            }
            // live unlurk
            let live = $(`[data-id=live]`);
            if (live.data(`display`) === 'block') {
                live.css('display', 'block');
            }
            else {
                live.data(`display`, 'block').attr('data-display', 'block');
                live.css('display', 'block');
            }
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
        clearInterval(window.t_interval);
        clearInterval(window.inplay_interval);
        /*for (let i = 0; i < window.intervals.length; i++) {
            clearInterval(window.intervals[i]);
        }*/
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: false, loadLanguage: false },
            slider: { loadCSS: false, loadLanguage: false },
            live: { loadCSS: false, loadLanguage: false },
            betslip_link: { loadCSS: false, loadLanguage: false },
        });
    } else {
        clearInterval(window.t_interval);
        clearInterval(window.inplay_interval);
        /*for (let i = 0; i < window.intervals.length; i++) {
            clearInterval(window.intervals[i]);
        }*/
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
            const formWrapper = $(`[data-id=registrationWrapper]`);
            formWrapper.data('display', 'none').attr('data-display', 'none');
            formWrapper.css('display', 'none');
            // play-big unlurk
            let play_big = $(`[data-id=play-big]`);
            if (play_big.data(`display`) === 'flex') {
                play_big.css('display', 'flex');
            }
            else {
                play_big.data(`display`, 'flex').attr('data-display', 'flex');
                play_big.css('display', 'flex');
            }
            // coef_table unlurk
            let coef_table = $(`[data-id=coef_table]`);
            coef_table.data(`display`, 'block').attr('display', 'block');
            coef_table.css('display', 'block');
            // play-table unlurk
            let play_table = $(`[data-id=play-table]`);
            if (play_table.data(`display`) === 'block') {
                play_table.css('display', 'block');
            }
            else {
                play_table.data(`display`, 'block').attr('data-display', 'block');
                play_table.css('display', 'block');
            }
            // live unlurk
            let live = $(`[data-id=live]`);
            if (live.data(`display`) === 'block') {
                live.css('display', 'block');
            }
            else {
                live.data(`display`, 'block').attr('data-display', 'block');
                live.css('display', 'block');
            }
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

// game + video player page load
function gameHandler(sport, ID) {
    const gameWrapper = $('[data-id=game]');

    if (performance.navigation.type == 1) {
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: true, loadLanguage: false },
        });
    }

    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            coef_table: { sport: sport, gameId: ID, loadCSS: true, loadLanguage: false },
            game: { sport: sport, gameId: ID, loadCSS: false, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            const formWrapper = $(`[data-id=registrationWrapper]`);
            formWrapper.data('display', 'none').attr('data-display', 'none');
            formWrapper.css('display', 'none');
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
// registration page load
function registrationHandler() {
    if (performance.navigation.type == 1) {
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
            aside: { loadCSS: false, loadLanguage: false },
        });
    }

    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            regist: { loadCSS: true, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            // Form unlurk
            const formWrapper = $(`[data-id=registrationWrapper]`);
            formWrapper.data('display', 'block').attr('data-display', 'block');
            formWrapper.css('display', 'block');
            // video unlurk
            const gameWrapper = $('[data-id=game]');
            gameWrapper.data(`display`, 'false').attr('display', 'none');
            gameWrapper.css('display', 'none');
            // coef_table lurk
            let coef_table = $(`[data-id=coef_table]`);
            coef_table.data(`display`, 'false').attr('display', 'none');
            coef_table.css('display', 'none');
            // user page lurk
            let userPage = $('.userContent');
            userPage.data(`display`, 'false').attr('display', 'none');
            userPage.css('display', 'none');
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

// Handler of user's personal room
function userHandler(username, nav_link, nav_link_small) {
    let reload_status = 0;
    if (performance.navigation.type == 1) {
        reload_status = 1;
        loadJsModules({
            header: { loadCSS: false, loadLanguage: false },
        });
    }

    let onModulesLoad = new Promise((resolve, reject) => {
        loadJsModules({
            user: { username: username, nav_link: nav_link, nav_link_small: nav_link_small, loadCSS: true, loadLanguage: false },
        });
        resolve();
    });

    onModulesLoad.then(
        result => {
            if (reload_status == 0) {
                const gameWrapper = $('[data-id=game]');
                // video lurk
                gameWrapper.data(`display`, 'false').attr('display', 'none');
                gameWrapper.css('display', 'none');
                // coef_table lurk
                let coef_table = $(`[data-id=coef_table]`);
                coef_table.data(`display`, 'false').attr('display', 'none');
                coef_table.css('display', 'none');
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
            }
            else {
                // slider lurk
                let slider = $(`[data-id=slider]`);
                if (slider.data(`display`) === 'none') {
                    slider.css('display', 'none');
                }
                else {
                    slider.data(`display`, 'none').attr('data-display', 'none');
                    slider.css('display', 'none');
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
            }
        },
        error => {
            console.log(`modules haven't been loaded :_( \n
        and everthing because of: ${error}`);
        });
}

// 404 Page not found
function emptyHandler() {
    loadJsModules({
        header: { loadCSS: false, loadLanguage: false },
        aside: { loadCSS: true, loadLanguage: false },
        p404: { loadCSS: false, loadLanguage: false },
    });
    // betslip-link lurk
    let betslip_link = $(`[data-id=betslip-link]`);
    if (betslip_link.data(`display`) === 'none') {
        betslip_link.css('display', 'none');
    }
    else {
        betslip_link.data(`display`, 'none').attr('data-display', 'none');
        betslip_link.css('display', 'none');
    }
}

function locationHashChanged() {
    let hash = window.location.href.split('/')[4];
    if (hash == '') {
        mainHandler();
    }
    else {
        switch (window.location.href.split('/')[5]) {
            case '': case undefined: mainHandler(); break;
            case 'filter': filterHandler(window.location.href.split('/')[6]); break;
            case 'event': gameHandler(window.location.href.split('/')[6], window.location.href.split('/')[7]); break;
            case 'betslip': betslipHandler(); break;
            case 'betslip-small': betslip_smallHandler(); break;
            case 'registration': registrationHandler(); break;
            case 'user': userHandler(window.location.href.split('/')[6], window.location.href.split('/')[7], window.location.href.split('/')[8]); break;
            default: emptyHandler();
        }
    }
}