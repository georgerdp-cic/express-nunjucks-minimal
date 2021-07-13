
if (document) {
    document.body.className = ((document.body.className)
        ? document.body.className + ' js-enabled'
        : 'js-enabled');
}

console.log('test 4');

window.GOVUKFrontend.initAll(); 