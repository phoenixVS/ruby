function insertHtmlModules(srcs, onLoad) {
	let keys = Object.keys(srcs);

	(function processKey(keyIndex) {
		if (keyIndex < keys.length) {
			let root = $(keys[keyIndex]);
			let elements = srcs[keys[keyIndex]];

			(function processElement(index) {
				if (index < elements.length) {
					$.get("html/modules/" + elements[index], function (data) {
						$(data).appendTo(root);
						processElement(index + 1);
					});
				} else {
					processKey(keyIndex + 1);
				}
			})(0);
		} else {
			if (onLoad) onLoad();
		}
	})(0);
};

async function loadJsModules(config) {
	const keys = Object.keys(config);
	const asyncs = [];
	for (let i = 0; i < keys.length; i++) {
		asyncs.push(processKey(i));
	}

	console.log(asyncs);
	const modulesLoaded = await Promise.all(asyncs);

	// load js module
	async function processKey(index) {
		const moduleName = keys[index];
		const moduleParams = config[keys[index]];
		// load css if it's needed
		if (moduleParams.loadCSS) {
			loadCSS(moduleParams, moduleName);
		}
		imports("js/modules/" + moduleName + ".js", load => {
			load(moduleParams, () => {
				return Promise.resolve('imported');
			});
		});
	}

	return Promise.resolve(modulesLoaded);
}

// Loading css dynamically
function loadCSS(moduleParams, moduleName) {
	let fileref = document.createElement("link");
	let filename = `./css/modules/${moduleName}.css`;
	if (document.querySelector(`[href=${CSS.escape(filename)}]`)) { }
	else {
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
		if (typeof fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	}
}

// Loading js libs
function loadJsLibs(config) {
	$(() => {
		const keys = Object.keys(config);

		(function processKey(index) {
			if (index === keys.length) return;

			const moduleName = keys[index];
			const moduleParams = config[keys[index]];

			imports("js/libs/" + moduleName + ".js", () => { });
		})(0);
	});
}