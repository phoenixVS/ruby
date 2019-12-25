function insertHtmlModules(srcs, onLoad) {
    let keys = Object.keys(srcs);

    (function processKey(keyIndex) {
        if (keyIndex < keys.length) {
            let root = $(keys[keyIndex]);
            let elements = srcs[keys[keyIndex]];

            (function processElement(index) {
                if (index < elements.length) {
                    root.append()
                        .load("html/modules/" + elements[index], () => {
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
        })(0);
    });
}