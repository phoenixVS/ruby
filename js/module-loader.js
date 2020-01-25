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

function loadJsModules(config) {
    $(() => {
        const keys = Object.keys(config);

        (function processKey(index) {
            if (index === keys.length) return;

            const moduleName = keys[index];
            const moduleParams = config[keys[index]];

            imports("js/modules/" + moduleName + ".js", load => {
                load(moduleParams, () => {
                    processKey(index + 1);
                });
            })

            // Loading css dynamically
            if (moduleParams.loadCSS) {
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
        })(0);
    });
}