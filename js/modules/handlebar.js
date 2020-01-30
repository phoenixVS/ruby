exports("handlebar", () => {
    $(document.body).ready(() => {
        window.onhashchange = locationHashChanged;
        locationHashChanged();
    });
});

function unloadCSS(moduleName) {
    moduleName = './css/modules/' + moduleName + '.css';
    let styles = document.querySelectorAll("link");
    styles.forEach((el) => {
        if (el && el.getAttribute('href') != null && el.getAttribute('href').indexOf(moduleName) != -1) {
            el.parentNode.removeChild(el);
        }
    });
}

function lurking(lurks, unlurks) {
    for (const element of lurks) {
        element.data('display', 'none').attr('data-display', 'none');
        element.css('display', 'none');;
    }
    for (const element of unlurks) {
        if (element.is('.play-big')) {
            element.data('display', 'true').attr('data-display', 'true');
            element.css('display', 'flex');
        }
        else {
            element.data('display', 'true').attr('data-display', 'true');
            element.css('display', 'block');
        }
    }
}

function mainHandler() {
    $(`[data-id=coef_table]`).empty();
    let fetchData = new Promise((resolve, reject) => {
        loadJsModules({
            fetch: { loadCSS: false, loadLanguage: false },
        });
        // wait until there will be an tableLoad module
        function wait() {
            if (typeof window.tableLoad === 'undefined') {
                setTimeout(wait, 10);
                return;
            }
            else {
                resolve();
            }
        }
        wait();
    });
    fetchData.then((response) => {
        const fetchPromise = new Promise((resolve, reject) => {
            window.tableLoad();
            const wait = setInterval(() => {
                if (window.inplay == undefined) { }
                else {
                    clearInterval(wait);
                    resolve();
                }
            }, 10);
        });
        fetchPromise
            .then((response) => {
                // loading modules for main view
                let onModulesLoad = new Promise((resolve, reject) => {
                    if ($('script[src="js/modules/header.js"]').length > 0) {
                        loadJsModules({
                            wsocket: { loadCSS: false, loadLanguage: false },
                            play_big: { loadCSS: true, loadLanguage: false },
                            play_table: { loadCSS: false, loadLanguage: false },
                            coef_table: { loadCSS: true, loadLanguage: false },
                        });
                        resolve();
                    }
                    else {
                        loadJsModules({
                            header: { loadCSS: true, loadLanguage: false },
                            aside: { loadCSS: true, loadLanguage: false },
                            slider: { loadCSS: false, loadLanguage: false },
                            coef_table: { loadCSS: true, loadLanguage: false },
                            live: { loadCSS: false, loadLanguage: false },
                            wsocket: { loadCSS: false, loadLanguage: false },
                            play_big: { loadCSS: true, loadLanguage: false },
                            play_table: { loadCSS: false, loadLanguage: false },
                        });
                        resolve();
                    }
                });
                onModulesLoad.then(
                    result => {
                        const user_menu = $(`[data-id=user-menu]`);
                        const mybets = $(`[data-id=mybets]`);
                        const slider = $(`[data-id=slider]`);
                        const formWrapper = $(`[data-id=registrationWrapper]`);
                        const play_big = $(`[data-id=play-big]`);
                        const coef_table = $(`[data-id=coef_table]`);
                        const play_table = $(`[data-id=play-table]`);
                        const live = $(`[data-id=live]`);
                        const game = $(`[data-id=game]`);
                        const betslip = $(`[data-id=betslip]`);
                        const betslip_link = $(`[data-id=betslip-link]`);
                        const betslip_small = $(`[data-id=betslip-small]`);
                        const lurks = [
                            mybets,
                            formWrapper,
                            game,
                            betslip,
                            betslip_link,
                            betslip_small,
                            user_menu,
                        ];
                        const unlurks = [
                            play_big,
                            coef_table,
                            play_table,
                            live,
                            slider,
                        ];
                        lurking(lurks, unlurks);
                        mybets.empty();
                        user_menu.empty();
                        game.empty();
                        unloadCSS('regist');
                        unloadCSS('mybets');
                        unloadCSS('user');
                    },
                    error => {
                        console.log(`modules haven't been loaded :_( \n
                    and everthing because of: ${error}`);
                    });
            });
    });
}
function filterHandler(ID) {
    $(`[data-id="play-table"]`).empty();
    $(`[data-id="play-big"]`).empty();
    if (performance.navigation.type == 1) {
        let fetchData = new Promise((resolve, reject) => {
            loadJsModules({
                fetch: { loadCSS: false, loadLanguage: false },
            });
            // wait until there will be an tableLoad module
            function wait() {
                if (typeof window.tableLoad === 'undefined') {
                    setTimeout(wait, 10);
                    return;
                }
                else {
                    resolve();
                }
            }
            wait();
        });
        fetchData.then((response) => {
            go();
        });
    }
    else {
        go();
    }

    function go() {
        const fetchPromise = new Promise((resolve, reject) => {
            window.tableLoad();
            const wait = setInterval(() => {
                if (window.inplay == undefined) { }
                else {
                    clearInterval(wait);
                    resolve();
                }
            }, 10);
        });
        fetchPromise
            .then((response) => {
                if (performance.navigation.type == 1) {
                    clearInterval(window.t_interval);
                    clearInterval(window.inplay_interval);
                    /*for (let i = 0; i < window.intervals.length; i++) {
                        clearInterval(window.intervals[i]);
                    }*/
                    loadJsModules({
                        header: { loadCSS: true, loadLanguage: false },
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
                        coef_table: { filtered: true, sportId: ID, loadCSS: false, loadLanguage: false },
                        play_big: { sportId: ID, loadCSS: true, loadLanguage: false },
                        play_table: { sportId: ID, loadCSS: false, loadLanguage: false },
                    });
                    resolve();
                });

                onModulesLoad.then(
                    result => {
                        const user_menu = $(`[data-id=user-menu]`);
                        const mybets = $(`[data-id=mybets]`);
                        const slider = $(`[data-id=slider]`);
                        const formWrapper = $(`[data-id=registrationWrapper]`);
                        const play_big = $(`[data-id=play-big]`);
                        const coef_table = $(`[data-id=coef_table]`);
                        const play_table = $(`[data-id=play-table]`);
                        const live = $(`[data-id=live]`);
                        const game = $(`[data-id=game]`);
                        const betslip = $(`[data-id=betslip]`);
                        const betslip_link = $(`[data-id=betslip-link]`);
                        const betslip_small = $(`[data-id=betslip-small]`);
                        const lurks = [
                            user_menu,
                            mybets,
                            formWrapper,
                            game,
                            betslip,
                            betslip_link,
                            betslip_small,
                        ];
                        const unlurks = [
                            play_big,
                            coef_table,
                            play_table,
                            live,
                            slider,
                        ];
                        lurking(lurks, unlurks);
                        user_menu.empty();
                        mybets.empty();
                        game.empty();
                    },
                    error => {
                        console.log(`modules haven't been loaded :_( \n
                and everthing because of: ${error}`);
                    });
            });
    }
}

