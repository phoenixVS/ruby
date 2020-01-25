const modules = {};

function exports(name, data) {
    if (modules[name] === undefined) {
        modules[name] = data;
    }
}

function imports(src, onLoad) {
    var name = src.split('/').slice(-1)[0].slice(0, -3),
        scr = document.createElement("script");
    scr.src = src;
    scr.onload = () => {
        if (modules[name] === src) {
            throw "Script " + name + " is not module";
        } else {
            onLoad(modules[name]);
        }
    };
    scr.onerror = () => {
        throw "Module does not exist: " + scr;
    };
    document.head.appendChild(scr);
}