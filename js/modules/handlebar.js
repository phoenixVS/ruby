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
	async function moduleLoader() {
		return new Promise((res, rej) => {
			if ($('script[src="js/modules/header.js"]').length > 0) {
				loadJsModules({
					// wsocket: { loadCSS: false, loadLanguage: false },
					slider: { loadCSS: true, loadLanguage: false },
					play_big: { loadCSS: true, loadLanguage: false },
					play_table: { loadCSS: true, loadLanguage: false },
					coef_table: { loadCSS: true, loadLanguage: false },
				});
				res();
			}
			else {
				loadJsModules({
					header: { loadCSS: true, loadLanguage: false },
					aside: { loadCSS: true, loadLanguage: false },
					slider: { loadCSS: true, loadLanguage: false },
					coef_table: { loadCSS: true, loadLanguage: false },
					live: { loadCSS: false, loadLanguage: false },
					// wsocket: { loadCSS: false, loadLanguage: false },
					play_big: { loadCSS: true, loadLanguage: false },
					play_table: { loadCSS: true, loadLanguage: false },
				});
				res();
			}
		});
	}

	async function contentHandler() {
		return new Promise((res, rej) => {
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
			const calendar = $('[data-id=calendarContainer]');
			const prematch = $('.prematch');
			const lurks = [
				mybets,
				formWrapper,
				game,
				betslip,
				betslip_link,
				betslip_small,
				user_menu,
				calendar,
				prematch,
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
			res();
		});
	}

	const module = defaultLoading(moduleLoader, contentHandler);
}

async function defaultLoading(moduleLoader, contentHandler) {
	// Loading user config
	let config = await loadJsModules({
		config: {}
	});
	let fetch_langs = await loadJsModules({
		fetch: {},
		langs: {}
	});
	// wait until scripts are loaded
	const scriptsPromise = new Promise((res, rej) => {
		const waitForScriptsLoading = () => {
			let scriptsLoaded = false;
			if (!(typeof window.tableLoad == 'function' && typeof window.sportsLoad == 'function')) {
				setTimeout(() => {
					waitForScriptsLoading();
				}, 250);
			}
			else {
				scriptsLoaded = true;
				window.tableLoad();
				window.sportsLoad();
			}
			if (scriptsLoaded == true) {
				res();
			}
		}
		waitForScriptsLoading();
	});
	// wait until data is being loaded
	const dataPromise = new Promise((res, rej) => {
		const waitForData = (dataLoaded) => {
			if (!(typeof window.inplay == "object" && typeof window.sports == "object")) {
				setTimeout(() => {
					waitForData();
				}, 250);
			}
			else {
				dataLoaded = true;
				return Promise.resolve(1);
			}
			if (dataLoaded == true) {
				res();
			}
		}
		waitForData(false);
	});
	const promise1Result = await scriptsPromise;
	const promise2Result = await dataPromise;
	console.dir(window.tableLoad);
	console.dir(window.sportsLoad);
	// console.dir(window.inplay);
	// console.dir(window.dict);
	// loading view modules
	await moduleLoader();
	// showing and hiding content
	await contentHandler();
}