// game + game player page load
function gameHandler(ID) {
    const gameWrapper = $('[data-id=game]');
    if (performance.navigation.type == 1) {
        let fetchData = new Promise((resolve, reject) => {
            loadJsModules({
                fetch: { loadCSS: false, loadLanguage: false },
            });
            // wait until there will be an tableLoad module
            function wait() {
                if (typeof window.eventLoad === 'undefined') {
                    setTimeout(wait, 10);
                    return;
                }
                else {
                    resolve();
                }
            }
            wait();
        });
        fetchData.then((response) => {
            go();
        });
    }
    else {
        go();
    }

    function go() {
        const fetchPromise = new Promise((resolve, reject) => {
            window.eventLoad(ID);
            const wait = setInterval(() => {
                if (window.event == undefined) { }
                else {
                    clearInterval(wait);
                    resolve();
                }
            }, 10);
        });
        fetchPromise
            .then((response) => {
                if (performance.navigation.type == 1) {
                    loadJsModules({
                        header: { loadCSS: true, loadLanguage: false },
                        aside: { loadCSS: true, loadLanguage: false },
                    });
                }

                let onModulesLoad = new Promise((resolve, reject) => {
                    loadJsModules({
                        coef_table: { expand: true, loadCSS: true, loadLanguage: false },
                        game: { gameId: ID, loadCSS: false, loadLanguage: false },
                    });
                    resolve();
                });

                onModulesLoad.then(
                    result => {
                        const user_menu = $(`[data-id=user-menu]`);
                        const mybets = $(`[data-id=mybets]`);
                        const slider = $(`[data-id=slider]`);
                        const formWrapper = $(`[data-id=registrationWrapper]`);
                        const play_big = $(`[data-id=play-big]`);
                        const coef_table = $(`[data-id=coef_table]`);
                        const play_table = $(`[data-id=play-table]`);
                        const live = $(`[data-id=live]`);
                        const game = $(`[data-id=game]`);
                        const betslip = $(`[data-id=betslip]`);
                        const betslip_link = $(`[data-id=betslip-link]`);
                        const betslip_small = $(`[data-id=betslip-small]`);
                        const lurks = [
                            user_menu,
                            mybets,
                            live,
                            formWrapper,
                            slider,
                            play_big,
                            play_table,
                            betslip,
                            betslip_link,
                            betslip_small,
                        ];
                        const unlurks = [
                            game,
                            coef_table,
                        ];
                        lurking(lurks, unlurks);
                        user_menu.empty();
                        mybets.empty();
                    },
                    error => {
                        console.log(`modules haven't been loaded :_( \n
                and everthing because of: ${error}`);
                    });
            });
    }
}

