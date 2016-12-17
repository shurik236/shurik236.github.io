function backToPrev() {
    window.location.href = '#gallery-prev';
    hideHelp();
}

function hideHelp() {
    document.getElementById("help").style.display = 'none';
    document.getElementById("help").style.visibility = 'hidden';
}

function showHelp() {
    document.getElementById("help").style.display = 'block';
    document.getElementById("help").style.visibility = 'visible';
}

function isVisible(objectId) {
    var object = window.document.getElementById(objectId);
    if (!object)
        return;
    if (object.currentStyle) {
        return (object.currentStyle['display'] === 'block' || object.currentStyle['visibility'] === 'visible');
    }
    else if (window.getComputedStyle) {
        var style = window.getComputedStyle(object, "");
        return (style.display === 'block' || style.visibility === 'visible');
    }

    return false;

}

function pictureIsShown() {
    var pictureShown = 0;
    for (var i = 1; i < 13; i++) {
        if (isVisible('image' + i)) {
            pictureShown = i;
        }
    }

    return pictureShown;
}

function galleryKeyHandler(event) {
    if (event === undefined) {
        event = window.event;
    }

    if (event.preventDefault) {
        event.preventDefault();
    }
    event.returnValue = false;


    var current = pictureIsShown();
    if (current === 0)
        return;
    var code;

    if (event.key !== undefined) {
        code = event.key;
    } else if (event.keyCode !== undefined) {
        code = event.keyCode;
    }

    if (code === 'Esc' || code === 'Escape') {
        backToPrev();
    }
    if (code === 'F1') {
        var help = document.getElementById('help');
        if (isVisible('help')){
            hideHelp();
        }
        else {
            showHelp();
        }
    }
    if (code === 'ArrowLeft' || code === 'Left') {
        current--;
        if (current === 0)
            current = 12;
        window.location.href = '#image' + current;
    }
    if (code === 'ArrowRight' || code === 'Right') {
        current++;
        if (current === 13)
            current = 1;
        window.location.href = '#image' + current;
    }

    return false;
}


function changeIntroBackground(imgURL) {

    if (imgURL) {
        document.getElementById("intro").style.backgroundImage = 'url(' + imgURL + ')';
        if (getCookie('background')) {
            deleteCookie('background');
        }
        setCookie('background', imgURL, 1);
    }
}


function load() {
    var bgURL = getCookie('background');
    if (bgURL)
        changeIntroBackground(bgURL);
    else
        changeIntroBackground('intro.jpg');
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

window.document.onkeydown = function(event) {galleryKeyHandler(event)};
window.document.onhelp = function(event) {return false};