// function mainHandler() {
// 	console.log(`MAIN HANDLER CALLED`);
// 	let fetchData = new Promise((resolve, reject) => {
// 		loadJsModules({
// 			config: { loadCSS: false, loadLanguage: false },
// 			fetch: { loadCSS: false, loadLanguage: false },
// 			langs: { loadCSS: false, loadLanguage: false },
// 		});
// 		// wait until there will be an tableLoad module
// 		function wait() {
// 			if (typeof window.tableLoad === 'undefined') {
// 				setTimeout(wait, 10);
// 				return;
// 			}
// 			else {
// 				resolve();
// 			}
// 		}
// 		wait();
// 	});
// 	fetchData.then((response) => {
// 		const fetchPromise = new Promise((resolve, reject) => {
// 			window.tableLoad();
// 			window.sportsLoad();
// 			const wait = setInterval(() => {
// 				if (window.inplay == undefined) { }
// 				else {
// 					clearInterval(wait);
// 					resolve();
// 				}
// 			}, 10);
// 		});
// 		fetchPromise
// 			.then((response) => {
// 				// loading modules for main view
// 				let onModulesLoad = new Promise((resolve, reject) => {
// 					// if inplay empty go to soccer prematch
// 					if (window.inplay.length == 0) {
// 						window.location.hash = '#/sport/1';
// 						return;
// 					}
// 					if ($('script[src="js/modules/header.js"]').length > 0 && $('.live-title').length != 0) {
// 						loadJsModules({
// 							wsocket: { loadCSS: false, loadLanguage: false },
// 							slider: { loadCSS: true, loadLanguage: false },
// 							play_big: { loadCSS: true, loadLanguage: false },
// 							play_table: { loadCSS: true, loadLanguage: false },
// 							coef_table: { loadCSS: true, loadLanguage: false },
// 						});
// 						resolve();
// 					}
// 					else {
// 						loadJsModules({
// 							header: { loadCSS: true, loadLanguage: false },
// 							aside: { loadCSS: true, loadLanguage: false },
// 							slider: { loadCSS: true, loadLanguage: false },
// 							coef_table: { loadCSS: true, loadLanguage: false },
// 							live: { loadCSS: false, loadLanguage: false },
// 							wsocket: { loadCSS: false, loadLanguage: false },
// 							play_big: { loadCSS: true, loadLanguage: false },
// 							play_table: { loadCSS: true, loadLanguage: false },
// 						});
// 						// if ($('script[src="js/modules/betslip_link.js"]').length == 0) {
// 						//     loadJsModules({
// 						//         betslip_link: { loadCSS: false, loadLanguage: false },
// 						//     });
// 						// }
// 						resolve();
// 					}
// 				});
// 				onModulesLoad.then(
// 					result => {
// 						const user_menu = $(`[data-id=user-menu]`);
// 						const mybets = $(`[data-id=mybets]`);
// 						const slider = $(`[data-id=slider]`);
// 						const formWrapper = $(`[data-id=registrationWrapper]`);
// 						const play_big = $(`[data-id=play-big]`);
// 						const coef_table = $(`[data-id=coef_table]`);
// 						const play_table = $(`[data-id=play-table]`);
// 						const live = $(`[data-id=live]`);
// 						const game = $(`[data-id=game]`);
// 						const betslip = $(`[data-id=betslip]`);
// 						const betslip_link = $(`[data-id=betslip-link]`);
// 						const betslip_small = $(`[data-id=betslip-small]`);
// 						const calendar = $('[data-id=calendarContainer]');
// 						const prematch = $('.prematch');
// 						const lurks = [
// 							mybets,
// 							formWrapper,
// 							game,
// 							betslip,
// 							betslip_link,
// 							betslip_small,
// 							user_menu,
// 							calendar,
// 							prematch,
// 						];
// 						const unlurks = [
// 							play_big,
// 							coef_table,
// 							play_table,
// 							live,
// 							slider,
// 						];
// 						lurking(lurks, unlurks);
// 						mybets.empty();
// 						user_menu.empty();
// 						game.empty();
// 						unloadCSS('regist');
// 						unloadCSS('mybets');
// 						unloadCSS('user');
// 					},
// 					error => {
// 						console.log(`modules haven't been loaded :_( \n
//                     and everthing because of: ${error}`);
// 					});
// 			});
// 	});
// }
// on filter active
function filterHandler(ID) {
	console.log(`FILTER HANDLER CALLED`);
	$(`[data-id="play-table"]`).empty();
	$(`[data-id="play-big"]`).empty();

	if (performance.navigation.type == 1) {
		let fetchData = new Promise((resolve, reject) => {
			loadJsModules({
				config: { loadCSS: false, loadLanguage: false },
				fetch: { loadCSS: false, loadLanguage: false },
				langs: { loadCSS: false, loadLanguage: false },
				user_menu: { loadCSS: true, loadLanguage: false },
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
				// if fileter valid
				let valid = false;
				for (let item of window.inplay) {
					if (item.ID == ID) {
						valid = true;
						break;
					}
				}
				if (valid) {
					// if (performance.navigation.type == 1) {
					if (performance.navigation.type == 1) {
						clearInterval(window.t_interval);
						clearInterval(window.inplay_interval);
						/*for (let i = 0; i < window.intervals.length; i++) {
								clearInterval(window.intervals[i]);
						}*/
						loadJsModules({
							header: { loadCSS: true, loadLanguage: false },
							aside: { loadCSS: false, loadLanguage: false },
							slider: { loadCSS: true, loadLanguage: false },
							live: { sportId: ID, loadCSS: false, loadLanguage: false },
						});
						if ($('script[src="js/modules/betslip_link.js"]').length == 0) {
							loadJsModules({
								betslip_link: { loadCSS: false, loadLanguage: false },
							});
						}
					} else {
						clearInterval(window.t_interval);
						clearInterval(window.inplay_interval);
						/*for (let i = 0; i < window.intervals.length; i++) {
								clearInterval(window.intervals[i]);
						}*/
					}
					let onModulesLoad = new Promise((resolve, reject) => {
						loadJsModules({
							live: { sportId: ID, loadCSS: false, loadLanguage: false },
							slider: { loadCSS: true, loadLanguage: false },
							coef_table: { filtered: true, sportId: ID, loadCSS: false, loadLanguage: false },
							play_big: { sportId: ID, loadCSS: true, loadLanguage: false },
							play_table: { sportId: ID, loadCSS: true, loadLanguage: false },
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
							const calendar = $('[data-id=calendarContainer]');
							const prematch = $('.prematch');
							const lurks = [
								user_menu,
								mybets,
								formWrapper,
								game,
								betslip,
								betslip_link,
								betslip_small,
								calendar,
								prematch,
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
				}
				else {
					window.location.hash = '';
				}
			});
	}
}

// game + game player page load
function gameHandler(ID) {
	const gameWrapper = $('[data-id=game]');
	if (performance.navigation.type == 1) {
		let fetchData = new Promise((resolve, reject) => {
			loadJsModules({
				config: { loadCSS: false, loadLanguage: false },
				fetch: { loadCSS: false, loadLanguage: false },
				langs: { loadCSS: false, loadLanguage: false },
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
			window.tableLoad();
			const wait = setInterval(() => {
				if (window.event == undefined) { }
				else {
					if (window.event[0].ID !== ID) { }
					else {
						clearInterval(wait);
						resolve();
					}

				}
			}, 10);
		});
		fetchPromise
			.then((response) => {
				if (performance.navigation.type == 1) {
					loadJsModules({
						header: { loadCSS: true, loadLanguage: false },
						aside: { loadCSS: true, loadLanguage: false },
						betslip_link: { loadCSS: true, loadLanguage: false },
					});
				}

				let onModulesLoad = new Promise((resolve, reject) => {
					loadJsModules({
						coef_table: { expand: true, loadCSS: true, loadLanguage: false },
						game: { gameId: ID, loadCSS: true, loadLanguage: false },
						// betslip_link: { loadCSS: true, loadLanguage: false },
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
						const calendar = $('[data-id=calendarContainer]');
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
							calendar,
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

function prematchHandler(ID, optID, eventID) {
	if (performance.navigation.type == 1) {
		let fetchData = new Promise((resolve, reject) => {
			loadJsModules({
				config: {},
				fetch: { loadCSS: false, loadLanguage: false },
				langs: { loadCSS: false, loadLanguage: false },
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
			window.sportsLoad();
			window.tableLoad();
			const wait = setInterval(() => {
				if (window.prematch == undefined) { }
				else {
					clearInterval(wait);
					resolve();
				}
			}, 10);
		});
		fetchPromise
			.then((response) => {
				return new Promise((resolve, reject) => {
					if (performance.navigation.type == 1 || $('.show-menu .show-menu-item').length == 0) {
						loadJsModules({
							header: { loadCSS: true, loadLanguage: false },
							aside: { loadCSS: true, loadLanguage: false },
							betslip_link: { loadCSS: true, loadLanguage: false },
						});
					}
					if (typeof optID === 'undefined') {
						loadJsModules({
							prematch: { ID: ID, loadCSS: true, loadLanguage: false },
						});
					}
					else {
						if (typeof eventID === 'undefined') {
							loadJsModules({
								prematch_coupon: { PD: optID, loadCSS: true, loadLanguage: false },
							});
						}
						else {
							loadJsModules({
								prematch_event: { PD: eventID, CT: optID, loadCSS: true, loadLanguage: false },
							});
						}
					}

					resolve();
				});
			})
			.then(
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
					const regist = $('[data-id=regist]');
					const calendar = $('.calendarContainer');
					const prematch = $('.prematch');
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
						regist,
					];
					const unlurks = [
						prematch,
						calendar,
						formWrapper,
					];
					lurking(lurks, unlurks);
					mybets.empty();
					user_menu.empty();
					game.empty();
					regist.empty();
				},
				error => {
					console.log(`modules haven't been loaded :_( \n
    and everthing because of: ${error}`);
				});
	}
}

function calendarHandler() {
	$(`[data-id=calendarContainer]`).empty();
	let onModulesLoad = new Promise((resolve, reject) => {
		if (performance.navigation.type == 1) {
			const fetchPromise = new Promise((resolve, reject) => {
				loadJsModules({
					config: { loadCSS: false, loadLanguage: false },
					fetch: { loadCSS: false, loadLanguage: false },
				});
				setTimeout(() => {
					resolve();
				}, 500);

			});
			fetchPromise.then(
				response => {
					return new Promise((resolve, reject) => {
						window.sportsLoad();
						window.tableLoad();
						resolve();
					});
				}
			).then(
				response => {
					loadJsModules({
						header: { loadCSS: true, loadLanguage: false },
						aside: { loadCSS: true, loadLanguage: false },
						langs: { loadCSS: false, loadLanguage: false },
					});
					resolve();
				}
			)

		}

		else {

			resolve();
		}

	});

	onModulesLoad
		.then(
			result => {
				return new Promise((resolve, reject) => {
					loadJsModules({
						calendar: { loadCSS: true, loadLanguage: false },
					});
					resolve();
				});

			})
		.then(
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
				const regist = $('[data-id=regist]');
				const calendar = $('.calendarContainer');
				const prematch = $('.prematch');
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
					regist,
					prematch,
					formWrapper,
				];
				const unlurks = [
					calendar,
				];
				lurking(lurks, unlurks);
				mybets.empty();
				user_menu.empty();
				game.empty();
				regist.empty();
			},
			error => {
				console.log(`modules haven't been loaded :_( \n
        and everthing because of: ${error}`);
			});
}

// registration page load
function registrationHandler(fast) {
	$(`[data-id=registrationWrapper]`).empty();
	if (performance.navigation.type == 1) {
		loadJsModules({
			config: { loadCSS: false, loadLanguage: false },
			header: { loadCSS: true, loadLanguage: false },
			aside: { loadCSS: false, loadLanguage: false },
			langs: { loadCSS: false, loadLanguage: false },
		});
	}

	let onModulesLoad = new Promise((resolve, reject) => {
		loadJsModules({
			regist: { fast: fast, loadCSS: true, loadLanguage: false },
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
			const calendar = $('[data-id=calendarContainer]');
			const prematch = $('.prematch');
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
				calendar,
				prematch,
			];
			const unlurks = [
				formWrapper,
			];
			lurking(lurks, unlurks);
			mybets.empty();
			user_menu.empty();
			game.empty();
			calendar.empty();
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
			config: { loadCSS: false, loadLanguage: false },
			header: { loadCSS: true, loadLanguage: false },
			aside: { loadCSS: true, loadLanguage: false },
			langs: { loadCSS: false, loadLanguage: false },
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
			const prematch = $('.prematch');
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
				prematch,
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
				config: { loadCSS: false, loadLanguage: false },
				header: { loadCSS: true, loadLanguage: false },
				langs: { loadCSS: false, loadLanguage: false },
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
		const user_menu = $(`[data-id=user_menu]`);
		const play_big = $(`[data-id=play-big]`);
		const coef_table = $(`[data-id=coef_table]`);
		const play_table = $(`[data-id=play-table]`);
		const live = $(`[data-id=live]`);
		const game = $(`[data-id=game]`);
		const betslip = $(`[data-id=betslip]`);
		const betslip_link = $(`[data-id=betslip-link]`);
		const betslip_small = $(`[data-id=betslip-small]`);
		const calendar = $('[data-id=calendarContainer]');
		const prematch = $('.prematch');
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
			calendar,
			prematch,
		];
		const unlurks = [
			mybets,
		];
		lurking(lurks, unlurks);
		user_menu.empty();
		mybets.empty();
		calendar.empty();
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
				config: { loadCSS: false, loadLanguage: false },
				langs: { loadCSS: false, loadLanguage: false },
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
		const calendar = $('[data-id=calendarContainer]');
		const prematch = $('.prematch');
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
			calendar,
			prematch,
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
	if (window.location.hash.includes('undefined')) {
		// window.location.hash = '';
	}
	else {
		if (hash == '') {
			mainHandler();
		}
		else {
			switch (window.location.href.split('/')[5]) {
				case '': case undefined: mainHandler(); break;
				case 'sport': prematchHandler(window.location.href.split('/')[6], window.location.href.split('/')[7], window.location.href.split('/')[8]); break;
				case 'inplay': filterHandler(window.location.href.split('/')[6]); break;
				case 'event': gameHandler(window.location.href.split('/')[6]); break;
				case 'betslip': betslipHandler(); break;
				case 'betslip-small': betslip_smallHandler(); break;
				case 'registration': registrationHandler(typeof window.location.href.split('/')[6] !== 'undefined' ? window.location.href.split('/')[6] : null); break;
				case 'user': userHandler(window.location.href.split('/')[6], window.location.href.split('/')[7], window.location.href.split('/')[8]); break;
				case 'mybets': mybetsHandler(); break;
				case 'calendar': calendarHandler(); break;
				default: emptyHandler();
			}
		}
	}
}