function betslipHandler() {

}

function betslip_smallHandler() {

}

// registration page load
function registrationHandler() {
    $(`[data-id=registrationWrapper]`).empty();
    if (performance.navigation.type == 1) {
        loadJsModules({
            header: { loadCSS: true, loadLanguage: false },
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
            const mybets = $(`[data-id=mybets]`);
            const user_menu = $(`[data-id=user-menu]`);
            const slider = $(`[data-id=slider]`);
            const formWrapper = $(`[data-id=registrationWrapper]`);
            const play_big = $(`[data-id=play-big]`);
            const coef_table = $(`[data-id=coef_table]`);
            const play_table = $(`[data-id=play-table]`);
            const live = $(`[data-id=live]`);
            const game = $(`[data-id=game]`);
            const betslip = $(`[data-id=betslip]`);
            const betslip_link = $(`[data-id=betslip-link]`);
            const betslip_small = $(`[data-id=betslip-small]`);
            const lurks = [
                mybets,
                game,
                betslip,
                betslip_link,
                betslip_small,
                play_big,
                coef_table,
                play_table,
                live,
                slider,
                user_menu,
            ];
            const unlurks = [
                formWrapper,
            ];
            lurking(lurks, unlurks);
            mybets.empty();
            user_menu.empty();
            game.empty();
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
            header: { loadCSS: true, loadLanguage: false },
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
            const mybets = $(`[data-id=mybets]`);
            const slider = $(`[data-id=slider]`);
            const formWrapper = $(`[data-id=registrationWrapper]`);
            const play_big = $(`[data-id=play-big]`);
            const coef_table = $(`[data-id=coef_table]`);
            const play_table = $(`[data-id=play-table]`);
            const live = $(`[data-id=live]`);
            const game = $(`[data-id=game]`);
            const betslip = $(`[data-id=betslip]`);
            const betslip_link = $(`[data-id=betslip-link]`);
            const betslip_small = $(`[data-id=betslip-small]`);
            const lurks = [
                mybets,
                game,
                betslip,
                betslip_link,
                betslip_small,
                play_big,
                coef_table,
                play_table,
                live,
                slider,
                formWrapper,
            ];
            const unlurks = [

            ];
            lurking(lurks, unlurks);
            mybets.empty();

        },
        error => {
            console.log(`modules haven't been loaded :_( \n
        and everthing because of: ${error}`);
        });
}
// My bets page
function mybetsHandler() {
    let onModulesLoad = new Promise((resolve, reject) => {
        if ($('script[src="js/modules/header.js"]').length > 0) {
            loadJsModules({
                mybets: { loadCSS: true, loadLanguage: false },
            });
            resolve();
        }
        else {
            loadJsModules({
                header: { loadCSS: true, loadLanguage: false },
                aside: { loadCSS: true, loadLanguage: false },
                mybets: { loadCSS: true, loadLanguage: false },
            });
            resolve();
        }
    });
    onModulesLoad.then(() => {
        const mybets = $(`[data-id=mybets]`);
        const slider = $(`[data-id=slider]`);
        const formWrapper = $(`[data-id=registrationWrapper]`);
        const play_big = $(`[data-id=play-big]`);
        const coef_table = $(`[data-id=coef_table]`);
        const play_table = $(`[data-id=play-table]`);
        const live = $(`[data-id=live]`);
        const game = $(`[data-id=game]`);
        const betslip = $(`[data-id=betslip]`);
        const betslip_link = $(`[data-id=betslip-link]`);
        const betslip_small = $(`[data-id=betslip-small]`);

        const lurks = [
            game,
            betslip,
            betslip_link,
            betslip_small,
            play_big,
            coef_table,
            play_table,
            live,
            slider,
            formWrapper,
        ];
        const unlurks = [
            mybets,
        ];
        lurking(lurks, unlurks);
        user_menu.empty();
        mybets.empty();
    });
}

// 404 Page not found
function emptyHandler() {
    let onModulesLoad = new Promise((resolve, reject) => {
        if ($('script[src="js/modules/header.js"]').length > 0) {
            loadJsModules({
                p404: { loadCSS: false, loadLanguage: false },
            });
            resolve();
        }
        else {
            loadJsModules({
                header: { loadCSS: true, loadLanguage: false },
                aside: { loadCSS: true, loadLanguage: false },
                p404: { loadCSS: false, loadLanguage: false },
            });
            resolve();
        }
    });
    onModulesLoad.then(() => {
        const mybets = $(`[data-id=mybets]`);
        const slider = $(`[data-id=slider]`);
        const formWrapper = $(`[data-id=registrationWrapper]`);
        const play_big = $(`[data-id=play-big]`);
        const coef_table = $(`[data-id=coef_table]`);
        const play_table = $(`[data-id=play-table]`);
        const live = $(`[data-id=live]`);
        const game = $(`[data-id=game]`);
        const betslip = $(`[data-id=betslip]`);
        const betslip_link = $(`[data-id=betslip-link]`);
        const betslip_small = $(`[data-id=betslip-small]`);
        const lurks = [
            game,
            betslip,
            betslip_link,
            betslip_small,
            play_big,
            coef_table,
            play_table,
            live,
            slider,
            formWrapper,
            mybets,
        ];
        const unlurks = [
        ];
        lurking(lurks, unlurks);
        mybets.empty();
        game.empty();
    });
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
            case 'event': gameHandler(window.location.href.split('/')[6]); break;
            case 'betslip': betslipHandler(); break;
            case 'betslip-small': betslip_smallHandler(); break;
            case 'registration': registrationHandler(); break;
            case 'user': userHandler(window.location.href.split('/')[6], window.location.href.split('/')[7], window.location.href.split('/')[8]); break;
            case 'mybets': mybetsHandler(); break;
            default: emptyHandler();
        }
    }
}