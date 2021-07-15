(function mainJS() {

    if (document) {
        document.body.className = ((document.body.className)
            ? document.body.className + ' js-enabled'
            : 'js-enabled');
    }

    if (window && window.GOVUKFrontend) {
        window.GOVUKFrontend.initAll();
    }

    console.log('Production ready!');

})();